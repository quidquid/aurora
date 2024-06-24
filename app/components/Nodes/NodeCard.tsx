'use client';

import { Avatar, Badge, Button, Card, Code, Group, Switch, Text, Title, ScrollArea } from '@mantine/core';
//import { useGetNodeByIdQuery } from '@/lib/features/auroraApi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff, faWifi, faSun, faEye, faExternalLinkSquareAlt } from '@fortawesome/free-solid-svg-icons'

export function NodeCard(node: object) {
  //const { data, error, isLoading } = useGetNodesByIdQuery()

  let m = node.name.match(/^([A-Z]+)\.([A-z0-9- ]+)$/)
  let initial = node.name[0]
  let name = node.name
  if(m) {
    initial = m[1]
    name = m[2]
  }

  const lastSeen = new Date(node.lastSeen)
  const lastSeenAgo = (new Date() - lastSeen) / 1000
  const online = (lastSeenAgo < 15*60)
  
  return (
    <Card mb='md'>
      <Group justify='space-between' mt='md' mb='xs'>
        <Group>
          <Avatar color="cyan" radius="xl">{initial}</Avatar>
          <Title order={2}>{name}</Title>
          <Switch checked={node.state.on}/>
        </Group>
        <Group>
          <Badge color='cyan'>{node.ip}</Badge>
          <Badge color='gray'>{node.info.ver}</Badge>
          <a href={`http://${node.ip}`} target='_blank'>
            <FontAwesomeIcon icon={faExternalLinkSquareAlt}/>
          </a>
        </Group>
      </Group>

      <Group justify='space-between' mt='xs' mb='xs'>
        <Group>
          <Text size='lg' c='dimmed'>
            <FontAwesomeIcon icon={faWifi}/>{' '}
            {node.info.wifi.rssi} dBm
          </Text>
          <Text size='lg' c='dimmed'>
            <FontAwesomeIcon icon={faSun}/>{' '}
            {node.state.bri}
          </Text>
        </Group>
        <Text size='lg' c={online ? 'green' : 'dimmed'}>
          <FontAwesomeIcon icon={faEye}/>{' '}
          {lastSeen.toISOString()}
        </Text>
      </Group>

      <Group mt='xs' mb='xs'>
        <h3>Connections</h3>
        {node.connections.length === 0 ?
          <span>No connections yet</span> :
          <>
            {node.connections.map((conn: object) => {
              return <div>connection</div>;
            })}
          </>}
      </Group>

      <ScrollArea type='auto' h={200}>
        <Code size='sm' c='dimmed' block>
          {JSON.stringify(node, null, 2)}
        </Code>
      </ScrollArea>
    </Card>
  )
}
