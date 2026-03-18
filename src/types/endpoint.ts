export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface Endpoint {
  id: string;
  name: string;
  description: string;
  method: HttpMethod;
  path: string;
  queryParams?: QueryParams;
  requestSchema: object | null;
  responseSchema: object;
  notes?: string;
}

export type QueryParams = Record<string, string>;