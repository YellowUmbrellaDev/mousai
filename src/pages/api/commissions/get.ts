import type { APIRoute} from 'astro';
import { createClient } from "@libsql/client";
import { getSession } from 'auth-astro/server';

const client = createClient({
    url: import.meta.env.TURSO_URL,
    authToken: import.meta.env.TURSO_SECRET,
  });

export const GET: APIRoute = async ({ request }) => {
  const session = await getSession(request)
  if (!session) {
    return new Response(null, {status: 401});
  }
  const email = session.user?.email;
  if (!email) {
    return new Response(null, { status: 400 });
  }
  const { rows } = await client.execute({
    sql: "SELECT * FROM commissions WHERE email = ?",
    args: [email],
  });
  if (!rows.length) {
    return new Response(null, { status: 204 });
  }
  return new Response(JSON.stringify(rows));
};