/**
 * This Function takes Base Pokemon Id as an argument, loads all Fusions
 * of this ID, and returns a Full JSON Object with all related Sprites Data
 */

import { apiURL } from "../constants"

type LoadAllFusionsResponse = {
    data: Array<{
        id: string,
        name: string,
        primary_type: string,
        secondary_type: string,
        base_pokemons: {
            [key: string]: string
        },
        total_sprites: number,
        images: Array<{
            sprite_id: string,
            sprite_type: string,
            artists: Array<string>
        }>
    }>
}

const LoadAllFusion = async (id: string): Promise<LoadAllFusionsResponse | null> => {
    try {
        const reqURL = `${apiURL}/find?pokemon_id=${id}&compact_images=true&limit=-1`
        const req = await fetch(reqURL)

        if (!req.ok) {
            throw new Error(`Failed to fetch: ${req.statusText}`);
        }
        const data: unknown = await req.json()
        return data as LoadAllFusionsResponse
    } catch (error) {
        console.error("Error loading fusion data:", error)
        return null
    }
}

export { LoadAllFusion }

