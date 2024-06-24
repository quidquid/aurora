import prisma from '@/lib/db';
import { json, redirect } from "@remix-run/node"; // or cloudflare/deno
import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
} from "@remix-run/node";
import { useLoaderData } from '@remix-run/react';


export const loader = async () => {
  const lights = await prisma.light.findMany()
  return json({ lights });
};


export const action = async ({ params, request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const attrs = Object.fromEntries(formData);
  console.log(attrs);
  delete attrs['id']
  attrs.numPixels = parseInt(attrs.numPixels);

  const light = await prisma.light.create({
    data: attrs
  })

  return json({ light })
}



import { Button, Collapse, Group, Loader, Notification, Title, Checkbox, UnstyledButton } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { LampCard } from '~/components/Lamps/LampCard'
import { LampForm } from '~/components/Lamps/LampForm'
import { useDisclosure } from '@mantine/hooks';

export default function LampsPage() {
  const [opened, { toggle }] = useDisclosure(false);
  const { lights } = useLoaderData<typeof loader>();


  /*let body = null
  if (error) {
    body = <Group justify='space-around' mt={100}>
      <Notification title='Error'>Oh no, there was an error</Notification>
    </Group>

  } else if (isLoading) {
    body = <Group justify='space-around' mt={100}>
      <Loader></Loader>
    </Group>

  } else {*/
    const body = <>
      <Collapse in={opened} mb='lg'>
        <LampForm/>
      </Collapse>
      {lights.map((lamp) => <LampCard key={lamp.id} {...lamp}/>)}
    </>
  //}

  return <>
    <Group justify="space-between" mb='md'>
      <Title order={2}>Lights</Title>
      <UnstyledButton onClick={toggle}>
        <FontAwesomeIcon size='2xl' icon={faPlusCircle} color='cyan' />
      </UnstyledButton>
    </Group>

    {body}
  </>
}
