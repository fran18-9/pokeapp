import { useEffect, useRef, useState } from "react";
import type { PokemonData } from "../types/PokemonData";

const API_URL = "https://pokeapi.co/api/v2/pokemon/";
const ONE_MONTH_MS = 30 * 24 * 60 * 60 * 1000;

type CacheData = { data: PokemonData; timestamp: number };

function openDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("PokeAppDB", 1);
        request.onupgradeneeded = () => {
            request.result.createObjectStore("pokemonCache", { keyPath: "name" });
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    })
}

async function getCache(name: string): Promise<CacheData | null> {
    const db = await openDB();
    const tx = db.transaction("pokemonCache", "readonly");
    const store = tx.objectStore("pokemonCache");
    return new Promise((resolve, reject) => {
        const request = store.get(name);
        request.onsuccess = () => resolve(request.result || null);
        request.onerror = () => reject(request.error);
        tx.oncomplete = () => db.close();
    });
}

async function setCache(name: string, data: PokemonData): Promise<void> {
    const db = await openDB();
    const tx = db.transaction("pokemonCache", "readwrite");
    const store = tx.objectStore("pokemonCache");
    await new Promise<void>((resolve, reject) => {
        const request = store.put({ name, data, timestamp: Date.now() });
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
        tx.oncomplete = () => db.close();
    });
}

export function usePokemonCache() {
    const [data, setData] = useState<PokemonData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const isMounted = useRef(true);

    // Cleanup on unmount
    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        };
    }, [])

    async function fetchPokemon(name: string) {
        setLoading(true);
        setData(null);
        setError(null);

        if (!isMounted.current) return;
        const cache = await getCache(name);
        const now = Date.now();
        if (cache && now - cache.timestamp < ONE_MONTH_MS) {
            setData(cache.data);
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(API_URL + name + '/');
            if (!isMounted.current) return; // Prevent state update if unmounted
            if (response.ok) {
                const json = await response.json();
                setCache(name, json)
                setData(json);
            } else {
                throw new Error("Pokemon not found");
            }
        } catch (error) {
            if (!isMounted.current) return;
            if (error instanceof Error) {
                setError(error.message);
            } else {
                console.error(error);
                setError("Unknown error.");
            }
        } finally {
            if (isMounted.current) setLoading(false);
        }

    }
    return { data, loading, error, fetchPokemon };
}
