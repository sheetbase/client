export interface ApiOptions {
  backendUrl?: string;
  apiKey?: string;
  loggingEndpoint?: string;
}

export interface BeforeRequestHook {
  (data: ActionData): Promise<ActionData>;
}

export interface ApiInstanceData extends ActionData {
  beforeHooks?: BeforeRequestHook[];
}

export interface ActionData {
  endpoint?: string;
  query?: RequestQuery;
  body?: RequestBody;
}

export interface RequestQuery {
  [key: string]: string | number;
}

export interface RequestBody {
  [key: string]: unknown;
}

export interface ResponseError {
  error?: boolean;
  code?: string;
  message?: string;
  status?: number;
  meta?: {
    at?: number;
    [key: string]: unknown;
  };
}

export interface ResponseSuccess {
  data: unknown;
  success?: boolean;
  status?: number;
  meta?: {
    at?: number;
    [key: string]: unknown;
  };
}

export type LoggingLevel = 'DEBUG' | 'INFO' | 'WARNING' | 'ERROR';
