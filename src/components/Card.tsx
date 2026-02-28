import type { PokemonData } from "../types/PokemonData";

type CardData = Pick<PokemonData, "id" | "name" | "sprites" | "cries">;

type CardProps = {
    data: CardData | null;
};

export default function Card({ data }: CardProps) {
    if (!data) return null;
    return (
        <div className="bg-red-400 rounded-lg shadow p-4 flex flex-col items-center">
            <div className="flex items-center gap-4 mb-2">
                <span className="text-2xl font-bold text-gray-50">#{data.id}</span>
                <h2 className="text-2xl font-bold capitalize text-gray-100">{data.name}</h2>
            </div>
            {data.sprites?.front_default ? (
                <img src={data.sprites.front_default} alt={`${data.name} sprite`} className="w-32 h-32 mb-2  rounded-lg bg-white" />
            ) : (
                <p className="text-gray-500">Sprite not found.</p>
            )}
            <div className="w-full flex flex-col items-center mt-2">
                <h3 className="text-lg font-semibold text-gray-50 mb-1">Cry</h3>
                {data.cries?.legacy ? (
                    <audio src={data.cries.legacy} controls className="w-full" />
                ) : (
                    <p className="text-gray-500">Audio not found.</p>
                )}
            </div>
        </div>
    );
}