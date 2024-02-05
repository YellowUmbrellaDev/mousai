import socialsjson from '../../../data/socials.json';
import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ request }) => {
  return new Response(JSON.stringify(socialsjson))
}