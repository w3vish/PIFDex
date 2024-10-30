import { SpriteResponse } from "@/lib/types";
import { apiURL } from "../constants";
import { cache } from "react";

// Define a cached version of the loadSprite function
const loadSprite = cache(async (id: string): Promise<SpriteResponse> => {
  const res = await fetch(`${apiURL}/${id}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch sprite with id: ${id}`);
  }
  const sprite: SpriteResponse = await res.json();
  return sprite;
});

const loadMultipleSprites = async(ids: string) => {
  const res = await fetch(`${apiURL}/sprites/${ids}`);
  if (!res.ok) throw new Error(`Failed to fetch sprites with ids: ${ids}`);
  const {results}: {results: SpriteResponse[]} = await res.json();
  return results
}

export { loadSprite, loadMultipleSprites };
