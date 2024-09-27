import { SpriteResponse } from "@/lib/types";
import { apiURL } from "../constants";

  // Define the loadSprite function with proper typing
  const loadSprite = async (id: string): Promise<SpriteResponse> => {
    const res = await fetch(`${apiURL}/sprites/${id}`);
    const sprite: SpriteResponse = await res.json();
    return sprite;
  };
  
  export {loadSprite};
