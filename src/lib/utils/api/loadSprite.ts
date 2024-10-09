import { SpriteResponse } from "@/lib/types";
import { apiURL } from "../constants";
import { cache } from "react";

// Define a cached version of the loadSprite function
const loadSprite = cache(async (id: string): Promise<SpriteResponse> => {
  const res = await fetch(`${apiURL}/sprites/${id}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch sprite with id: ${id}`);
  }
  const sprite: SpriteResponse = await res.json();
  return sprite;
});

export { loadSprite };
