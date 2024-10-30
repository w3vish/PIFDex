import {
    SpriteResponse,
    Ability,
    GenderRatio,
    Meta,
    Move,
    Shape,
    APIResponse
} from "./SpriteResponse";
import { LoadAllFusionsResponse } from "./loadAllFusionsResponse";
import { PokemonCardTypes } from "./PokemonCard";
interface SelectedPokemon {
    id: string
    name: string
  }

export type {
    SpriteResponse,
    Ability,
    GenderRatio,
    Meta,
    Move,
    Shape,
    LoadAllFusionsResponse,
    SelectedPokemon,
    PokemonCardTypes,
    APIResponse
}