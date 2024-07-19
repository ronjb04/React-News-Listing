import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './Navbar';

test('renders Navbar component', () => {
  render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );

  const navElement = screen.getByRole('navigation');
  expect(navElement).toBeInTheDocument();

  const homeLink = screen.getByRole('link');
  expect(homeLink).toBeInTheDocument();
});
