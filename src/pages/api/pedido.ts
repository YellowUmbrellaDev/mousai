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
      sql: "SELECT * FROM Usuarios WHERE email = ? AND nombre_de_usuario = ?", 
      args: [email, username]
    });

    // Si el usuario no existe, lo insertamos
    if (rows.length === 0) {
      await client.execute({
        sql: "INSERT INTO Usuarios (email, nombre_de_usuario) VALUES (?, ?)", 
        args: [email, username]
      });
    }

    // Ahora que el usuario existe, podemos insertar el pedido
    await client.execute({
      sql: "INSERT INTO Pedidos (email, Nombre, pronombres, descripción, tier) VALUES (?, ?, ?, ?, ?)",
      args:[email, name, pronouns, description, tier]
    });

    return new Response(null, {status: 200});
  } catch (error) {
    console.error(error);
    return new Response(null, {status: 400});
  }
}