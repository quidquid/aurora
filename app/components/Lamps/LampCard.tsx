'use client';

import { Badge, Button, Card, Collapse, Group, Text, Title, UnstyledButton } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { LampForm } from '~/components/Lamps/LampForm'
import { useDisclosure } from '@mantine/hooks';

export function LampCard(lamp: object) {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <Card mb='md'>
      <Group justify='space-between' mt='xs' mb='xs'>
        <Title order={3}>{lamp.name}</Title>
        <Group>
          <Badge color='cyan'>
            {lamp.numPixels} {lamp.numPixels === 1 ? 'pixel' : 'pixels'}
          </Badge>
          <Badge color='gray'>
            {lamp.type}
          </Badge>
          <Badge color='gray'>
            {lamp.colorOrder}
          </Badge>
          <UnstyledButton onClick={toggle}>
            <FontAwesomeIcon icon={faPencil} color='cyan' />
          </UnstyledButton>
        </Group>
      </Group>
      <Collapse in={opened}>
        <LampForm light={lamp} onSubmitted={(vals) => { toggle() }}/>
      </Collapse>
    </Card>
  )
}
