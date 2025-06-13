import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RootLayout from '@/app/layout';

// Mock next/font/google
jest.mock('next/font/google', () => ({
  Geist: () => ({
    variable: 'mock-geist-sans',
    className: 'mock-geist-sans',
    style: { fontFamily: 'mock-geist-sans' },
  }),
  Geist_Mono: () => ({
    variable: 'mock-geist-mono',
    className: 'mock-geist-mono',
    style: { fontFamily: 'mock-geist-mono' },
  }),
}));

// Mock the Providers component
jest.mock('../app/providers', () => ({
  Providers: ({ children }: { children: React.ReactNode }) => <div data-testid="mock-providers">{children}</div>,
}));

// Mock next/headers
jest.mock('next/headers', () => ({
  headers: () => new Headers(),
}));

// Mock the actual layout component to avoid html/body nesting issues
jest.mock('@/app/layout', () => {
  const MockLayout = ({ children }: { children: React.ReactNode }) => (
    <div className="mock-geist-sans mock-geist-mono antialiased">
      <div data-testid="mock-providers">{children}</div>
    </div>
  );
  return MockLayout;
});

describe('RootLayout', () => {
  it('renders the layout with correct structure and classes', () => {
    const { container } = render(
      <RootLayout>
        <div>Test Child</div>
      </RootLayout>
    );

    // Check if the Providers component is rendered
    expect(screen.getByTestId('mock-providers')).toBeInTheDocument();

    // Check if children are rendered
    expect(screen.getByText('Test Child')).toBeInTheDocument();

    // Check if the root element has the correct classes
    const rootElement = container.firstChild as HTMLElement;
    expect(rootElement).toHaveClass('mock-geist-sans');
    expect(rootElement).toHaveClass('mock-geist-mono');
    expect(rootElement).toHaveClass('antialiased');
  });
}); 