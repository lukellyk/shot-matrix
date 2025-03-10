"use client";

import { Table, NumberInput, Text, Box, rem } from '@mantine/core';
import { useState } from 'react';

const PERCENTAGES = [100, 75, 50, 25];
const CLUBS = [
  'D', '3W', '3R', '4R', '4I', '5I', '6I', 
  '7I', '8I', '9I', 'PW', '52', '56', '60', '64'
];

export function ClubDistanceMatrix() {
  // State to store the 100% distances for each club
  const [fullDistances, setFullDistances] = useState<{ [key: string]: number }>({});

  // Calculate distance for a given percentage
  const calculateDistance = (fullDistance: number, percentage: number) => {
    return Math.round((fullDistance * percentage) / 100);
  };

  // Handle input change
  const handleDistanceChange = (value: number | undefined, club: string) => {
    setFullDistances(prev => ({
      ...prev,
      [club]: value || 0
    }));
  };

  // Styles for the component in Mantine v7
  const headerCellStyle = {
    fontWeight: 700,
    backgroundColor: 'var(--mantine-color-default-lighter)',
    textAlign: 'center',
    width: rem(120),
    padding: 'var(--mantine-spacing-sm)',
  };
  
  const clubCellStyle = {
    fontWeight: 600,
    backgroundColor: 'var(--mantine-color-default-lighter)',
    width: rem(80),
    textAlign: 'center',
    padding: 'var(--mantine-spacing-sm)',
  };
  
  const dataCellStyle = {
    textAlign: 'center',
    width: rem(120),
    padding: 'var(--mantine-spacing-sm)',
    verticalAlign: 'middle',
    color: 'var(--mantine-color-text)',
  };

  return (
    <Box 
      p="20px" 
      w="60vw" 
      style={{ 
        margin: '0 auto',
        color: 'var(--mantine-color-text)'
      }}
    >
      <Table 
        striped 
        highlightOnHover 
        withColumnBorders
        style={{ 
          border: '1px solid var(--mantine-color-default-border)',
          borderRadius: 'var(--mantine-radius-sm)',
          overflow: 'hidden',
        }}
      >
        <thead>
          <tr>
            <th style={headerCellStyle}>Club</th>
            {PERCENTAGES.map(percentage => (
              <th key={percentage} style={headerCellStyle}>{percentage}%</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {CLUBS.map((club, index) => (
            <tr key={club}>
              <td style={clubCellStyle}>{club}</td>
              {PERCENTAGES.map(percentage => (
                <td key={`${club}-${percentage}`} style={dataCellStyle}>
                  {percentage === 100 ? (
                    <NumberInput
                      value={fullDistances[club] || 0}
                      onChange={(value) => handleDistanceChange(value, club)}
                      min={0}
                      max={400}
                      placeholder="Enter distance"
                      rightSection="m"
                      w="100%"
                      styles={{
                        input: { textAlign: 'center' },
                        wrapper: { width: '100%' }
                      }}
                    />
                  ) : (
                    <Text fw={500} ta="center">
                      {calculateDistance(fullDistances[club] || 0, percentage)}m
                    </Text>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </Box>
  );
} 
