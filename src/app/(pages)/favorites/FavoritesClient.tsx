"use client"; // Required to interact with localStorage
import { useState, useEffect } from "react";
import { GridContent, PokemonCard } from "@/components/pages";
import { Separator } from "@/components/ui/separator"; 
import Link from "next/link";

// Define the structure for Pokémon data based on what was stored
interface PokemonData {
    id: string;
    name: string;
    primary_type?: string;
    secondary_type?: string;
    base_pokemons: { [key: string]: string };
    total_sprites: number;
    images: {
      sprite_id: string;
      sprite_type: string;
      artists: string[];
    }[];
  }
  

const storageKey = "LikedSprites";

const FavoritesClient = () => {
  const [favoritePokemons, setFavoritePokemons] = useState<PokemonData[]>([]);
 
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem(storageKey) || "[]");
    setFavoritePokemons(storedFavorites);
  }, []);
  

  useEffect(() => {
    if (favoritePokemons.length !== 0) {
      document.title = `Favorites (${favoritePokemons.length})`;
    }
  }, [favoritePokemons]);
  

  return (
    <div className="my-4">
      <h1 className="text-2xl font-bold m-4">Favorite Sprites ({favoritePokemons && favoritePokemons.length})</h1>
      
      <Separator className="mb-4" />

      {/* Show a message if no favorites are found */}
      {favoritePokemons.length === 0 ? (
        <div className="text-muted-foreground text-lg">
          <p>You don&lsquo;t have any favorite Pokémon sprites yet.</p>
          <Link rel="nofollow" href="/" className="underline">
            Explore Pokémon sprites to add some favorites!
          </Link>
        </div>
      ) : (
        <GridContent>
          {/* Render PokemonCard for each favorite Pokémon */}
          {favoritePokemons.map((pokemon: PokemonData) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </GridContent>
      )}
    </div>
  );
};

export default FavoritesClient;
