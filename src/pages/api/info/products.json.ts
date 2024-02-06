import products from '../../../data/products.json';
import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ request }) => {
  return new Response(JSON.stringify(products))
}