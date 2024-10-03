import { GridContent, PokemonCard } from '@/components/pages';
import { CardHeader } from '@/components/ui/card';
import { loadModules } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { Metadata } from 'next';
import { gameInfo } from '@/lib/utils/constants'; // Ensure you import gameInfo if you need it for counts

export const metadata: Metadata = {
    title: "Self Fusions",
    description: "Self Fusions are a unique type of Pokémon fusion where a single Pokémon fuses with itself, acting as both the head and the body. These fusions highlight the Pokémon's ability to merge its own attributes.",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://infinitefusion.org/self-fusions",
        siteName: "InfiniteFusion.org",
        title: "Self Fusions in Pokémon Infinite Fusion",
        description: "Explore a variety of Self Fusions, where Pokémon merge their own attributes to create unique forms.",
        images: [
            {
                url: "/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Self Fusions in Pokémon Infinite Fusion",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Self Fusions in Pokémon Infinite Fusion",
        description: "Dive into the world of Self Fusions, showcasing how Pokémon can creatively merge their own traits.",
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

type SelfFusionsResults = PokemonData[];

async function page() {
    const data = await loadModules("self-fusions");
    const selfFusionsData = data as { results: SelfFusionsResults };

    if (!selfFusionsData || !selfFusionsData.results.length) return <></>;

    return (
        <div className='space-y-4'>
            <CardHeader>
                <h1 className="text-2xl font-bold">Self Fusions ({selfFusionsData.results.length})</h1>
                <p className="text-sm lg:text-base text-muted-foreground">
                    Self Fusions are a unique type of Pokémon fusion where a single Pokémon fuses with itself, acting as both the head and the body.
                </p>
            </CardHeader>

            <Separator className='my-4' />

            <article className='space-y-2'>
                <h2 className='text-xl text-center font-semibold'>Total Self Fusions ({selfFusionsData.results.length})</h2>
                <GridContent>
                    {selfFusionsData.results.map((pokemon: PokemonData) => (
                        <PokemonCard key={pokemon.id} pokemon={pokemon} />
                    ))}
                </GridContent>
            </article>
        </div>
    );
}

export default page;
