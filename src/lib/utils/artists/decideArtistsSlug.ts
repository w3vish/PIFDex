/**
 * Function to decode a URL-friendly artist name (slug) back into a readable format.
 * - Converts hyphens to spaces.
 * - Decodes percent-encoded characters (e.g., é from %C3%A9).
 * @param slug - The URL-friendly artist name (slug).
 * @returns The decoded artist name.
 */
export function decodeArtistSlug(slug: string): string {
    const decodedSlug = decodeURIComponent(slug);  // Decodes percent-encoded characters
    return decodedSlug.includes('-')
        ? decodedSlug.replace(/-/g, ' ')  // Replace hyphens with spaces
        : decodedSlug;
}
