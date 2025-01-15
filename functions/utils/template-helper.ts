import type { Template } from '../types';

export function buildSystemPrompt(template: Template): string {
  if (template.type !== 'json') {
    return template.systemPrompt;
  }
  
  // JSON模板自动拼接schema提示
  const schemaStr = JSON.stringify(template.jsonSchema, null, 2);
  return `${template.systemPrompt}\n请按照以下JSON格式返回：\n${schemaStr}\n只返回JSON数据，不要包含其他解释性文字。`;
}
