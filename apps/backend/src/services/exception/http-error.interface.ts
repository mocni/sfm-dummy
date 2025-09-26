export interface HttpError {
  context: string;
  response: {
    error?: unknown;
    message: string;
  };
  stack?: string;
}
