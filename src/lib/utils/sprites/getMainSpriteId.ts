/**
 * Extracts the base ID from a single sprite ID string.
 * This function URL-decodes the input and removes any trailing alphabetical characters, dashes, and spaces.
 *
 * @param {string} id - The sprite ID to process.
 * @returns {string} - The base or main ID without any alternative characters or trailing dashes/spaces.
 */
function getMainSpriteId(id: string) {
    // URL-decode the input ID
    const decodedId = decodeURIComponent(id);
    
    // Match and capture the first valid numeric pattern (e.g., 13, 13.34, 13.3.4)
    const match = decodedId.match(/^\d+(\.\d+){0,2}/);

    // Safely return the match, or an empty string if no match is found
    return match ? match[0] : '';  // If match is null, return an empty string
}
export default getMainSpriteId


