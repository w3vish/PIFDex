import { FavoritesSprite, TotalFusionStats, MovesTable, PokemonDetails, RelatedFusions, RelatedPokemons, SpriteImage, SpritesGallary, StatsDisplay, WeaknessTable } from "@/components/sprites";
import { Card, CardContent } from "@/components/ui/card";
import { getMainSpriteId, loadSprite } from "@/lib/utils";
import { processTypes } from "@/lib/utils";
import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';

export const runtime = 'edge';

interface SpritePageParams {
  params: { spriteId: string };
  searchParams: { sprite?: string };
}

export async function generateMetadata(
  { params, searchParams }: SpritePageParams,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = getMainSpriteId(params.spriteId);
  if (!id) {
    return {
      title: 'Error: Invalid Sprite ID',
      description: 'The provided Sprite ID is invalid.',
      robots: {
        index: false, // Ensure the page is not indexed
      },
    };
  }

  const data = await loadSprite(id);
  if (!data || !data.results || !data.results.length) {
    return {
      title: 'Error: Sprite Not Found',
      description: 'The requested Pokemon sprite could not be loaded.',
      robots: {
        index: false, // Ensure the page is not indexed
      },
    };
  }

  const pokemon = data.results[0];
  const title = searchParams.sprite === 'autogen' ? `${pokemon.name} #${params.spriteId} (Autogen)`
  : pokemon.id.split('.').length === 1 ? `${pokemon.name} #${params.spriteId} sprites` 
  : `${pokemon.name} #${params.spriteId}`;
  
  return {
    title: title,
    description: `
      ${pokemon.name} #${params.spriteId} : ${pokemon.pokedex_entry}
      Types: ${pokemon.primary_type && pokemon.secondary_type
        ? `${pokemon.primary_type}/${pokemon.secondary_type}`
        : pokemon.primary_type || pokemon.secondary_type}
      HP: ${pokemon.base_hp},
      Attack: ${pokemon.base_atk},
      Defense: ${pokemon.base_def},
      Sp. Atk: ${pokemon.base_sp_atk},
      Sp. Def: ${pokemon.base_sp_def},
      Speed: ${pokemon.base_spd}
    `,
    robots: {
      index: false, // Ensure the page is not indexed
    },
  };
}


const SpritePage = async ({ params, searchParams }: SpritePageParams) => {
  const id = getMainSpriteId(params.spriteId);
  if (!id) {
    return notFound();
  }

  const data = await loadSprite(id);
  if (!data || !data.results || !data.results.length) {
    return <div>Error: Sprite data could not be loaded.</div>;
  }

  const pokemon = data.results[0];
  const autogenImage = {
    sprite_id: id,
    sprite_type: "autogen" as 'autogen',
    artists: ["Autogen"],
  };
  const primaryImage =
    searchParams.sprite === 'autogen'
      ? autogenImage
      : pokemon.images?.find((image) => image.sprite_id === params.spriteId) || pokemon.images[0] || autogenImage;
  const spriteType = id.split('.').length === 2 ? 'fusion' : id.split('.').length === 3 ? 'triples' : 'base';
  const allImages = spriteType === 'fusion' ? [...pokemon.images, autogenImage] : pokemon.images;
  const types = Array.from(
    new Set([...processTypes(pokemon.primary_type), ...processTypes(pokemon.secondary_type)])
  );
  const stats = {
    HP: pokemon.base_hp,
    Attack: pokemon.base_atk,
    Defense: pokemon.base_def,
    'Sp. Atk': pokemon.base_sp_atk,
    'Sp. Def': pokemon.base_sp_def,
    Speed: pokemon.base_spd,
    Total:
      pokemon.base_hp +
      pokemon.base_atk +
      pokemon.base_def +
      pokemon.base_sp_atk +
      pokemon.base_sp_def +
      pokemon.base_spd,
  };


  const pokemonData = {
    id: params.spriteId,
    name: pokemon.name,
    primary_type: pokemon.primary_type,
    secondary_type: pokemon.secondary_type,
    base_pokemons: pokemon.base_pokemons,
    total_sprites: pokemon.total_sprites,
    images: primaryImage
  };

  const SpriteImageData = {
    id: id,
    base_pokemons: pokemon.base_pokemons,
    images: [primaryImage]
  }



  return (
    <>
      <Card>
        <h1 className="text-2xl text-center font-semibold p-2 mt-4">
          {pokemon.name} <span className="text-muted-foreground">#{decodeURIComponent(params.spriteId.padStart(3, '0'))} {searchParams.sprite === 'autogen' ? "(Autogen)" : null}</span>
          <FavoritesSprite pokemonData={pokemonData} />
        </h1>
        <CardContent className="p-4  flex flex-col md:flex-row gap-4">
          <div className="w-full md:max-w-xs mx-auto">
            <SpriteImage pokemon={SpriteImageData} types={types} />
            {spriteType === 'base' && (
              <TotalFusionStats headSpriteCount={pokemon.head_sprite} bodySpriteCount={pokemon.body_sprite} />
            )}
          </div>
          <div className="w-full md:mt-0">
            <p>{pokemon.pokedex_entry}</p>
            <StatsDisplay stats={stats} />
            <PokemonDetails
              category={pokemon.category}
              height={pokemon.height}
              weight={pokemon.weight}
              growthRate={pokemon.growth_rate}
              catchRate={pokemon.catch_rate}
              genderRatio={pokemon.gender_ratio}
              abilities={pokemon.all_abilities.filter((ability) => ability.type === 'normal')}
              hiddenAbilities={pokemon.all_abilities.filter((ability) => ability.type === 'hidden')}
              evolvesFrom={pokemon.evolves_from}
              evolvesTo={pokemon.evolves_to}
            />
          </div>
        </CardContent>
      </Card>
      <SpritesGallary images={allImages} />
      {spriteType !== 'base' && <RelatedPokemons id={id} spriteType={spriteType} />}
      {spriteType === 'base' && <RelatedFusions id={id} />}
      {types && <WeaknessTable types={types} />}
      {pokemon.all_moves && <MovesTable all_moves={pokemon.all_moves} />}
    </>
  );
};

export default SpritePage;