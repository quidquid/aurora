import prisma from '@/lib/db';
import { json } from "@remix-run/node"; // or cloudflare/deno
import { useLoaderData } from '@remix-run/react';

export const loader = async () => {
  const nodes = await prisma.node.findMany()
  return json({ nodes });
};
