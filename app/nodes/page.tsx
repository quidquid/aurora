'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { faEnvelope, faLightbulb } from '@fortawesome/free-solid-svg-icons'
import { Button, Group } from '@mantine/core';
import { NodeList } from '@/components/Nodes/NodeList'
import { useDiscoverQuery } from '@/lib/features/auroraApi'


export default function NodesPage() {
  const { data, error, isLoading } = useDiscoverQuery()

  return <>
    <NodeList/>
  </>
}
