// General interface for Pokémon data used across the app
export interface PokemonData {
    id?: number;
    name?: string;
    moves?: Array<{
        move: { name: string };
        version_group_details: Array<{
            version_group: { name: string };
            level_learned_at: number;
            move_learn_method: { name: string };
        }>;
    }>;
    abilities?: Array<{
        ability: { name: string };
        is_hidden?: boolean;
    }>;
    stats?: Array<{
        stat: { name: string };
        base_stat: number;
    }>;
    types?: Array<{
        type: { name: string };
    }>;
    sprites?: {
        front_default?: string;
    };
    cries?: {
        legacy?: string;
    };
}
