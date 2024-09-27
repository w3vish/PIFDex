import { GridContent, PokemonCard } from '@/components/pages';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
import { loadModules } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { notFound } from 'next/navigation';


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
    
    const TripleFusionsData = data as { results: TripleFusionsResults };


    if (!TripleFusionsData || !TripleFusionsData.results.length) return <></>;

    return (
        <Card className='py-4'>
            {/* Header Section */}
            <CardHeader className='p-2 px-4'>
                <h1 className='text-2xl'>Triple Fusions</h1>
                <CardDescription>
                    Triple fusions combine three Pokémon, typically legendary trios or fully-evolved starters from the same region. These unique fusions blend the attributes and types of all three Pokémon.
                </CardDescription>
                <CardDescription>
                    Explore the 20 available triple fusions in Pokémon Infinite Fusion below.
                </CardDescription>
            </CardHeader>

            <Separator className='my-4' />

            {/* Grid Section to Display Cards */}
            <GridContent>
                {TripleFusionsData.results.map((pokemon: PokemonData, index: number) => (
                    <PokemonCard key={index} pokemon={pokemon} />
                ))}
            </GridContent>
        </Card>
    );
}

export default page;
