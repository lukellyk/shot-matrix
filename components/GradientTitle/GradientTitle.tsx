'use client';

import { Title, Container } from '@mantine/core';

export function GradientTitle() {
  return (
    <Container size="md" py="xl">
      <Title
        order={1}
        ta="center" 
        mb="xl" 
        variant="gradient" 
        gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
        size="3rem"
      >
        Shot Matrix
      </Title>
    </Container>
  );
}
