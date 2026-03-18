// Используется в MainApiArea.ResponseSection и ApiPlayground
export interface ResponseState {
  status: number;
  statusText: string;
  time: number;
  headers: Record<string, string>;
  data: unknown;
}