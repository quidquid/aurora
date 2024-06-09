'use client';

import { useState } from 'react';
import {
  AppShell, Burger, NavLink,
  Badge,
  Button, Link, Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLightbulb } from '@fortawesome/free-solid-svg-icons'
import { Welcome } from '../components/Welcome/Welcome';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';


export default function HomePage() {
  const [opened, { toggle }] = useDisclosure();
  const [active, setActive] = useState(0);

  const navItems = [
    { icon: faEnvelope,
      label: 'Hello',
    },
    { icon: faLightbulb,
      label: 'Light',
    },
  ];
  const navLinks = navItems.map((item, index) => <NavLink
    href="#required-for-focus"
    label={item.label}
    leftSection={<FontAwesomeIcon icon={item.icon} />}
    active={index === active}
    onClick={() => setActive(index)}
    key={`navlink-${index}`}
  />);

  let main = null;
  if (active === 0) {
    main = <>
      <Welcome />
      <ColorSchemeToggle />
    </>;
  } else {
    main = <>
      <FontAwesomeIcon icon={faLightbulb} />
    </>;
  }

  return (
    <AppShell
      header={{ height: 50 }}
      navbar={{
        width: 200,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header p="md">
        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
          size="sm"
        />
        <Text>
          <FontAwesomeIcon icon={faLightbulb} />{' '}
          Symphony
        </Text>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        {navLinks}
      </AppShell.Navbar>

      <AppShell.Main>
        {main}
      </AppShell.Main>
    </AppShell>
  );
}
