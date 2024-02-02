import type { APIRoute} from 'astro';
import { createClient } from "@libsql/client";
import { getSession } from 'auth-astro/server';



interface FormData {
  name: string;
  pronouns: string;
  email: string;
  description: string;
  tier: string;
  username: string;
}

export const POST: APIRoute = async ({ request }) => {
  const session = await getSession(request)
  if (!session) {
    return new Response(null, {status: 401});
  }
  const client = createClient({
    url: import.meta.env.TURSO_URL,
    authToken: import.meta.env.TURSO_SECRET,
  });

  const body = await request.json();
  const name = body.name;
  const pronouns = body.pronouns;
  const email = body.email;
  const description = body.description;
  const tier = body.tier; // Cambiado de body.id a body.tier
  const username = body.username;

  // Verificar si los valores son null
  if (!name || !pronouns || !email || !description || !tier || !username) {
    return new Response(null, {status: 400});
  }

  try {
    // Comprobar si el usuario existe en la tabla Usuarios
    const { rows } = await client.execute({
      sql: "SELECT * FROM users WHERE email = ?", 
      args: [email]
    });

    // Si el usuario no existe, lo insertamos
    if (rows.length === 0) {
      await client.execute({
        sql: "INSERT INTO users (email, username) VALUES (?, ?)", 
        args: [email, username]
      });
    }

    // Ahora que el usuario existe, podemos insertar el pedido
    await client.execute({
      sql: "INSERT INTO commissions (email, name, pronouns, description, tier) VALUES (?, ?, ?, ?, ?)",
      args:[email, name, pronouns, description, tier]
    });
    const boardId = import.meta.env.DECK_TABLE_ID;
    const stackId = import.meta.env.DECK_STACK_ID;
    const data = {
      title: `[${tier}] ${name}`,
      type:'plain',
      order:999,
      description: `Commision from ${name} (${email})\n\nPronouns: ${pronouns}\n\nDescription: ${description}\n\nTier: ${tier}\n\nUsername: ${username}`
    };
    const response = await fetch(`https://cloud.nereacassian.com/apps/deck/api/v1.0/boards/${boardId}/stacks/${stackId}/cards`, {
      method: 'POST',
      headers: {
        "Accept": "*/*",
        "Authorization": 'Basic ' + btoa(import.meta.env.DECK_USER + ':' + import.meta.env.DECK_PASSWORD),
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    // Comprueba si la respuesta de la solicitud fetch fue exitosa
    if (!response.ok) {
      throw new Error(`Fetch request failed with status ${response.status}`);
    }

    return new Response(null, {status: 200});
  } catch (error) {
    console.error(error);
    return new Response(null, {status: 400});
  }
}