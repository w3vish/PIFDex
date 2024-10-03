interface PokemonCardTypes {
    id: string;
    name: string;
    primary_type: string;
    secondary_type: string;
    base_pokemons: { [key: string]: string };
    total_sprites: number;
    head_fusions: number;
    body_fusions: number;
    images: {
        sprite_id: string;
        sprite_type: string;
        artists: string[];
    }[];
}

export type { PokemonCardTypes }