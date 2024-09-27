// Define the type for gender ratio
type GenderRatio = 
  | 'AlwaysFemale'
  | 'AlwaysMale'
  | 'Female25Percent'
  | 'Female50Percent'
  | 'Female75Percent'
  | 'FemaleOneEighth'
  | 'Genderless';

// Define the type for shape
type Shape = 
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

// Define the type for moves
type Move = {
  level: number;
  move: string;
};

// Define the type for evolution details
type EvolutionDetail = {
  id: string;
  name: string;
  target: string;
  method: string;
  param: string;
  image: string;
};

// Define the type for evolution chain
type EvolutionChain = {
  id: string;
  name: string;
  target: string | null;
  method: string | null;
  param: string | null;
  image: string;
};

// Define the type for image details
type Image = {
  sprite_id: string;
  sprite_type: string;
  artists: string[];
};

// Define the type for abilities
type Ability = {
  id: string;
  real_name: string;
  real_description: string;
  type: string;
};

// Define the type for moves
type FullMove = {
  id: string;
  real_name: string;
  function_code: string;
  base_damage: number;
  type: string;
  category: number;
  accuracy: number;
  total_pp: number;
  effect_chance: number;
  target: string;
  priority: number;
  flags: string;
  real_description: string;
  level: number;
};

// Define the type for a single result entry
type SpriteResult = {
  id: string;
  name: string;
  category: string;
  pokedex_entry: string;
  base_pokemons: Record<string, string>;
  primary_type: string;
  secondary_type: string;
  base_hp: number;
  base_atk: number;
  base_def: number;
  base_sp_atk: number;
  base_sp_def: number;
  base_spd: number;
  ev_hp: number;
  ev_atk: number;
  ev_def: number;
  ev_sp_atk: number;
  ev_sp_def: number;
  ev_spd: number;
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
  shape: Shape;
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
  abilities: string[];
  hidden_abilities: string[];
  evolves_from: EvolutionDetail[];
  evolves_to: EvolutionDetail[];
  evolution_chain: EvolutionChain[];
  total_sprites: number;
  images: Image[];
  head_sprite: number;
  body_sprite: number;
  all_abilities: Ability[];
  all_moves: FullMove[];
};

// Define the type for metadata
type Meta = {
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
type SpriteResponse = {
  success: boolean;
  meta: Meta;
  results: SpriteResult[];
};


// now export all this types
export type {
  GenderRatio,
  Shape,
  Move,
  EvolutionDetail,
  EvolutionChain,
  Image,
  Ability,
  FullMove,
  SpriteResult,
  Meta,
  SpriteResponse,
};