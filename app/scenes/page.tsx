'use client';

// /scenes page

import { useState } from 'react';
import { Button, Collapse, Group, TextInput, Checkbox } from '@mantine/core';
import { LampCard } from '@/components/Lamps/LampCard'
import { useGetLightsQuery, useCreateLightMutation } from '@/lib/features/auroraApi'
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';

export default function ScenesPage() {
  const [opened, { toggle }] = useDisclosure(false);
  //const { data, error, isLoading } = useGetLightsQuery()

  const [
    createLight, // This is the mutation trigger
    { isLoading: isCreating }, // This is the destructured mutation result
  ] = useCreateLightMutation()


  /*const form = useForm({
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
  }*/

  return <>
    <div>Scenes page</div>
    {/*<Group justify="center" mb='md'>
      <Button onClick={toggle}>Add a Light</Button>
    </Group>
    <Collapse in={opened}>
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

    {data.lights.map((lamp) => <LampCard key={lamp.id} {...lamp}/>)} */}
  </>
}
