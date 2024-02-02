import type { APIRoute } from 'astro';

interface FormData {
  name: string;
  pronouns: string;
  email: string;
  description: string;
  id: string;
}

export const POST: APIRoute = async ({ request }) => {
    const body = await request.json();
    const name = body.name;
    const pronouns = body.pronouns;
    const email = body.email;
    const description = body.description;
    const id = body.id;
    console.log(body);
    return new Response(null, {status: 200});
  }