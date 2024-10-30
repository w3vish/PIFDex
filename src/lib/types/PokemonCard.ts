interface PokemonCardTypes {
    id: string;
    name?: string;
    types?: string[];
    base_pokemons: { [key: string]: string };
    total_sprites?: number;
    head_fusions?: number;
    body_fusions?: number;
    images?: {
        sprite_id?: string;
        sprite_type?: string;
        artists?: string[];
        creation_date?: string;
        last_update_date?: string;
        comments?: string | null;
    }[];
    spriteType?: 'base' | 'fusion' | 'autogen' | 'triple';
    hasCustomSprite?: boolean;
}[]

export type { PokemonCardTypes }