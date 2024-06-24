import "@mantine/core/styles.css";

import {
  MantineProvider, ColorSchemeScript,
  AppShell, Burger, NavLink, Badge,
  Button, Link, Text, Title,
 } from "@mantine/core";
//import { theme } from '../theme';
import { useDisclosure } from '@mantine/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faLightbulb, faRadio, faMapMarkerAlt, faPalette } from '@fortawesome/free-solid-svg-icons'
import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

export function Layout({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure();


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
      label: 'Lights',
      path: '/lights',
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
    active={false}
    //onClick={() => setActive(index)}
    key={`navlink-${index}`}
  />);

  return (
    <html lang="en">
      <head>
        <title>Aurora</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links /> 
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>
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
                <Title order={3} mt={0}>
                  Aurora
                </Title>
              </AppShell.Header>

              <AppShell.Navbar p="md">
                {navLinks}
              </AppShell.Navbar>

              <AppShell.Main>
                {children}
              </AppShell.Main>
            </AppShell>
        </MantineProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
