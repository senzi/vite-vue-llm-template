export interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface JSONSchema {
  type: string;
  properties?: Record<string, any>;
  required?: string[];
}

export interface Template {
  type: 'text' | 'json';
  description: string;
  systemPrompt: string;
  jsonSchema?: JSONSchema;
}
