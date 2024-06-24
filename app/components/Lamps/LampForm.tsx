import { useLoaderData, Form, useSubmit } from '@remix-run/react';

import { Button, Fieldset, Group, Select, TextInput, NumberInput } from '@mantine/core';
import { useForm } from '@mantine/form';

export function LampForm({ light, onSubmitted }) {
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


  const onSubmit = (values, e) => {
    console.log(values)
    submit(values, {
      action: light ? `/lights/${light.id}` : '/lights',
      method: 'post'
    })
    if(onSubmitted) {
      onSubmitted(values)
    }
  }

  return (
    <Form method='post' onSubmit={form.onSubmit(onSubmit)}>
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
        <NumberInput
          label='Num Pixels'
          min={1} max={1000}
          allowDecimal={false}
          key={form.key('numPixels')}
          {...form.getInputProps('numPixels')}
        />
        <Select
          label='Color Order'
          data={['GRB', 'RGB', 'BRG', 'RBG', 'BGR', 'GBR']}
          key={form.key('colorOrder')}
          {...form.getInputProps('colorOrder')}
        />
        <Group mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </Fieldset>
    </Form>
  )
}