import { LoadAllFusion } from "@/lib/utils"
import { RelatedFusionsClient } from "./RelatedFusionsClient"

const RelatedFusions = async({id}: {id: string}) => {
    const allData = await LoadAllFusion(id)
    if (!allData) return <p>no data</p>
    return (
        <RelatedFusionsClient pokemons={allData} id={id}/>
    )
}


export {
    RelatedFusions
}