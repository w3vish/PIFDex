import { imageURLs } from "../constants";

type SpriteType = 'autogen';

/**
 * Generates an image URL based on the provided sprite ID.
 * Depending on the type of ID (base, fusion, triple), the appropriate image path is selected.
 *
 * @param {string} id - The sprite ID, which can be a base sprite, fusion, or triple fusion.
 * @param {SpriteType} [spriteType] - The type of sprite (autogen, base, fusion, triple). Optional.
 * @returns {string} - The complete URL to the sprite image.
 */
function getSpriteImageURL(id: string, spriteType?: any) {
    let imagePath: string;

    // Conditional logic to select image path based on sprite type or id length
    if(spriteType === 'autogen') return `${imageURLs['autogen']}/${id}.png` 
     
        const idLength = id.split('.').length || '';
        imagePath = idLength === 1 ? imageURLs['base']
                 : idLength === 2 ? imageURLs['fusion']
                 : imageURLs['triple'];
    

    // Construct the full image URL
    const fullImageURL = `${imagePath}/${id}.png`;
    return fullImageURL;
}

export default getSpriteImageURL;
