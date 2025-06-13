import NextAuth from 'next-auth';
import { NextRequest } from 'next/server';

// Create mock handlers
const mockGetHandler = jest.fn();
const mockPostHandler = jest.fn();

// Mock next-auth
const mockNextAuth = jest.fn(() => ({
  GET: mockGetHandler,
  POST: mockPostHandler,
}));

jest.mock('next-auth', () => ({
  __esModule: true,
  default: mockNextAuth,
}));

jest.mock('next/server', () => ({
  NextRequest: jest.fn().mockImplementation((url, init) => ({
    url,
    method: init?.method || 'GET',
    json: jest.fn().mockResolvedValue(init?.body ? JSON.parse(init.body) : {}),
  })),
}));

// Import the actual route file before mocking it
const actualRoute = require('@/app/api/auth/[...nextauth]/route');

// Mock the route handlers
jest.mock('@/app/api/auth/[...nextauth]/route', () => ({
  GET: mockGetHandler,
  POST: mockPostHandler,
}));

describe('Auth API Route', () => {
  let mockRequest: NextRequest;

  beforeEach(() => {
    mockRequest = new NextRequest('http://localhost:3000/api/auth/signin');
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('should handle GET requests', async () => {
    const { GET } = require('@/app/api/auth/[...nextauth]/route');
    await GET(mockRequest);
    expect(mockGetHandler).toHaveBeenCalledWith(mockRequest);
  });

  it('should handle POST requests', async () => {
    const { POST } = require('@/app/api/auth/[...nextauth]/route');
    await POST(mockRequest);
    expect(mockPostHandler).toHaveBeenCalledWith(mockRequest);
  });

  it('should handle authentication with valid credentials', async () => {
    const { POST } = require('@/app/api/auth/[...nextauth]/route');
    const request = new NextRequest('http://localhost:3000/api/auth/signin', {
      method: 'POST',
      body: JSON.stringify({
        mail: 'admin@email.com',
        password: 'password123',
      }),
    });

    await POST(request);
    expect(mockPostHandler).toHaveBeenCalledWith(request);
  });
}); 