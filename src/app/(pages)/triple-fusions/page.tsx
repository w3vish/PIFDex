import { GridContent, PokemonCard } from '@/components/pages';
import { CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { loadModules } from '@/lib/utils';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Triple Fusions",
    description: "Explore the unique world of Triple Fusions, where three Pokémon combine their attributes into a single fusion. Perfect for fans of legendary trios and fully-evolved starters.",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://infinitefusion.org/triple-fusions",
        siteName: "InfiniteFusion.org",
        title: "Triple Fusions in Pokémon Infinite Fusion",
        description: "Discover Triple Fusions, combining three Pokémon into unique forms. A must-see for fans of legendary trios!",
        images: [
            {
                url: "/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Triple Fusions in Pokémon Infinite Fusion",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Triple Fusions in Pokémon Infinite Fusion",
        description: "Dive into Triple Fusions, where three Pokémon merge their attributes for a unique fusion experience.",
        images: ["/og-image.jpg"],
    },
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

type TripleFusionsResults = PokemonData[];

async function page() {
    const data = await loadModules("triple-fusions");
    const tripleFusionsData = data as { results: TripleFusionsResults };

    if (!tripleFusionsData || !tripleFusionsData.results.length) return <></>;

    return (
        <div className='space-y-4'>
            <CardHeader>
                <h1 className='text-2xl font-bold'>Triple Fusions ({tripleFusionsData.results.length})</h1>
                <p className='text-sm lg:text-base text-muted-foreground'>
                    Triple fusions combine three Pokémon, typically legendary trios or fully-evolved starters from the same region. These unique fusions blend the attributes and types of all three Pokémon.
                </p>
            </CardHeader>

            <Separator className='my-4' />

            <article className='space-y-2'>
                <h2 className='text-xl text-center font-semibold'>Total Triple Fusions ({tripleFusionsData.results.length})</h2>
                <GridContent>
                    {tripleFusionsData.results.map((pokemon: PokemonData) => (
                        <PokemonCard key={pokemon.id} pokemon={pokemon} />
                    ))}
                </GridContent>
            </article>
        </div>
    );
}

export default page;
