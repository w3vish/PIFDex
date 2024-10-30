import { SpriteResponse } from "@/lib/types";


const generateStats = (pokemon: SpriteResponse) => ({
    HP: pokemon.stats.base_hp,
    Attack: pokemon.stats.base_atk,
    Defense: pokemon.stats.base_def,
    "Sp. Atk": pokemon.stats.base_sp_atk,
    "Sp. Def": pokemon.stats.base_sp_def,
    Speed: pokemon.stats.base_spd,
    Total:
        pokemon.stats.base_hp +
        pokemon.stats.base_atk +
        pokemon.stats.base_def +
        pokemon.stats.base_sp_atk +
        pokemon.stats.base_sp_def +
        pokemon.stats.base_spd,
});

export { generateStats }