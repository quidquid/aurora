import prisma from '@/lib/db';
import { json } from "@remix-run/node"; // or cloudflare/deno
import { useLoaderData } from '@remix-run/react';

export const loader = async () => {
  const nodes = await prisma.node.findMany()
  return json({ nodes });
};


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Group, Title, Loader, Notification } from '@mantine/core';
import { NodeCard } from '~/components/Nodes/NodeCard'
//import { useDiscoverQuery } from '@/lib/features/auroraApi'


export default function NodesPage() {
  // const { data, error, isLoading } = useDiscoverQuery()
  // const { data, error, isLoading } = useGetNodesQuery()
  const { nodes } = useLoaderData<typeof loader>()

  /*const { data, status, isLoading, error, refetch } = useDiscoverQuery(null, {
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

  } else  { */
    const body = nodes.map((node) => <NodeCard key={node.id} {...node}/>)
  //}

  return <>
    <Group justify="space-between" mb='md'>
      <Title order={2}>Nodes</Title>
    </Group>

    {body}
  </>
}
