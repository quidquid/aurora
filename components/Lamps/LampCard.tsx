'use client';

import { Avatar, Badge, Button, Card, Code, Group, Switch, Text, ScrollArea } from '@mantine/core';
//import { useGetNodeByIdQuery } from '@/lib/features/auroraApi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLightbulb } from '@fortawesome/free-solid-svg-icons'

export function LampCard(lamp: object) {
  return (
    <Card>
      <Group justify='space-between' mt='md' mb='xs'>
        <h2>{lamp.name}</h2>
      </Group>
    </Card>
  )
}
