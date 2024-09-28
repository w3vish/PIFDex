import { parseJsonResults } from "@/lib/utils";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { NextRequest, NextResponse } from "next/server";

interface Params {
    params: {
        name: 'home' | 'types' | 'abilities' | 'moves' | 'self-fusions' | 'triple-fusions' |
        'base-pokemons' | 'info'
    }
}

export const runtime = 'edge';

export async function GET(request: NextRequest, { params }: Params) {
    const pageName: string = params.name;

    if (!pageName) {
        return NextResponse.json({ error: "Page name is required" }, { status: 400 });
    }

    try {
        const db = getRequestContext().env.DB;
        let query = '';
        let results;

        switch (pageName) {
            case 'home':
                query = `
                    SELECT 
                      s.id, 
                      s.name, 
                      s.primary_type, 
                      s.secondary_type, 
                      s.base_pokemons, 
                      s.total_sprites,
                      s.images, 
                      json_extract(gi.base_pokemon_names, '$.' || s.id) as fusion_data, 
                      json_extract(gi.custom_sprites_head_body, '$.' || s.id || '.head') as head_fusions, 
                      json_extract(gi.custom_sprites_head_body, '$.' || s.id || '.body') as body_fusions 
                    FROM 
                      sprites s 
                    CROSS JOIN 
                      game_info gi 
                    WHERE 
                      s.id NOT LIKE '%.%' 
                      AND s.id NOT LIKE '%.%.%' 
                    ORDER BY 
                      CAST(s.id AS INTEGER) 
                `;
                break;

            case 'self-fusions':
                query = `
                        SELECT
                          s.id,
                          s.name,
                          s.primary_type,
                          s.secondary_type,
                          s.base_pokemons,
                          s.total_sprites,
                          s.images
                        FROM
                          sprites s
                        WHERE
                          s.id LIKE '%.%' 
                          AND SUBSTR(s.id, 1, INSTR(s.id, '.') - 1) = SUBSTR(s.id, INSTR(s.id, '.') + 1) 
                        ORDER BY
                          CAST(s.id AS INTEGER)
                    `;
                break;

            case 'triple-fusions':
                query = `
                        SELECT
                          s.id,
                          s.name,
                          s.primary_type,
                          s.secondary_type,
                          s.base_pokemons,
                          s.total_sprites,
                          s.images
                        FROM
                          sprites s
                        WHERE
                          s.id LIKE '%.%.%' 
                        ORDER BY
                          CAST(s.id AS INTEGER)
                    `;
                break;

            case 'types':
                query = `SELECT * FROM types`;
                break;

            case 'abilities':
                query = `SELECT * FROM abilities`;
                break;

            case 'moves':
                query = `SELECT * FROM moves`;
                break;
            case 'info':
              query = `SELECT * FROM game_info`;
              break;
            default:
                return NextResponse.json({ error: "Invalid page name" }, { status: 400 });
        }

        results = await db.prepare(query).all();

        // Parse the results
        const parsedResults = parseJsonResults(results);

        return NextResponse.json(parsedResults);

    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: "An error occurred while processing your request" }, { status: 500 });
    }
}
