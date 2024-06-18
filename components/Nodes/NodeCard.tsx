'use client';

import { Avatar, Badge, Button, Card, Code, Group, Switch, Text, ScrollArea } from '@mantine/core';
//import { useGetNodeByIdQuery } from '@/lib/features/auroraApi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff, faRadio, faWifi, faSun } from '@fortawesome/free-solid-svg-icons'

export function NodeCard(node: object) {
  //const { data, error, isLoading } = useGetNodesByIdQuery()

  let m = node.name.match(/^([A-Z]+)\.([A-z0-9- ]+)$/)
  let initial = node.name[0]
  let name = node.name
  if(m) {
    initial = m[1]
    name = m[2]
  }

  
  return (
    <Card>
      <Group justify='space-between' mt='md' mb='xs'>
        <Group>
          <Avatar color="cyan" radius="xl">{initial}</Avatar>
          <Switch checked={node.state.on}/>
        </Group>
        <h2>{name}</h2>
        <Badge color='cyan'>{node.ip}</Badge>
      </Group>

      <Group justify='space-between' mt='xs' mb='xs'>
      <Text size='lg' c='dimmed'>
          <FontAwesomeIcon icon={faWifi}/>{' '}
          {node.info.wifi.rssi} dBm
        </Text>
        <Text size='lg' c='dimmed'>
          <FontAwesomeIcon icon={faSun}/>{' '}
          {node.state.bri}
        </Text>
      </Group>

      <ScrollArea type='auto' h={250}>
        <Code size='sm' c='dimmed' block>
          {JSON.stringify(node, null, 2)}
        </Code>
      </ScrollArea>
    </Card>
  )
}
