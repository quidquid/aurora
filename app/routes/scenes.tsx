import prisma from '@/lib/db';
import { json } from "@remix-run/node"; // or cloudflare/deno
import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
} from "@remix-run/node";
import { useLoaderData, Form, useSubmit } from '@remix-run/react';

import { Button, Collapse, Group, TextInput, Title, UnstyledButton } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { SceneCard } from '~/components/Scenes/SceneCard'
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';


export const loader = async () => {
  const scenes = await prisma.scene.findMany()
  return json({ scenes });
};

export const action = async ({ params, request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const attrs = Object.fromEntries(formData);
  console.log(attrs);

  const scene = await prisma.scene.create({
    data: attrs
  })
  return json({ scene })
}




export default function ScenesPage() {
  const [opened, { toggle }] = useDisclosure(false);
  const { scenes } = useLoaderData<typeof loader>()

  const submit = useSubmit();
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
    },
  })

  const onSubmit = (values, e) => {
    console.log(values)
    submit(values, {
      action: '/scenes',
      method: 'post'
    })
  }


  return <>
    <Group justify="space-between" mb='md'>
      <Title order={2}>Scenes</Title>
      <UnstyledButton onClick={toggle}>
        <FontAwesomeIcon size='2xl' icon={faPlusCircle} color='cyan' />
      </UnstyledButton>
    </Group>
    <Collapse in={opened}>
    <Form method='post' onSubmit={form.onSubmit(onSubmit)}>
      <TextInput
          withAsterisk
          label="Name"
          key={form.key('name')}
          {...form.getInputProps('name')}
        />
       
        <Group justify="flex-end" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </Form>
    </Collapse>

    {scenes.map((scene) => <SceneCard key={scene.id} {...scene}/>)}
  </>
}
