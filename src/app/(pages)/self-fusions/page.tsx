import { GridContent, PokemonCard } from '@/components/pages';
import { Card, CardDescription, CardHeader } from '@/components/ui/card';
import { loadModules } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { Metadata } from 'next';


export const metadata: Metadata = {
    title: "Self Fusions",
    description: "Self Fusions are a unique type of Pokémon fusion where a single Pokémon fuses with itself, acting as both the head and the body. These fusions highlight the Pokémon&apos;s ability to merge its own attributes.",
}

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
    const data = await loadModules("self-fusions");
    
    const SelfFusionsData = data as { results: TripleFusionsResults };


    if (!SelfFusionsData || !SelfFusionsData.results.length) return <></>;

    return (
        <Card className='py-4'>
            {/* Header Section */}
            <CardHeader className='p-2 px-4'>
                <h1 className='text-2xl'>Self Fusions ({SelfFusionsData.results.length})</h1>
                <CardDescription>
                Self Fusions are a unique type of Pokémon fusion where a single Pokémon fuses with itself, acting as both the head and the body. These fusions highlight the Pokémon&apos;s ability to merge its own attributes.
                </CardDescription>
            </CardHeader>

            <Separator className='my-4' />

            {/* Grid Section to Display Cards */}
            <GridContent>
                {SelfFusionsData.results.map((pokemon: PokemonData, index: number) => (
                    <PokemonCard key={index} pokemon={pokemon} />
                ))}
            </GridContent>
        </Card>
    );
}

export default page;
