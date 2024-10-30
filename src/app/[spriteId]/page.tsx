import { TotalFusionStats, MovesTable, PokemonDetails, RelatedPokemons, SpriteImage, SpritesGallary, StatsDisplay, WeaknessTable, RelatedFusionsClient, FavoritesSprite } from "@/components/sprites";
import { Card, CardContent } from "@/components/ui/card";
import { getMainSpriteId, getSpriteImageURL, loadSprite } from "@/lib/utils";
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
      robots: { index: false },
    };
  }

  const data = await loadSprite(id);
  if (!data) {
    return {
      title: 'Error: Sprite Not Found',
      description: 'The requested Pokemon sprite could not be loaded.',
      robots: { index: false },
    };
  }

  const pokemon = data;
  const spriteType = pokemon.spriteType;
  let imageUrl: string;

  if (pokemon.images && pokemon.images.length > 0 && searchParams.sprite !== 'autogen') {
    const specificImage = pokemon.images.find(img => img.sprite_id === params.spriteId);
    imageUrl = specificImage
      ? getSpriteImageURL(specificImage.sprite_id, spriteType)
      : getSpriteImageURL(pokemon.images[0].sprite_id, spriteType);
  } else {
    imageUrl = getSpriteImageURL(params.spriteId, 'autogen');
  }

  const title = searchParams.sprite === 'autogen'
    ? `${pokemon.name} #${params.spriteId} (Autogen)`
    : spriteType === "base"
      ? `#${params.spriteId} ${pokemon.name} sprites`
      : `${pokemon.name} #${params.spriteId}`;

  const description = `
    ${pokemon.name} #${params.spriteId} : ${pokemon.pokedex_entry}
    Types: ${pokemon.types.join('/')}
    HP: ${pokemon.stats.base_hp},
    Attack: ${pokemon.stats.base_atk},
    Defense: ${pokemon.stats.base_def},
    Sp. Atk: ${pokemon.stats.base_sp_atk},
    Sp. Def: ${pokemon.stats.base_sp_def},
    Speed: ${pokemon.stats.base_spd}
  `.trim();

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{
        url: imageUrl,
        width: 288,
        height: 288,
        alt: `${pokemon.name} sprite #${params.spriteId}`
      }]
    },
    twitter: {
      card: 'summary',
      title,
      description,
      images: [imageUrl],
    },
    robots: {
      index: spriteType === 'base',
    },
  };
}

const SpritePage = async ({ params, searchParams }: SpritePageParams) => {
  const id = getMainSpriteId(params.spriteId);
  if (!id) return notFound();

  const data = await loadSprite(id);
  if (!data) return notFound();

  const pokemon = data;
  const autogenImage = {
    sprite_id: id,
    sprite_type: "autogen" as const,
    artists: ["Autogen"],
    creation_date: new Date().toISOString(),
    last_update_date: new Date().toISOString(),
    comments: null,
  };

  const primaryImage = searchParams.sprite === 'autogen'
    ? autogenImage
    : pokemon.images?.find(image => image.sprite_id === params.spriteId) || pokemon.images[0] || autogenImage;

  const spriteType: 'base' | 'fusion' | 'autogen' | 'triple' = pokemon.spriteType

  const allImages = [...pokemon.images, autogenImage];
  const types = pokemon.types || [];
  const stats = {
    HP: pokemon.stats.base_hp,
    Attack: pokemon.stats.base_atk,
    Defense: pokemon.stats.base_def,
    'Sp. Atk': pokemon.stats.base_sp_atk,
    'Sp. Def': pokemon.stats.base_sp_def,
    Speed: pokemon.stats.base_spd,
    Total: pokemon.stats.base_hp + pokemon.stats.base_atk + pokemon.stats.base_def +
      pokemon.stats.base_sp_atk + pokemon.stats.base_sp_def + pokemon.stats.base_spd,
  };

  // Ensure `SpriteImageData` matches the expected type structure
  const SpriteImageData = {
    id: id,
    // name: pokemon.name,
    base_pokemons: pokemon.base_pokemons,
    images: [
      {
        sprite_id: primaryImage.sprite_id,
        sprite_type: primaryImage.sprite_type,
        artists: primaryImage.artists,
        creation_date: new Date().toISOString(), // Added required field
        last_update_date: new Date().toISOString(), // Optional field
        comments: null // Added required field
      },
    ],
    spriteType: spriteType,
    hasCustomSprite: !!pokemon.images.length,
    // total_sprites: pokemon.total_sprites,
    // head_fusions: pokemon.head_fusions,
    // body_fusions: pokemon.body_fusions,
    // types: pokemon.types,
  };

  return (
    <article className="p-1">
      <Card>
        <h1 className="text-2xl text-center font-semibold p-2 mt-4">
          {pokemon.name} <span className="text-muted-foreground">#{decodeURIComponent(params.spriteId.padStart(3, '0'))} {searchParams.sprite === 'autogen' ? "(Autogen)" : null}</span>
        <FavoritesSprite pokemonData={data}/>
        </h1>
        <CardContent className="p-4 flex flex-col md:flex-row gap-4">
          <div className="w-full md:max-w-xs mx-auto">
            <SpriteImage pokemon={SpriteImageData} types={types} />
            {spriteType === 'base'
              && pokemon.TotalFusionsAsHead
              && pokemon.TotalFusionsAsBody
              && (
                <TotalFusionStats headSpriteCount={pokemon.TotalFusionsAsHead} bodySpriteCount={pokemon.TotalFusionsAsBody} />
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
              abilities={pokemon.abilities.normalAbilities}
              hiddenAbilities={pokemon.abilities.hiddenAbilities}
              evolvesFrom={pokemon.evolvesFrom}
              evolvesTo={pokemon.evolvesTo}
            />
          </div>
        </CardContent>
      </Card>
      <SpritesGallary images={allImages} label="Sprites Gallery" />
      {spriteType !== 'base' && <RelatedPokemons id={id} spriteType={spriteType} />}
      {spriteType === 'base' && pokemon.allFusionImages && <RelatedFusionsClient pokemons={pokemon.allFusionImages} id={id} />}
      {types && <WeaknessTable types={types} />}
      {pokemon.moves && <MovesTable all_moves={pokemon.moves} />}
    </article>
  );
};

export default SpritePage;
