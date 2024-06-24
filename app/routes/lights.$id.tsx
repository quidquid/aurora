import prisma from '@prisma/client';
import { json } from "@remix-run/node"; // or cloudflare/deno
import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
} from "@remix-run/node";
import { useLoaderData } from '@remix-run/react';


export const loader = async ({ params }) => {
  const light = await prisma.light.findFirst({
    where: { id: params.id }
  })
  return json({ light });
}


/*export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const light = await prisma.light.delete({
    where: { id: params.id }
  })
  return Response.json({ ok: true, deleted: params.id })
}
*/

export const action = async ({ params, request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);

  await prisma.light.update({
    where: { id: params.id },
    data: updates
  })

  const light = await prisma.light.findFirst({
    where: { id: params.id }
  })

  return json({ light })
}

