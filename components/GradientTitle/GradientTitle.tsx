'use client';

import { Title, Container, Text } from '@mantine/core';

export function GradientTitle() {
  return (
    <Container size="md" py="xl">
      <Title className={classes.title} ta="center" mt={100}>
        Welcome to{' '}
      <Text inherit variant="gradient" component="span" gradient={{ from: 'pink', to: 'yellow' }}>
        Shot Matrix
      </Text>
    </Title>
    </Container>
  );
}

