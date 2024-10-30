// Define the type for gender ratio
export type GenderRatio =
  | 'AlwaysFemale'
  | 'AlwaysMale'
  | 'Female25Percent'
  | 'Female50Percent'
  | 'Female75Percent'
  | 'FemaleOneEighth'
  | 'Genderless';

// Define the type for shape
export type Shape =
  | "Bipedal"
  | "BipedalTail"
  | "Finned"
  | "Head"
  | "HeadArms"
  | "HeadBase"
  | "HeadLegs"
  | "Insectoid"
  | "MultiBody"
  | "MultiWinged"
  | "Multiped"
  | "Quadruped"
  | "Serpentine"
  | "Winged";







// Define the type for abilities
export type Ability = {
  id: string;
  real_name: string;
  real_description: string;
  type: string;
};




// Define the type for metadata
export type Meta = {
  served_by: string;
  duration: number;
  changes: number;
  last_row_id: number;
  changed_db: boolean;
  size_after: number;
  rows_read: number;
  rows_written: number;
};

// Define the full sprite response type
// pokemonTypes.ts

// Move Interface
export interface Move {
  id: string;             // Move's unique identifier
  id_number: number;      // Move's unique numerical identifier
  real_name: string;      // The move's real name
  function_code: string;  // The function code for the move's behavior
  base_damage: number;    // The base damage of the move
  type: string;           // The type of the move (e.g., BUG, FIRE, etc.)
  category: number;       // The category (likely 0 for physical, 1 for special)
  accuracy: number;       // Accuracy percentage (0-100)
  total_pp: number;       // Total Power Points (PP) for the move
  effect_chance: number;  // Chance of any secondary effects occurring
  target: string;         // The target of the move (e.g., NearOther, AllOpponents)
  priority: number;       // Priority of the move (higher means it goes first)
  flags: string;          // Various move-related flags
  real_description: string; // Description of the move
  level : number
}

export interface MoveWithLevel extends Move {
  level: number;   // The level at which the move is learned
}


// Evolution Interface
export interface Evolution {
  target: string;
  method: string;
  param: string;
}

export interface SpriteImage {
  sprite_id: string;
  base_id: string;
  sprite_type: string
  creation_date: string; // ISO date format
  last_update_date: string; // ISO date format
  artists: string[];
  comments: string | null; // Could be null or a string
}



export interface SpriteResponse {
  spriteType: 'base' | 'fusion' | 'autogen' | 'triple';
  hasCustomSprite: boolean;
  id: string;
  name: string;
  pokedex_entry: string;
  base_pokemons: {
    [key: string]: string
  };
  types: string[];
  abilities: {
    hiddenAbilities: Abilities[];
    normalAbilities: Abilities[];
  };
  category: string;
  stats: {
    base_hp: number;
    base_atk: number;
    base_def: number;
    base_sp_atk: number;
    base_sp_def: number;
    base_spd: number;
  }
  ev_stats: {
    ev_hp: number;
    ev_atk: number;
    ev_def: number;
    ev_sp_atk: number;
    ev_sp_def: number;
    ev_spd: number;
  }
  base_exp: number;
  growth_rate: string;
  gender_ratio: GenderRatio;
  catch_rate: number;
  happiness: number;
  egg_groups: string[];
  hatch_steps: number;
  height: number;
  weight: number;
  color: string;
  shape: string;
  habitat: string;
  back_sprite_x: number;
  back_sprite_y: number;
  front_sprite_x: number;
  front_sprite_y: number;
  front_sprite_a: number;
  shadow_x: number;
  shadow_size: number;
  moves: Move[];
  tutor_moves: string[];
  egg_moves: string[];
  evolvesFrom: PokemonEvolution[];
  evolvesTo: PokemonEvolution[];
  images: SpriteImage[];
  total_sprites: number
  TotalFusionsAsHead?: number;
  TotalFusionsAsBody?: number;
  allFusionImages?: PokemonCardData[];
}

// PokemonEvolution Interface (extends Evolution)
export interface PokemonEvolution extends Evolution {
  from?: string;
  to?: string;
  name?: string;
}

export interface Abilities {
  id: string;
  id_number: number;
  real_name: string;
  real_description: string;
}


export interface APIResponse {
  results: SpriteResponse[];
}


export interface PokemonCardData {
  id: string;
  name?: string;
  types?: string[];
  base_pokemons: { [key: string]: string };
  total_sprites?: number;
  TotalFusionsAsHead?: number;
  TotalFusionsAsBody?: number;
  images?: {
    sprite_id: string;
    sprite_type: string;
    artists: string[];
    creation_date: string;
    last_update_date?: string;
    comments: string | null;
  }[];
  spriteType: 'base' | 'fusion' | 'autogen' | 'triple';
  hasCustomSprite: boolean;
}

