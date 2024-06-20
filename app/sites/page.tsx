'use client';

// /sites page

import { useState } from 'react';
import { Button, Collapse, Group, TextInput, Title, UnstyledButton } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { SiteCard } from '@/components/Sites/SiteCard'
import { useGetSitesQuery, useCreateSiteMutation } from '@/lib/features/auroraApi'
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';

export default function SitesPage() {
  const [opened, { toggle }] = useDisclosure(false);
  const { data, error, isLoading } = useGetSitesQuery()

  const [
    createSite, // This is the mutation trigger
    { isLoading: isCreating }, // This is the destructured mutation result
  ] = useCreateSiteMutation()


  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      imageURL: '',
      //numPixels: 1,
    },
  });

  if(error) {
    return <>Oh no, there was an error</>
  }

  if(isLoading) {
    return <>Loading...</>
  }

  const onSubmit = (values) => {
    console.log(values)
    createSite(values)
  }

  return <>
    <Group justify="space-between" mb='md'>
      <Title order={2}>Sites</Title>
      <UnstyledButton onClick={toggle}>
        <FontAwesomeIcon size='2xl' icon={faPlusCircle} color='cyan' />
      </UnstyledButton>
    </Group>
    <Collapse in={opened}>
      <form onSubmit={form.onSubmit(onSubmit)}>
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
      </form>
    </Collapse>

    {data.sites.map((site) => <SiteCard key={site.id} {...site}/>)}
  </>
}
