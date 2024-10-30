import { PokemonCardData } from "@/lib/types/SpriteResponse";
import { apiURL } from "../constants";


type ArtistResponse = {
  totalImages: number
  artistName: string
  pagination: {
    total: number
    totalPages: number
    currentPage: number
    limit: number
    offset: number
  }
  data: PokemonCardData[]
}



type LoadArtistParams = {
  artistName: string;
  limit?: number;
  page?: number;
};

/**
 * Fetches artist info from the API and returns an ArtistResponse object
 * @param params Object with artistName, limit (optional), and page (optional)
 * @returns Promise<ArtistResponse>
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

export {
  loadArtists,
  type ArtistResponse,
  type LoadArtistParams,
};