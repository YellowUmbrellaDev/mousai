import type { APIRoute} from 'astro';
import { createClient } from "@libsql/client";

const client = createClient({
  url: import.meta.env.TURSO_URL,
  authToken: import.meta.env.TURSO_SECRET,
});

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json();
  const cardId = data.cardId;
  const status = data.list.name;
  const updateCardStatus = await client.execute(
    {
      sql: `UPDATE commissions SET status = $1 WHERE id = $2`,
      args: [],
    }
  )
}