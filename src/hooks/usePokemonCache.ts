import { useEffect, useRef, useState } from "react";
import type { PokemonData } from "../types/PokemonData";

const API_URL = "https://pokeapi.co/api/v2/pokemon/";
const CACHE_PREFIX = "pokeapi_pokemon_";
const ONE_MONTH_MS = 30 * 24 * 60 * 60 * 1000;

type CacheData = { data: PokemonData; timestamp: number };

function getCacheKey(name: string): string {
    return `${CACHE_PREFIX}${name}`;
}

function getCache(name: string): CacheData | null {
    const raw = localStorage.getItem(getCacheKey(name));
    if (!raw) return null;
    try {
        return JSON.parse(raw);
    } catch {
        return null;
    }
}

function setCache(name: string, data: PokemonData): void {
    localStorage.setItem(
        getCacheKey(name),
        JSON.stringify({
            data,
            timestamp: Date.now()
        }));
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
        const cache = getCache(name);
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
