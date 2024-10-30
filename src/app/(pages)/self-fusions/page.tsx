import { GridContent, PokemonCard } from '@/components/pages';
import { CardHeader } from '@/components/ui/card';
import { loadModules } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { Metadata } from 'next';
import { gameInfo } from '@/lib/utils/constants'; // Ensure you import gameInfo if you need it for counts
import { PokemonCardData } from '@/lib/types/SpriteResponse';

export const metadata: Metadata = {
    title: "Self Fusions",
    description: "Self Fusions are a unique type of Pokémon fusion where a single Pokémon fuses with itself, acting as both the head and the body. These fusions highlight the Pokémon's ability to merge its own attributes.",
};

interface PokemonData {
    id: string;
    name: string;
    primary_type?: string;
    secondary_type?: string;
    base_pokemons: Record<string, string>;
    total_sprites: number;
    images?: {
        sprite_id: string;
        sprite_type: string;
        artists: string[];
    }[];
}


async function page() {
    const data: PokemonCardData[] = await loadModules("self-fusions");

    if (!data) return <></>;

    return (
        <div className='space-y-4'>
            <CardHeader>
                <h1 className="text-2xl font-bold">Self Fusions ({data.length})</h1>
                <p className="text-sm lg:text-base text-muted-foreground">
                    Self Fusions are a unique type of Pokémon fusion where a single Pokémon fuses with itself, acting as both the head and the body.
                </p>
            </CardHeader>

            <Separator className='my-4' />

            <article className='space-y-2'>
                <h2 className='text-xl text-center font-semibold'>Total Self Fusions ({data.length})</h2>
                <GridContent className='overflow-hidden'>
                    {data.map((pokemon: PokemonCardData) => (
                        <PokemonCard key={pokemon.id} pokemon={pokemon} />
                    ))}
                </GridContent>
            </article>
        </div>
    );
}

export default page;
