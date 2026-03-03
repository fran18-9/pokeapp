import { usePokemonCache } from "../hooks/usePokemonCache";
import Form from "../components/Form";
import Card from "../components/Card";
import { usePokedexData } from "../hooks/usePokedexData";
import Versions from "../components/Versions";
import { useState } from "react";


export default function Pokedex() {

    const { data, loading, error, fetchPokemon } = usePokemonCache();
    const [searched, setSearched] = useState(false);
    const [version, setVersion] = useState("red-blue");

    // Use custom hook for all data processing
    const { moveSections, movesByMethod, abilities, stats } = usePokedexData(data, version);

    return (
        <div className="min-h-screen bg-red-400">
            <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-6">
                <h1 className="text-3xl font-bold text-center mb-4 text-gray-700">Pokédex</h1>
                <Form onSubmit={(name: string) => { fetchPokemon(name.toLowerCase()); setSearched(true); }} loading={loading} />
                <div className="flex justify-end mb-2">
                </div>
                {loading && <div className="text-center mt-4 text-yellow-600">Loading...</div>}
                {error && <div className="text-center mt-4 text-red-600">{error}</div>}
                {searched && data && (
                    <div className="mt-6">
                        <Card data={data} />
                        <div className="mt-4 bg-gray-50 rounded-lg p-4 shadow">
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">Abilities</h3>
                            <ul className="mb-4">
                                {abilities.map(a => (
                                    <li key={a.name} className="flex items-center gap-2">
                                        <span className="font-medium">{a.name}</span>
                                        {a.hidden && <span className="bg-yellow-300 text-xs px-2 py-1 rounded">Hidden</span>}
                                    </li>
                                ))}
                            </ul>
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">Types</h3>
                            <div className="flex gap-2 mb-4">
                                {data.types?.map(t => (
                                    <span key={t.type.name} className="bg-indigo-200 px-3 py-1 rounded-full text-indigo-800 font-semibold">{t.type.name}</span>
                                ))}
                            </div>
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">Base Stats</h3>
                            <div className="grid grid-cols-2 gap-2 mb-4">
                                {stats.map(s => (
                                    <div key={s.name} className="flex justify-between bg-white rounded px-2 py-1 shadow">
                                        <span className="capitalize">{s.name}</span>
                                        <span className="font-bold text-indigo-700">{s.value}</span>
                                    </div>
                                ))}
                            </div>
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">Moveset {version}</h3>
                            <Versions value={version} onChange={(verName: string) => setVersion(verName)} />
                            <div className="max-h-40 overflow-y-auto">
                                {moveSections.map(section => (
                                    <div key={section.key} className="mb-3">
                                        <h4 className="text-md font-bold text-gray-700 mb-1">{section.label}</h4>
                                        {movesByMethod[section.key].length > 0 ? (
                                            <ul>
                                                {movesByMethod[section.key].map(m => (
                                                    <li key={m.name} className="flex justify-between items-center py-1 border-b border-gray-200">
                                                        <span className="capitalize flex-1">{m.name}</span>
                                                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded min-w-[60px] text-center">Lvl {m.level ?? '-'}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <div className="text-gray-500 italic">No {section.label.toLowerCase()} available for this Pokémon.</div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
