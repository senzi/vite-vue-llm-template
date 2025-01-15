export interface Template {
  name: string;
  type: 'text' | 'json';
  description: string;
  schema?: JSONSchema;
}

export interface JSONSchema {
  type: string;
  properties?: Record<string, any>;
  required?: string[];
}

export interface EnvConfig {
  apiKey: string;
  baseUrl: string;
  model: string;
}

export interface GenerateRequest {
  template_name: string;
  input: string;
  base_url?: string;
  api_key?: string;
  model?: string;
  temperature?: number;
}
