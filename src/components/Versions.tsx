import { useEffect } from "react";
import { useVersions } from "../hooks/useVersions";

type VersionsProps = {
    value: string,
    onChange: (verName: string) => void
}

export default function Versions({ value, onChange }: VersionsProps) {
    const { data, loading, error, fetchVersions } = useVersions();

    useEffect(() => {
        fetchVersions();
    }, []);

    if (loading) return <div>Loading games...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <label htmlFor="version-select">Game version:</label>
            {data && (
                <select
                    id="version-select"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}>
                    {data.results.map(v => (
                        <option key={v.name} value={v.name}>{v.name}</option>
                    ))}
                </select>
            )}
        </div>
    );
}