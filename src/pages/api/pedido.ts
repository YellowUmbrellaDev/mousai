import type { APIRoute} from 'astro';
import { createClient } from "@libsql/client";
import { getSession } from 'auth-astro/server';
import NextCloudCard from '../../components/services/NextCloudCard.ts';
import TrelloCard from '../../components/services/TrelloCard.ts';
interface FormData {
  name: string;
  pronouns: string;
  email: string;
  description: string;
  tier: string;
  username: string;
}

// Función para generar un string aleatorio
function generateRandomId() {
  return Math.random().toString(36).substring(2, 12);
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
  const tier = body.tier;
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

    // Generar un id único para la comisión
    let id;
    let idExists;
    do {
      id = generateRandomId();
      const { rows } = await client.execute({
        sql: "SELECT * FROM commissions WHERE id = ?", 
        args: [id]
      });
      idExists = rows.length > 0;
    } while (idExists);

    // Ahora que el usuario existe, podemos insertar el pedido
    await client.execute({
      sql: "INSERT INTO commissions (id, email, name, pronouns, description, tier) VALUES (?, ?, ?, ?, ?, ?)",
      args:[id, email, name, pronouns, description, tier]
    });

    let serviceResponse;
    if (import.meta.env.TRAKING_SERVICE === 'nextcloud') {
      serviceResponse = await NextCloudCard(tier, name, email, pronouns, description, username, id);
    } else if (import.meta.env.TRAKING_SERVICE === 'trello') {
      serviceResponse = await TrelloCard(tier, name, email, pronouns, description, username, id);
    } else {
      console.error('Invalid tracking service:', import.meta.env.TRAKING_SERVICE);
      return new Response(null, {status: 500});
    }

    if ((serviceResponse as { status: number } | undefined)?.status === 200) {
      return new Response(null, {status: 200});
    } else {
      console.error('Error from tracking service:', (serviceResponse as { status: number } | undefined)?.status);
      return new Response(null, {status: 500});
    }
  } catch (error) {
    console.error(error);
    return new Response(null, {status: 400});
  }
}