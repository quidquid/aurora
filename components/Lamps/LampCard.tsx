'use client';

import { Avatar, Badge, Button, Card, Code, Group, Switch, Text, Title, ScrollArea } from '@mantine/core';
//import { useGetNodeByIdQuery } from '@/lib/features/auroraApi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { faLightbulb } from '@fortawesome/free-solid-svg-icons'

export function LampCard(lamp: object) {
  return (
    <Card mb='md'>
      <Group justify='space-between' mt='xs' mb='xs'>
        <Title order={3}>{lamp.name}</Title>
      </Group>
      <Group justify='space-between' mt='xs' mb='xs'>
        <Text size='lg' c='dimmed'>
          {lamp.numPixels} {lamp.numPixels === 1 ? 'pixel' : 'pixels'}
        </Text>
        <Text size='lg' c='dimmed'>
          {lamp.colorOrder}
        </Text>
      </Group>
    </Card>
  )
}
