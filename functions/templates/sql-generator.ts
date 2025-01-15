import type { Template } from '../types';

const template: Template = {
  type: 'json',
  description: "SQL查询生成器",
  systemPrompt: "你是一个SQL专家，可以将自然语言转换为SQL查询语句。",
  jsonSchema: {
    type: "object",
    properties: {
      sql: {
        type: "string",
        description: "SQL查询语句"
      },
      tables: {
        type: "array",
        items: {
          type: "string"
        },
        description: "涉及的数据表"
      }
    },
    required: ["sql"]
  }
};

export default template;
