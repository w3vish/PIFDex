/**
 * This Function will take Fusion ID as Argument and return Head and Body Fusion 
 * e.g. For Arg 1.2 return 1.2 and 2.1
 */


import { apiURL } from "../constants"
import { APIResponse } from "@/lib/types"


const loadFusion = async (fusionId: string) => {
    const res = await fetch(`${apiURL}/sprites/${fusionId}`)
    const data: APIResponse = await res.json()
    return data
}

export { loadFusion }