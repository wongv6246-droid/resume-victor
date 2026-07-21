/**
 * 应用配置
 *
 * ⚠️ 安全提示：当前API Key直接嵌入前端代码，
 * 浏览器开发者工具可见。建议生产环境使用时：
 * 1. 替换为后端代理接口
 * 2. 或使用环境变量 + 构建时注入
 */

// DeepSeek API 配置
export const DEEPSEEK_CONFIG = {
  apiKey: 'sk-2d8d1cf5ee404fdfa443b15cb8f4d158',
  baseUrl: 'https://api.deepseek.com/v1/chat/completions',
  model: 'deepseek-chat'
}

// AI问答限制
export const QA_LIMITS = {
  maxQuestions: 10,           // 最大提问次数
  maxTokens: 1024,            // 每次回答最大token数
  temperature: 0.7            // 回答创造性
}
