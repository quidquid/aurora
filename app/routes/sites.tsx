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
import { SiteCard } from '~/components/Sites/SiteCard'
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';

export const loader = async () => {
  const sites = await prisma.site.findMany()
  return json({ sites });
};


export const action = async ({ params, request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const attrs = Object.fromEntries(formData);
  attrs.imageExtent = {
    sw: { x: 0, y: 0 },
    ne: { x: 1, y: 1 },
  }
  console.log(attrs);

  const site = await prisma.site.create({
    data: attrs
  })
  return json({ site })
}




export default function SitesPage() {
  const [opened, { toggle }] = useDisclosure(false);
  const { sites } = useLoaderData<typeof loader>()

  const submit = useSubmit();
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      imageURL: '',
    },
  })

  const onSubmit = (values, e) => {
    console.log(values)
    submit(values, {
      action: '/sites',
      method: 'post'
    })
  }


  return <>
    <Group justify="space-between" mb='md'>
      <Title order={2}>Sites</Title>
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
        <TextInput
          withAsterisk
          label="Image URL"
          key={form.key('imageURL')}
          {...form.getInputProps('imageURL')}
        />

        <Group justify="flex-end" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </Form>
    </Collapse>

    {sites.map((site) => <SiteCard key={site.id} {...site}/>)}
  </>
}
