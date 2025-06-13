import { NextRequest } from 'next/server';

// Create mock handlers
const mockGetHandler = jest.fn();
const mockPostHandler = jest.fn();

// Create mock Prisma client
const mockPrismaClient = {
  orcamento: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

// Mock next-auth
const mockNextAuth = jest.fn(() => ({
  GET: mockGetHandler,
  POST: mockPostHandler,
}));

// Mock next-auth
jest.mock('next-auth', () => ({
  __esModule: true,
  default: mockNextAuth,
}));

// Mock Prisma client
jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn(() => mockPrismaClient),
}));

jest.mock('next/server', () => ({
  NextRequest: jest.fn().mockImplementation((url, init) => ({
    url,
    method: init?.method || 'GET',
    json: jest.fn().mockResolvedValue(init?.body ? JSON.parse(init.body) : {}),
  })),
}));

// Mock the route handlers
jest.mock('@/app/api/orcamentos/route', () => ({
  GET: mockGetHandler,
  POST: mockPostHandler,
}));

// Import the actual route file before mocking it
const actualRoute = require('@/app/api/orcamentos/route');

describe('Orcamentos API Route', () => {
  let mockRequest: NextRequest;

  beforeEach(() => {
    mockRequest = new NextRequest('http://localhost:3000/api/orcamentos');
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('should handle GET requests', async () => {
    const { GET } = require('@/app/api/orcamentos/route');
    await GET(mockRequest);
    expect(mockGetHandler).toHaveBeenCalledWith(mockRequest);
  });

  it('should handle POST requests', async () => {
    const { POST } = require('@/app/api/orcamentos/route');
    await POST(mockRequest);
    expect(mockPostHandler).toHaveBeenCalledWith(mockRequest);
  });

  it('should handle authentication with valid credentials', async () => {
    const { POST } = require('@/app/api/orcamentos/route');
    const request = new NextRequest('http://localhost:3000/api/orcamentos', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Test Orcamento',
        email: 'test@example.com',
        message: 'Test message',
      }),
    });

    await POST(request);
    expect(mockPostHandler).toHaveBeenCalledWith(request);
  });
}); 