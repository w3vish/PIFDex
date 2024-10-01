/**
 * This Function will take Fusion ID as Argument and return Head and Body Fusion 
 * e.g. For Arg 1.2 return 1.2 and 2.1
 */

import { SpriteResponse } from "@/lib/types"
import { apiURL } from "../constants"

const loadFusion = async (fusionId: string) => {
    if (fusionId.split('.').length !== 2) return null
    const res = await fetch(`${apiURL}/fusion/${fusionId}`)
    const data: SpriteResponse = await res.json()
    return data
}

export { loadFusion }