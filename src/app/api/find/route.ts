import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { parseJsonResults } from "@/lib/utils";

export const runtime = 'edge'

interface PokemonFilters {
  pokemon_id?: string;
  fusion_as?: 'head' | 'body';
  sprite_type?: 'custom' | 'autogen';
  id_type?: 'fusion' | 'triples' | 'base';
  type?: string;
  ability?: string;
  move?: string;
  color?: string;
  shape?: string;
  habitat?: string;
  min_height?: number;
  max_height?: number;
  min_weight?: number;
  max_weight?: number;
  limit: number;
  offset: number;
  compact_images: boolean;
}

/**
 * Handles GET requests for Pokémon fusion filtering
 * @param {NextRequest} request - The incoming request object
 * @returns {Promise<NextResponse>} JSON response with filtered Pokémon data or error message
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const filters = extractFilters(searchParams);

    if (Object.keys(filters).length === 0) {
      return NextResponse.json({ error: "At least one filter parameter is required" }, { status: 400 });
    }

    const db = getRequestContext().env.DB;
    const { query, params } = buildQuery(filters);

    const results = await db.prepare(query).bind(...params).all();
    const parsedResults = parseJsonResults(results.results);

    return NextResponse.json({
      data: parsedResults,
      metadata: {
        total: parsedResults.length,
        filters: filters
      }
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: "An error occurred while processing your request" }, { status: 500 });
  }
}

/**
 * Extracts and validates filter parameters from search params
 * @param {URLSearchParams} searchParams - The search parameters from the request URL
 * @returns {PokemonFilters} An object containing validated filter parameters
 */
/**
 * Extracts and validates filter parameters from search params
 * @param {URLSearchParams} searchParams - The search parameters from the request URL
 * @returns {PokemonFilters} An object containing validated filter parameters
 */
function extractFilters(searchParams: URLSearchParams): PokemonFilters {
  const filters: Partial<PokemonFilters> = {
    compact_images: false,
    limit: 10,
    offset: 0
  };

  const numericParams: (keyof PokemonFilters)[] = ['limit', 'offset', 'min_height', 'max_height', 'min_weight', 'max_weight'];
  const stringParams: (keyof PokemonFilters)[] = ['pokemon_id', 'fusion_as', 'sprite_type', 'id_type', 'type', 'ability', 'move', 'color', 'shape', 'habitat'];

  numericParams.forEach(param => {
    const value = searchParams.get(param);
    if (value !== null) {
      const numValue = parseInt(value, 10);
      if (!isNaN(numValue)) {
        (filters[param] as number) = numValue;
      }
    }
  });

  stringParams.forEach(param => {
    const value = searchParams.get(param);
    if (value !== null && value.trim() !== '') {
      (filters[param] as string) = value.trim();
    }
  });

  const compactImages = searchParams.get('compact_images');
  if (compactImages !== null) {
    filters.compact_images = compactImages.toLowerCase() === 'true';
  }

  return filters as PokemonFilters;
}


/**
 * Builds the SQL query and parameter array based on provided filters
 * @param {PokemonFilters} filters - The filter parameters
 * @returns {Object} An object containing the SQL query string and parameter array
 */
function buildQuery(filters: PokemonFilters): { query: string; params: (string | number)[] } {
  let neededSpriteColumns = 'id, name, primary_type, secondary_type, base_pokemons, total_sprites';
  
  if (filters.compact_images) {
    neededSpriteColumns += ', json_extract(images, \'$[0]\') as images';
  } else {
    neededSpriteColumns += ', images';
  }
  
  let query = `SELECT ${neededSpriteColumns} FROM sprites WHERE 1=1`;
  const params: (string | number)[] = [];

  if (filters.pokemon_id) {
    if (filters.fusion_as === 'head') {
      query += ' AND id LIKE ? AND id NOT LIKE "%.%.%"';
      params.push(`${filters.pokemon_id}.%`);
    } else if (filters.fusion_as === 'body') {
      query += ' AND id LIKE ? AND id NOT LIKE "%.%.%"';
      params.push(`%.${filters.pokemon_id}`);
    } else {
      query += ' AND (id = ? OR id LIKE ? OR id LIKE ? OR id LIKE ?)';
      params.push(`${filters.pokemon_id}`, `${filters.pokemon_id}.%`, `%.${filters.pokemon_id}`, `%.${filters.pokemon_id}.%`);
    }
  } else if (filters.id_type) {
    if (filters.id_type === 'fusion') {
      query += ' AND id LIKE "%.%" AND id NOT LIKE "%.%.%"';
    } else if (filters.id_type === 'triples') {
      query += ' AND id LIKE "%.%.%"';
    } else if (filters.id_type === 'base') {
      query += ' AND id NOT LIKE "%.%"';
    }
  }

  if (filters.sprite_type === 'custom') {
    query += ' AND total_sprites > 0';
  } else if (filters.sprite_type === 'autogen') {
    query += ' AND total_sprites = 0';
  }

  if (filters.type) {
    query += ' AND (primary_type = ? OR secondary_type = ?)';
    params.push(filters.type.toUpperCase(), filters.type.toUpperCase());
  }

  if (filters.ability) {
    query += ` AND (
      json_array_length(json_extract(abilities, '$')) > 0 AND json_extract(abilities, '$') LIKE ?
      OR
      json_array_length(json_extract(hidden_abilities, '$')) > 0 AND json_extract(hidden_abilities, '$') LIKE ?
    )`;
    params.push(`%${filters.ability.toUpperCase()}%`, `%${filters.ability.toUpperCase()}%`);
  }

  if (filters.move) {
    query += ` AND (
      json_extract(moves, '$[*].move') LIKE ? 
      OR json_extract(tutor_moves, '$') LIKE ? 
      OR json_extract(egg_moves, '$') LIKE ?
    )`;
    params.push(`%${filters.move.toUpperCase()}%`, `%${filters.move.toUpperCase()}%`, `%${filters.move.toUpperCase()}%`);
  }

  if (filters.color) {
    query += ' AND color = ?';
    params.push(filters.color.toUpperCase());
  }

  if (filters.shape) {
    query += ' AND shape = ?';
    params.push(filters.shape.toUpperCase());
  }

  if (filters.habitat) {
    query += ' AND habitat = ?';
    params.push(filters.habitat.toUpperCase());
  }

  if (filters.min_height !== undefined) {
    query += ' AND height >= ?';
    params.push(filters.min_height);
  }

  if (filters.max_height !== undefined) {
    query += ' AND height <= ?';
    params.push(filters.max_height);
  }

  if (filters.min_weight !== undefined) {
    query += ' AND weight >= ?';
    params.push(filters.min_weight);
  }

  if (filters.max_weight !== undefined) {
    query += ' AND weight <= ?';
    params.push(filters.max_weight);
  }

  query += ' LIMIT ? OFFSET ?';
  params.push(filters.limit, filters.offset);

  return { query, params };
}