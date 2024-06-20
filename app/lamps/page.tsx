'use client';

// /lamps page

import { useState } from 'react';
import { Button, Collapse, Group, TextInput, Title, Checkbox, UnstyledButton } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { LampCard } from '@/components/Lamps/LampCard'
import { useGetLightsQuery, useCreateLightMutation } from '@/lib/features/auroraApi'
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';

export default function LampsPage() {
  const [opened, { toggle }] = useDisclosure(false);
  const { data, error, isLoading } = useGetLightsQuery()

  const [
    createLight, // This is the mutation trigger
    { isLoading: isCreating }, // This is the destructured mutation result
  ] = useCreateLightMutation()


  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      type: 'LANTERN',
      numPixels: 1,
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
    createLight(values)
  }

  return <>
    <Group justify="space-between" mb='md'>
      <Title order={2}>Lights</Title>
      <UnstyledButton onClick={toggle}>
        <FontAwesomeIcon size='2xl' icon={faPlusCircle} color='cyan' />
      </UnstyledButton>
    </Group>
    <Collapse in={opened} mb='lg'>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <TextInput
          withAsterisk
          label="Name"
          key={form.key('name')}
          {...form.getInputProps('name')}
        />

        <Group justify="flex-end" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Collapse>

    {data.lights.map((lamp) => <LampCard key={lamp.id} {...lamp}/>)}
  </>
}
