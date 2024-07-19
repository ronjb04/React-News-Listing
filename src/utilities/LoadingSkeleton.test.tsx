import React from 'react';
import { render, screen } from '@testing-library/react';
import LoadingSkeleton from './LoadingSkeleton';

test('check if loading skeleton shows svg', () => {
  render(<LoadingSkeleton />);
  const svgElements = screen.getAllByRole('img');
  expect(svgElements.length).toBeGreaterThan(0);
});