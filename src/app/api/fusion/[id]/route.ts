import { parseJsonResults } from "@/lib/utils";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { NextRequest } from "next/server";

export const runtime = 'edge';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    // Input validation
    if (!params?.id) {
        return Response.json({ error: 'ID parameter is required' }, { status: 400 });
    }

    const db = getRequestContext().env.DB;
    const ids = [params.id, params.id.split('.').reverse().join('.')];

    // SQL query for fetching the sprite data
    const placeholders = ids.map(() => '?').join(',');
    const query = `SELECT * FROM sprites WHERE id IN (${placeholders})`;

    try {
        const stmt = await db.prepare(query).bind(...ids).all();
        const data = parseJsonResults(stmt);

        // If no data is found, return 404
        if (data.length === 0) {
            return Response.json({ error: 'Sprite not found' }, { status: 404 });
        }

        // Return the found data
        return new Response(JSON.stringify(data), { status: 200 });
    } catch (error: any) {
        // Catching and handling any database query errors
        return Response.json({ error: 'Database query failed', details: error.message }, { status: 500 });
    }
}
