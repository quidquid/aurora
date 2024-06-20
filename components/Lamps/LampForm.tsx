'use client';

import { Button, Fieldset, Group, Select, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useUpdateLightMutation, useCreateLightMutation } from '@/lib/features/auroraApi'

export function LampForm({ light }) {
  const [
    createLight, // This is the mutation trigger
    { isLoading: isCreating }, // This is the destructured mutation result
  ] = useCreateLightMutation()

  const [
    updateLight, // This is the mutation trigger
    { isLoading: isUpdating }, // This is the destructured mutation result
  ] = useUpdateLightMutation()

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      id: light?.id || '',
      name: light?.name || '',
      type: light?.type || 'LANTERN',
      numPixels: light?.numPixels || 1,
      colorOrder: light?.colorOrder || 'GRB',
    },
  })

  const onSubmit = (values) => {
    console.log(values)
    if (light) {
      updateLight(values)
    } else {
      createLight(values)
    }
  }


  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Fieldset legend={`${light ? 'Update' : 'Create'} light`}>
        <TextInput
          withAsterisk
          label="Name"
          key={form.key('name')}
          {...form.getInputProps('name')}
        />
        <Select
          label='Type'
          data={['SINGLE', 'LANTERN', 'FLOOD', 'STRING']}
          key={form.key('type')}
          {...form.getInputProps('type')}
        />

        <Group mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </Fieldset>
    </form>
  )
}