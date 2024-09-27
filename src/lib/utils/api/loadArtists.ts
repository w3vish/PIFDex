import { apiURL } from "../constants";

type ArtistResponse = {
  artist_name	: string;
  total_sprites: number;
  images: Array<{
    sprite_id: string;
    artists: string[];
    primary_type: string;
    secondary_type: string;
    base_pokemons: {
      [key: string]: string;
    };
  }>;
  pagination: {
    total: number;
    per_page: number;
    current_page: number;
    total_pages: number;
  };
};

type LoadArtistParams = {
  artistName: string;
  limit?: number;
  page?: number;
};

/**
 * This Function Fetches Artist Info From API and Returns Artist Info Object
 * @param params Object with artistName, limit (optional), and page (optional)
 * @returns ArtistResponse
 */
const loadArtists = async ({ artistName, limit, page }: LoadArtistParams): Promise<ArtistResponse> => {
  const url = new URL(`${apiURL}/artists/${artistName}`);
  
  if (limit) {
    url.searchParams.append('limit', limit.toString());
  }
  
  if (page) {
    url.searchParams.append('page', page.toString());
  }

  const response = await fetch(url);
  const data: ArtistResponse = await response.json();

  return data;
};

export { loadArtists };
