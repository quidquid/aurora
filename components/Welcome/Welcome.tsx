import { Title, Text, Anchor, Button } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import classes from './Welcome.module.css';


export function Welcome() {
  async function scan() {
    const res = await fetch('/wled/discover')
    if(!res.ok) {
      throw new Error('failed')
    }
    console.log(res.json())
  }
  
  return (
    <>
      <Title className={classes.title} ta="center" mt={100}>
        Welcome to{' '}
        <Text inherit variant="gradient" component="span" gradient={{ from: 'pink', to: 'yellow' }}>
          Mantine
        </Text>
      </Title>
      <Text c="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="xl">
        This starter Next.js project includes a minimal setup for server side rendering.
      </Text>

      <Button variant="filled" onClick={(e) => scan()}>Scan</Button>
    </>
  );
}
