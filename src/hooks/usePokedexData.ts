// Custom hook to process and organize Pokedex data
import { useMemo } from "react";
import { formatAbilityName } from "../utils/formatAbilityName";
import type { PokemonData } from "../types/PokemonData";
import { formatMoveName } from "../utils/formatMoveName";

type Move = {
    name: string;
    level?: number;
    method?: string;
};

type Stat = {
    name: string;
    value: number;
}

type Ability = {
    name: string;
    hidden?: boolean;
}

type MovesByMethod = Record<string, Move[]>;

export function usePokedexData(data: PokemonData | null, version: string) {
    // Filter moves for the current selected game
    const verMoves: Move[] = useMemo(() => {
        if (!data?.moves) return [];
        return data.moves.filter(m =>
            m.version_group_details.some(vgd => vgd.version_group.name === version)
        ).map(m => {
            const vgd = m.version_group_details.find(vgp => vgp.version_group.name === version);
            return {
                name: formatMoveName(m.move.name),
                level: vgd?.level_learned_at,
                method: vgd?.move_learn_method.name
            };
        });
    }, [data, version]);

    // Define move sections in a single array for maintainability
    const moveSections: readonly { key: string; label: string }[] = useMemo(() => [
        { key: "egg", label: "Egg Moves" },
        { key: "level-up", label: "Level Up Moves" },
        { key: "machine", label: "Machine Moves" },
        { key: "tutor", label: "Tutor Moves" }
    ], []);

    // Groups moves by their methods dynamically from moveSections
    const movesByMethod: MovesByMethod = useMemo(() => {
        const groups: MovesByMethod = {};
        moveSections.forEach(section => {
            groups[section.key] = [];
        });
        verMoves.forEach(move => {
            if (move.method && groups.hasOwnProperty(move.method)) {
                groups[move.method].push(move);
            }
        });
        return groups;
    }, [verMoves, moveSections]);

    // Parse abilities with hidden info
    const abilities: Ability[] = useMemo(() => {
        if (!data?.abilities) return [];
        return data.abilities.map(a => ({
            name: formatAbilityName(a.ability.name),
            hidden: a.is_hidden
        }));
    }, [data]);

    // Parse base stats
    const stats: Stat[] = useMemo(() => {
        if (!data?.stats) return [];
        return data.stats.map(s => ({
            name: s.stat.name,
            value: s.base_stat
        }));
    }, [data]);

    return { moveSections, movesByMethod, abilities, stats };
}
