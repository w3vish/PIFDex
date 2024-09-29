import { getMainSpriteId, parseJsonResults } from "@/lib/utils";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { NextRequest } from "next/server";

export const runtime = 'edge'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    if (!params?.id) {
        return Response.json({ error: 'ID parameter is required' }, { status: 400 });
    }
    const db = getRequestContext().env.DB;
    const ids = [params.id, params.id.split('.').reverse().join('.')];

    let query;
    let bindValues: string[] = [];

    const placeholders = ids.map(() => '?').join(',');
    query = `SELECT * FROM sprites WHERE id IN (${placeholders})`;
    bindValues = ids;


    try {
        const stmt = await db.prepare(query).bind(...bindValues).all();
        const data = parseJsonResults(stmt);
        return Response.json(data);
    } catch (error: any) {
        return Response.json({ error: 'Database query failed', details: error.message }, { status: 500 });
    }

}