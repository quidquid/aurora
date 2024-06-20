'use client';

import '@mantine/core/styles.css';
import React from 'react';
import { usePathname } from 'next/navigation'
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import StoreProvider from './StoreProvider';
import { theme } from '../theme';
import { useState } from 'react';
import {
  AppShell, Burger, NavLink,
  Badge,
  Button, Link, Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faLightbulb, faRadio, faMapMarkerAlt, faPalette } from '@fortawesome/free-solid-svg-icons'


/*export const metadata = {
  title: 'Aurora',
  description: 'A lighting design playground',
};*/

export default function RootLayout({ children }: { children: any }) {
  const [opened, { toggle }] = useDisclosure();
  const [active, setActive] = useState(0);
  const pathname = usePathname()

  const navItems = [
    { icon: faHome,
      label: 'Dashboard',
      path: '/',
    },
    { icon: faRadio,
      label: 'Nodes',
      path: '/nodes',
    },
    { icon: faLightbulb,
      label: 'Lamps',
      path: '/lamps',
    },
    { icon: faPalette,
      label: 'Scenes',
      path: '/scenes',
    },
    { icon: faMapMarkerAlt,
      label: 'Sites',
      path: '/sites',
    },
  ];
  const navLinks = navItems.map((item, index) => <NavLink
    href={item.path}
    label={item.label}
    leftSection={<FontAwesomeIcon icon={item.icon} />}
    active={pathname === item.path}
    onClick={() => setActive(index)}
    key={`navlink-${index}`}
  />);

  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <StoreProvider>
          <MantineProvider theme={theme}>
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
                  Aurora
                </Text>
              </AppShell.Header>

              <AppShell.Navbar p="md">
                {navLinks}
              </AppShell.Navbar>

              <AppShell.Main>
                {children}
              </AppShell.Main>
            </AppShell>

          </MantineProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
