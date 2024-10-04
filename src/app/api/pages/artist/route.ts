import { getRequestContext } from "@cloudflare/next-on-pages";
import { NextRequest, NextResponse } from "next/server";

interface SearchParams {
  limit?: number;
  page?: number;
  search?: string;
  sort?: 'asc' | 'desc';
}

export async function GET(request: NextRequest) {
  // Default values
  let limit = 10;  // Default limit per page
  let page = 1;    // Default page number
  let search = ''; // Default search query
  let sort = 'asc'; // Default sort order

  // Parse URL to get query params
  const { searchParams } = new URL(request.url);

  // Update limit and page from query parameters if available
  if (searchParams.has('limit')) {
    limit = parseInt(searchParams.get('limit') as string, 10) || limit;
  }
  if (searchParams.has('page')) {
    page = parseInt(searchParams.get('page') as string, 10) || page;
  }
  if (searchParams.has('search')) {
    search = searchParams.get('search') as string;
  }
  if (searchParams.has('sort')) {
    const sortParam = searchParams.get('sort') as string;
    if (sortParam === 'asc' || sortParam === 'desc') {
      sort = sortParam;
    }
  }

  // Calculate offset for pagination
  const offset = (page - 1) * limit;

  // Access the database using Cloudflare's environment context
  const db = getRequestContext().env.DB;

  // Build the base SQL query
  let query = `SELECT artist_name, total_sprites FROM artists`;

  // Add search condition if provided
  if (search) {
    query += ` WHERE artist_name LIKE '%${search}%'`;
  }

  // Add sorting by artist_name or total_sprites based on 'sort' parameter
  query += ` ORDER BY artist_name ${sort}`;

  // Add pagination using limit and offset
  query += ` LIMIT ${limit} OFFSET ${offset};`;

  try {
    // Execute the query
    const result = await db.prepare(query).all();

    // Return the result as a JSON response
    return NextResponse.json({ success: true, data: result.results });
  } catch (error: any) {
    // Handle any errors that occur during the query
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
