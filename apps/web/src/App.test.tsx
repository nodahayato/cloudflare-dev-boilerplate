import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders starter headline and shared schema example', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', { name: /cloudflare multi-product starter/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/shared schema example/i)).toBeInTheDocument();
    expect(screen.getByText(/welcome to the starter/i)).toBeInTheDocument();
  });
});
