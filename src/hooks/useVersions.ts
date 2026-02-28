import { useRef, useState, useEffect } from "react";
import type { VersionData } from "../types/VersionData";

const API_URL = "https://pokeapi.co/api/v2/version-group/";

export function useVersions() {
    const [data, setData] = useState<VersionData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const isMounted = useRef(true);

    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        };
    }, [])

    async function fetchVersions() {
        setLoading(true);
        setData(null);
        setError(null);

        try {
            const response = await fetch(API_URL);
            if (!isMounted.current) return;
            if (response.ok) {
                const json = await response.json();
                setData(json);
            } else {
                throw new Error("Could not fetch game versions")
            }
        } catch (error) {
            if (!isMounted.current) return;
            if (error instanceof Error) {
                setError(error.message);
            } else {
                console.log(error);
                setError("Unknown error.")
            }
        } finally {
            if (isMounted.current) setLoading(false);
        }
    }

    return { data, loading, error, fetchVersions };
}