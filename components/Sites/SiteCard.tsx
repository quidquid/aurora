'use client';

import { Avatar, Badge, Button, Card, Code, Group, Switch, Text, Title, ScrollArea } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff, faWifi, faSun, faEye, faExternalLinkSquareAlt } from '@fortawesome/free-solid-svg-icons'

export function SiteCard(site: object) {
  //const { data, error, isLoading } = useGetNodesByIdQuery()

  return <Card mb='md'>
    <Group justify='space-between' mt='xs' mb='xs'>
      <Group>
        <Title order={3}>{site.name}</Title>
      </Group>
      <Group>
      </Group>
    </Group>
  </Card>
}