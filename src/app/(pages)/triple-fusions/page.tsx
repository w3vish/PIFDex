import { GridContent, PokemonCard } from '@/components/pages';
import { CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { loadModules } from '@/lib/utils';
import { Metadata } from 'next';

export const runtime = 'edge';

export const metadata: Metadata = {
    title: "Triple Fusions",
    description: "Triple fusions combine three Pokémon, typically legendary trios or fully-evolved starters from the same region. These unique fusions blend the attributes and types of all three Pokémon.",
};


async function page() {
    const data = await loadModules("triple-fusions");

    if (!data) return <></>;

    return (
        <div className='space-y-4'>
            <CardHeader>
                <h1 className='text-2xl font-bold'>Triple Fusions ({data.length})</h1>
                <p className='text-sm lg:text-base text-muted-foreground'>
                    Triple fusions combine three Pokémon, typically legendary trios or fully-evolved starters from the same region. These unique fusions blend the attributes and types of all three Pokémon.
                </p>
            </CardHeader>

            <Separator className='my-4' />

            <article className='space-y-2'>
                <h2 className='text-xl text-center font-semibold'>Total Triple Fusions ({data.length})</h2>
                <GridContent className='grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5'>
                    {data.map((pokemon) => (
                        <PokemonCard key={pokemon.id} pokemon={pokemon} />
                    ))}
                </GridContent>
            </article>
        </div>
    );
}

export default page;
