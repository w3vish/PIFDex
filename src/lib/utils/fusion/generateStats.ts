import { SpriteResult } from "@/lib/types";

const generateStats = (pokemon: SpriteResult) => ({
    HP: pokemon.base_hp,
    Attack: pokemon.base_atk,
    Defense: pokemon.base_def,
    "Sp. Atk": pokemon.base_sp_atk,
    "Sp. Def": pokemon.base_sp_def,
    Speed: pokemon.base_spd,
    Total:
        pokemon.base_hp +
        pokemon.base_atk +
        pokemon.base_def +
        pokemon.base_sp_atk +
        pokemon.base_sp_def +
        pokemon.base_spd,
});

export { generateStats }