import '@mantine/core/styles.css';
import React from 'react';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import StoreProvider from './StoreProvider';
import { theme } from '../theme';

export const metadata = {
  title: 'Aurora',
  description: 'A lighting design playground',
};

export default function RootLayout({ children }: { children: any }) {
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
            {children}
          </MantineProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
