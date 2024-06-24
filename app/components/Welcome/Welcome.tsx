import { Title, Text, Anchor, Button } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import classes from './Welcome.module.css';


export function Welcome() {
  return (
    <>
      <Title className={classes.title} ta="center" mt='md'>
        <Text inherit variant="gradient" component="span" gradient={{ from: 'pink', to: 'yellow' }}>
          Aurora
        </Text>
      </Title>
    </>
  );
}
