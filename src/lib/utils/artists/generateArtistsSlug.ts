/**
 * Function to generate a URL-friendly artist name (slug) with "/artists/{slug}" format.
 * - Converts spaces to hyphens.
 * - Converts the name to lowercase.
 * - Prepends "/artists/" to the slug.
 * @param name - The original artist name.
 * @returns A URL-friendly artist slug with the "/artists/" prefix.
 */
export function generateArtistSlug(name: string): string {
    // Replace spaces with hyphens
    const slug = name.replace(/\s+/g, '-');
    // Return the slug with the "/artists/" prefix
    return `/artists/${slug}`;
}
