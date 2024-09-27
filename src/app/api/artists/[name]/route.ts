import { NextRequest, NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';
import { parseJsonResults } from '@/lib/utils';

export const runtime = 'edge';

// Define an interface for the database result
interface ArtistSpriteResult {
  name: string;
  total_sprites: number;
  images: string;
}

// Utility function to generate pagination data
function generatePagination(totalSprites: number, limit: number, currentPage: number) {
  const totalPages = Math.ceil(totalSprites / limit);
  return {
    total: totalSprites,
    per_page: limit,
    current_page: currentPage,
    total_pages: totalPages,
  };
}

// Main API Handler
export async function GET(request: NextRequest, { params }: { params: { name: string } }) {
  try {
    const artistName = decodeURIComponent(params.name).trim(); // Decode and trim artist name

    // Validate artist name
    if (!artistName || artistName.length < 3) {
      return NextResponse.json({ error: 'Invalid artist name. It must be at least 3 characters long.' }, { status: 400 });
    }

    // Extract query parameters from the request
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '100', 10);  // Default limit to 100
    const page = parseInt(searchParams.get('page') || '1', 10);      // Default page to 1
    const offset = (page - 1) * limit;

    // Validate limit and page values
    if (isNaN(limit) || limit <= 0 || isNaN(page) || page < 1) {
      return NextResponse.json({ error: 'Invalid pagination values.' }, { status: 400 });
    }

    // Query the database
    const db = getRequestContext().env.DB;

    const query = `
    WITH limited_sprites AS (
      SELECT json_extract(value, '$.sprite_id') AS sprite_id, json_extract(value, '$.base_id') AS base_id
      FROM artists, json_each(sprites)
      WHERE artist_name = ?1
      LIMIT ?2 OFFSET ?3
    ),
    sprite_details AS (
      SELECT 
        ls.sprite_id,
        ls.base_id,
        s.name,
        s.base_pokemons,
        s.primary_type,
        s.secondary_type,
        s.total_sprites
      FROM limited_sprites ls
      JOIN sprites s ON ls.base_id = s.id
    )
    SELECT 
      ?1 AS artist_name,
      (SELECT total_sprites FROM artists WHERE artist_name = ?1) AS total_sprites, -- Total sprites for the artist
      json_group_array(
        json_object(
          'sprite_id', sd.sprite_id,
          'base_id', sd.base_id,
          'name', sd.name,
          'base_pokemons', sd.base_pokemons,
          'primary_type', sd.primary_type,
          'secondary_type', sd.secondary_type,
          'total_sprites', sd.total_sprites
        )
      ) AS images
    FROM sprite_details sd;
    `;
    

    // Execute query and bind parameters
    const stmt = await db.prepare(query).bind(artistName, limit, offset).first();

    // Handle case where artist is not found
    if (!stmt) {
      return NextResponse.json({ error: 'Artist not found' }, { status: 404 });
    }

    // Parse results
    const result = parseJsonResults(stmt);
    const totalSprites = Number(result.total_sprites);

    // Prepare pagination data
    const pagination = generatePagination(totalSprites, limit, page);

    // Combine result with pagination and return response
    const response = {
      ...result,
      pagination,
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error("Database query error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}