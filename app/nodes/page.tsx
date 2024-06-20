'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { faEnvelope, faLightbulb } from '@fortawesome/free-solid-svg-icons'
import { Group, Title, Loader, Notification } from '@mantine/core';
import { NodeCard } from '@/components/Nodes/NodeCard'
import { useDiscoverQuery } from '@/lib/features/auroraApi'


export default function NodesPage() {
  // const { data, error, isLoading } = useDiscoverQuery()
  // const { data, error, isLoading } = useGetNodesQuery()

  const { data, status, isLoading, error, refetch } = useDiscoverQuery(null, {
    pollingInterval: 30 * 1000,
    skipPollingIfUnfocused: true,
  })

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
    body = data.nodes.map((node) => <NodeCard key={node.id} {...node}/>)
  }

  return <>
    <Group justify="space-between" mb='md'>
      <Title order={2}>Nodes</Title>
    </Group>

    {body}
  </>
}
