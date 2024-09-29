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
        query = `
        WITH sprite_data AS (
            SELECT * FROM sprites WHERE id IN (${placeholders})
        ),
        ability_ids AS (
            SELECT json_each.value AS id, 'normal' AS ability_type, sprite_data.id AS sprite_id
            FROM sprite_data, json_each(sprite_data.abilities)
            UNION ALL
            SELECT json_each.value AS id, 'hidden' AS ability_type, sprite_data.id AS sprite_id
            FROM sprite_data, json_each(sprite_data.hidden_abilities)
        ),
        move_data AS (
            SELECT 
                json_extract(value, '$.move') AS id,
                json_extract(value, '$.level') AS level,
                sprite_data.id AS sprite_id
            FROM sprite_data, json_each(sprite_data.moves)
        )
        SELECT 
            s.*,
            (
                SELECT json_group_array(
                    json_object(
                        'id', a.id,
                        'real_name', a.real_name,
                        'real_description', a.real_description,
                        'type', ai.ability_type
                    )
                )
                FROM ability_ids ai
                LEFT JOIN abilities a ON ai.id = a.id
                WHERE ai.sprite_id = s.id
            ) AS all_abilities,
            (
                SELECT json_group_array(
                    json_object(
                        'id', m.id,
                        'real_name', m.real_name,
                        'function_code', m.function_code,
                        'base_damage', m.base_damage,
                        'type', m.type,
                        'category', m.category,
                        'accuracy', m.accuracy,
                        'total_pp', m.total_pp,
                        'effect_chance', m.effect_chance,
                        'target', m.target,
                        'priority', m.priority,
                        'flags', m.flags,
                        'real_description', m.real_description,
                        'level', md.level
                    )
                )
                FROM move_data md
                LEFT JOIN moves m ON md.id = m.id
                WHERE md.sprite_id = s.id
            ) AS all_moves
        FROM sprite_data s;`;
        bindValues = ids;
    

        try {
            const stmt = await db.prepare(query).bind(...bindValues).all();
            const data = parseJsonResults(stmt);
            return Response.json(data);
        } catch (error: any) {
            return Response.json({ error: 'Database query failed', details: error.message }, { status: 500 });
        }
        
}