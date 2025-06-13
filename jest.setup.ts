import '@testing-library/jest-dom'
import { ImageProps } from 'next/image'

// Add Web API globals
global.Request = class Request {
  constructor(input: string | Request, init?: RequestInit) {
    // Implementation details
  }
  async json() {
    return {};
  }
  async formData() {
    return new FormData();
  }
} as any;

global.Response = class Response {
  constructor(body?: BodyInit | null, init?: ResponseInit) {
    // Implementation details
  }
  async json() {
    return {};
  }
} as any;

// Mock FormData
global.FormData = class FormData {
  private data: Map<string, any> = new Map();
  
  append(name: string, value: any) {
    this.data.set(name, value);
  }
  
  get(name: string) {
    return this.data.get(name);
  }

  delete(name: string) {
    this.data.delete(name);
  }

  has(name: string) {
    return this.data.has(name);
  }

  set(name: string, value: any) {
    this.data.set(name, value);
  }

  forEach(callback: (value: any, key: string, parent: FormData) => void) {
    this.data.forEach((value, key) => callback(value, key, this));
  }
} as any;

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => '',
  useSearchParams: () => new URLSearchParams(),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: function Image(props: ImageProps) {
    return {
      type: 'img',
      props: {
        ...props,
        alt: props.alt || '',
      },
    };
  },
}));