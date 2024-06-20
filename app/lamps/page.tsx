'use client';

// /lamps page

import { useState } from 'react';
import { Button, Collapse, Group, Title, Checkbox, UnstyledButton } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { LampCard } from '@/components/Lamps/LampCard'
import { LampForm } from '@/components/Lamps/LampForm'
import { useGetLightsQuery } from '@/lib/features/auroraApi'
import { useDisclosure } from '@mantine/hooks';

export default function LampsPage() {
  const [opened, { toggle }] = useDisclosure(false);
  const { data, error, isLoading } = useGetLightsQuery()

  if(error) {
    return <>Oh no, there was an error</>
  }

  if(isLoading) {
    return <>Loading...</>
  }

  return <>
    <Group justify="space-between" mb='md'>
      <Title order={2}>Lights</Title>
      <UnstyledButton onClick={toggle}>
        <FontAwesomeIcon size='2xl' icon={faPlusCircle} color='cyan' />
      </UnstyledButton>
    </Group>
    <Collapse in={opened} mb='lg'>
      <LampForm/>
    </Collapse>

    {data.lights.map((lamp) => <LampCard key={lamp.id} {...lamp}/>)}
  </>
}
