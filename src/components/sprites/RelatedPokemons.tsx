import { loadSprite } from "@/lib/utils";
import { PokemonCard } from "../pages";
import { Card, CardContent, CardHeader } from "../ui/card";
import { gridClass } from "@/lib/utils/constants";
import { loadMultipleSprites } from "@/lib/utils/api";

type RelatedPokemonArgs = {
    id: string,
    spriteType: string
}


const RelatedPokemons = async ({ id, spriteType }: RelatedPokemonArgs) => {
    const ids = spriteType === 'fusion' ? Array.from([...id.split('.'), id.split('.').reverse().join('.')])
        : Array.from([...id.split('.')])
    const data = await loadMultipleSprites(ids.join(','))

    return (
        <Card className="my-4">
            <CardHeader className="text-2xl text-center p-1">Related Pokemons </CardHeader>
            <CardContent className={gridClass}>
                {
                    data.map(pokemon => <PokemonCard pokemon={pokemon} key={pokemon.id} />)
                }
            </CardContent>
        </Card>
    )
}

export { RelatedPokemons }