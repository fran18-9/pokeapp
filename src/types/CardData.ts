import type { PokemonData } from "./PokemonData";

type CardData = Pick<PokemonData, "id" | "name" | "sprites" | "cries">;

export type CardProps = {
    data: CardData | null;
};