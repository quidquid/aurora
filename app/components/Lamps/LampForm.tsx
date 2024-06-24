import { useLoaderData, Form, useSubmit } from '@remix-run/react';

import { Button, Fieldset, Group, Select, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useUpdateLightMutation, useCreateLightMutation } from '@/lib/features/auroraApi'

export function LampForm({ light }) {
  const submit = useSubmit();
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


  /*const onSubmit = (values) => {
    console.log(values)
    if (light) {
      updateLight(values)
    } else {
      createLight(values)
    }
  }*/


  return (
    <Form method='post' onSubmit={form.onSubmit((_v, e) => submit(e.currentTarget))}>
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
    </Form>
  )
}