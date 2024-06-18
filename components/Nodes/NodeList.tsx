'use client';

//import { Button, Group, useMantineColorScheme } from '@mantine/core';
import { useDiscoverQuery, useGetNodesQuery, useGetNodeByIdQuery } from '@/lib/features/auroraApi'
import { NodeCard } from '@/components/Nodes/NodeCard'

export function NodeList() {
  const { data, error, isLoading } = useGetNodesQuery()

  if(error) {
    return <>Oh no, there was an error</>
  }

  if(isLoading) {
    return <>Loading...</>
  }

  return <>
    {data.nodes.map((node) => <NodeCard key={node.id} {...node}/>)}
  </>
}
