'use client';

// /lamps page

import { useState } from 'react';
import { Button, Collapse, Group, Loader, Notification, Title, Checkbox, UnstyledButton } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { LampCard } from '@/components/Lamps/LampCard'
import { LampForm } from '@/components/Lamps/LampForm'
import { useGetLightsQuery } from '@/lib/features/auroraApi'
import { useDisclosure } from '@mantine/hooks';

export default function LampsPage() {
  const [opened, { toggle }] = useDisclosure(false);
  const { data, error, isLoading } = useGetLightsQuery()

  let body = null
  if (error) {
    body = <Group justify='space-around' mt={100}>
      <Notification title='Error'>Oh no, there was an error</Notification>
    </Group>

  } else if (isLoading) {
    body = <Group justify='space-around' mt={100}>
      <Loader></Loader>
    </Group>

  } else {
    body = <>
      <Collapse in={opened} mb='lg'>
        <LampForm/>
      </Collapse>
      {data.lights.map((lamp) => <LampCard key={lamp.id} {...lamp}/>)}
    </>
  }

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
