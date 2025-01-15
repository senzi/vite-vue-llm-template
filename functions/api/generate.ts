import { buildSystemPrompt } from '../utils/template-helper';
import type { Message } from '../types';

interface GenerateRequest {
  template_name: string;
  input: string;
  base_url?: string;
  api_key?: string;
  model?: string;
  temperature?: number;
  messages?: Message[];
}

export async function onRequestPost(context: any) {
  try {
    const { request, env } = context;
    const {
      template_name,
      input,
      base_url,
      api_key,
      model,
      temperature,
      messages = [],
    }: GenerateRequest = await request.json();

    if (!template_name || !input) {
      return new Response(JSON.stringify({
        error: "Missing required parameters"
      }), { 
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const templates = await import('../templates/index');
    const template = templates[template_name];
    if (!template) {
      return new Response(JSON.stringify({
        error: "Template not found"
      }), { 
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }

    const llmConfig = {
      base_url: base_url || env.DEFAULT_LLM_URL,
      api_key: api_key || env.DEFAULT_API_KEY,
      model: model || env.DEFAULT_MODEL,
      temperature: temperature || 0.7,
      ...(template.type === 'json' && {
        response_format: { type: "json_object" }
      })
    };

    const fullMessages = [
      {
        role: "system",
        content: buildSystemPrompt(template)
      },
      ...messages,
      {
        role: "user",
        content: input
      }
    ];

    const response = await fetch(llmConfig.base_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${llmConfig.api_key}`
      },
      body: JSON.stringify({
        model: llmConfig.model,
        messages: fullMessages,
        temperature: llmConfig.temperature,
        ...(template.type === 'json' && {
          response_format: { type: "json_object" }
        })
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'LLM API request failed');
    }

    const result = await response.json();
    
    // 对于text类型模板，提取content
    const finalResponse = template.type === 'text' 
      ? { content: result.choices[0]?.message?.content }
      : result.choices[0]?.message?.content;
    
    return new Response(JSON.stringify(finalResponse), {
      headers: { "Content-Type": "application/json" }
    });
    
  } catch (error) {
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
