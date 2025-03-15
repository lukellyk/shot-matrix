'use client';

import { useEffect, useState } from 'react';
import { Box, NumberInput, rem, Table, Text, useMantineTheme } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
// Local storage key
const STORAGE_KEY = 'club-distances';

const PERCENTAGES = [100, 75, 50, 25];
const CLUBS = [
  'D',
  '3W',
  '3R',
  '4R',
  '4I',
  '5I',
  '6I',
  '7I',
  '8I',
  '9I',
  'PW',
  '52',
  '56',
  '60',
  '64',
];

// Interface for the distances type
interface ClubDistances {
  [club: string]: number;
}

export function ClubDistanceMatrix() {
  const theme = useMantineTheme();
  const { width } = useViewportSize();
  const [isMobile, setIsMobile] = useState(false);

  // State to store the 100% distances for each club
  const [fullDistances, setFullDistances] = useState<ClubDistances>({});

  // Load distances from localStorage on component mount
  useEffect(() => {
    try {
      const savedDistances = localStorage.getItem(STORAGE_KEY);
      if (savedDistances) {
        setFullDistances(JSON.parse(savedDistances));
      }
    } catch (error) {
      console.error('Error loading distances from localStorage:', error);
    }
  }, []);

  // Check if viewport is mobile size
  useEffect(() => {
    setIsMobile(width < 768);
  }, [width]);

  // Calculate distance for a given percentage
  const calculateDistance = (fullDistance: number, percentage: number) => {
    return Math.round((fullDistance * percentage) / 100);
  };

  // Handle input change
  const handleDistanceChange = (value: number | undefined, club: string) => {
    const newDistances = {
      ...fullDistances,
      [club]: value || 0,
    };
    
    setFullDistances(newDistances);
    
    // Save to localStorage
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newDistances));
    } catch (error) {
      console.error('Error saving distances to localStorage:', error);
    }
  };

  // Styles for the component in Mantine v7
  const headerCellStyle = {
    fontWeight: 700,
    backgroundColor: 'var(--mantine-color-default-lighter)',
    textAlign: 'center' as const,
    width: isMobile ? 'auto' : rem(120),
    padding: isMobile ? 'var(--mantine-spacing-xs)' : 'var(--mantine-spacing-sm)',
    fontSize: isMobile ? theme.fontSizes.sm : theme.fontSizes.md,
  };

  const clubCellStyle = {
    fontWeight: 600,
    backgroundColor: 'var(--mantine-color-default-lighter)',
    width: isMobile ? 'auto' : rem(80),
    textAlign: 'center' as const,
    padding: isMobile ? 'var(--mantine-spacing-xs)' : 'var(--mantine-spacing-sm)',
    fontSize: isMobile ? theme.fontSizes.sm : theme.fontSizes.md,
  };

  const dataCellStyle = {
    textAlign: 'center' as const,
    width: isMobile ? 'auto' : rem(120),
    padding: isMobile ? 'var(--mantine-spacing-xs)' : 'var(--mantine-spacing-sm)',
    verticalAlign: 'middle',
    color: 'var(--mantine-color-text)',
    fontSize: isMobile ? theme.fontSizes.sm : theme.fontSizes.md,
  };

  return (
    <Box
      p={isMobile ? '10px' : '20px'}
      w="100%"
      style={{
        margin: '0 auto',
        color: 'var(--mantine-color-text)',
        maxWidth: isMobile ? '100%' : '90%',
      }}
    >
      <div
        style={{
          width: '100%',
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch',
          msOverflowStyle: '-ms-autohiding-scrollbar',
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
            minWidth: isMobile ? '600px' : 'auto',
          }}
        >
          <thead>
            <tr>
              <th style={headerCellStyle}>Club</th>
              {PERCENTAGES.map((percentage) => (
                <th key={percentage} style={headerCellStyle}>
                  {percentage}%
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {CLUBS.map((club) => (
              <tr key={club}>
                <td style={clubCellStyle}>{club}</td>
                {PERCENTAGES.map((percentage) => (
                  <td key={`${club}-${percentage}`} style={dataCellStyle}>
                    {percentage === 100 ? (
                      <NumberInput
                        value={fullDistances[club] || 0}
                        onChange={(value) => {
                          // Convert string value to number or undefined to match handleDistanceChange parameter type
                          const numericValue =
                            typeof value === 'string'
                              ? value === ''
                                ? undefined
                                : Number(value)
                              : value;
                          handleDistanceChange(numericValue, club);
                        }}
                        min={0}
                        max={400}
                        placeholder="Enter distance"
                        rightSection="m"
                        w="100%"
                        styles={{
                          input: {
                            textAlign: 'center' as const,
                            fontSize: isMobile ? theme.fontSizes.sm : theme.fontSizes.md,
                            height: isMobile ? rem(36) : 'auto',
                          },
                          wrapper: { width: '100%' },
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
      </div>
    </Box>
  );
}
