import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Providers } from '../app/providers';

// Mock next-auth/react
jest.mock('next-auth/react', () => ({
  SessionProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mock-session-provider">{children}</div>
  ),
}));

describe('Providers', () => {
  it('renders children within SessionProvider', () => {
    const { container, getByTestId } = render(
      <Providers>
        <div>Test Child</div>
      </Providers>
    );

    // Check if SessionProvider is rendered
    expect(getByTestId('mock-session-provider')).toBeInTheDocument();

    // Check if children are rendered
    expect(container.textContent).toContain('Test Child');
  });

  it('wraps multiple children correctly', () => {
    const { container } = render(
      <Providers>
        <div>Child 1</div>
        <div>Child 2</div>
      </Providers>
    );

    expect(container.textContent).toContain('Child 1');
    expect(container.textContent).toContain('Child 2');
  });
}); 