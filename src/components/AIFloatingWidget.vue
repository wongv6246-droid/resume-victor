<template>
  <div class="ai-float-widget">
    <!-- 悬浮按钮（折叠状态） -->
    <button v-if="!isOpen" class="ai-float-btn" @click="isOpen = true" title="AI助手">
      <span class="ai-float-btn-icon">🤖</span>
      <span class="ai-float-btn-text">AI 助手</span>
    </button>

    <!-- 聊天窗口（展开状态） -->
    <div v-else class="ai-float-panel">
      <!-- 头部 -->
      <div class="ai-float-header">
        <div class="ai-float-header-left">
          <span class="ai-float-header-icon">🤖</span>
          <span class="ai-float-header-title">AI 助手</span>
        </div>
        <button class="ai-float-close-btn" @click="closePanel" title="收起">✕</button>
      </div>

      <!-- 消息区域 -->
      <div class="ai-float-body" ref="messagesRef">
        <!-- 欢迎信息 -->
        <div v-if="messages.length === 0" class="ai-welcome">
          <p>您好，我是王泽伟的AI助手，可以向我了解他的工作经历、技能等信息。</p>
          <div class="ai-example-questions">
            <button
              v-for="(q, i) in exampleQuestions"
              :key="i"
              class="ai-example-btn"
              @click="askExample(q)"
              :disabled="isInputDisabled"
            >
              {{ q }}
            </button>
          </div>
        </div>

        <!-- 消息列表 -->
        <div
          v-for="(msg, index) in messages"
          :key="index"
          :class="['ai-msg', msg.role]"
        >
          <div class="ai-msg-avatar">{{ msg.role === 'ai' ? '🤖' : '👤' }}</div>
          <div class="ai-msg-bubble">
            <div v-if="msg.role === 'ai' && msg.isThinking" class="ai-typing">
              <span class="ai-dot"></span>
              <span class="ai-dot"></span>
              <span class="ai-dot"></span>
            </div>
            <div v-else style="white-space: pre-wrap;">{{ msg.content }}</div>
          </div>
        </div>
      </div>

      <!-- 底部输入 -->
      <div class="ai-float-footer">
        <div class="ai-input-row">
          <input
            v-model="userInput"
            type="text"
            class="ai-input"
            :placeholder="inputPlaceholder"
            @keyup.enter="sendQuestion"
            :disabled="isInputDisabled || isLoading"
          />
          <button
            class="ai-send-btn"
            @click="sendQuestion"
            :disabled="isInputDisabled || isLoading || !userInput.trim()"
          >
            {{ isLoading ? '...' : '发送' }}
          </button>
        </div>
        <div class="ai-counter">
          <span v-if="questionCount < maxQuestions">
            已提问 {{ questionCount }} / {{ maxQuestions }} 次
          </span>
          <span v-else style="color: #e74c3c; font-size: 0.78rem;">
            💬 我暂时只能向您提供这些信息哦 如还有其他疑问可以联系本人：19118475038
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, watch } from 'vue'
import { DEEPSEEK_CONFIG, QA_LIMITS } from '../data/config.js'
import knowledgeMd from '../data/qa-knowledge.md?raw'
import { getKnowledgeContext } from '../data/resume-knowledge.js'

const isOpen = ref(true)
const messages = ref([])
const userInput = ref('')
const isLoading = ref(false)
const questionCount = ref(0)
const maxQuestions = QA_LIMITS.maxQuestions
const messagesRef = ref(null)

const isInputDisabled = computed(() => questionCount.value >= maxQuestions)

const inputPlaceholder = computed(() => {
  if (questionCount.value >= maxQuestions) return '💬 可联系本人：19118475038'
  if (isLoading.value) return 'AI思考中...'
  return '请输入您想了解的问题...'
})

const exampleQuestions = [
  '王泽伟有什么工作经历？',
  '他为什么会离开上一家公司？',
  '他有哪些核心技能？',
  '他的教育背景是什么？'
]

function buildSystemPrompt() {
  const resumeContext = getKnowledgeContext()
  return `你是一个求职者信息助手，帮助HR了解候选人王泽伟的相关信息。

你的知识来源按优先级排列如下：

【第一知识源 - 问答知识库（优先检索）】
${knowledgeMd}

【第二知识源 - 简历原文（知识库中找不到时使用）】
${resumeContext}

【回答规则】
1. 只回答与招聘王泽伟相关的问题（如工作经历、技能、教育背景、求职意向、离职原因等）
2. 如果问题与招聘王泽伟完全无关（如天气、新闻、编程技术问题等），请礼貌拒绝回答，并引导对方询问王泽伟的相关经历
3. 回答策略：
   a. 优先从【问答知识库】中查找答案
   b. 如果知识库中没有，再从【简历原文】中提取相关信息回答
   c. 如果两个来源都找不到答案，请回复以下原话（不要修改）：
      "抱歉，这个问题还没录入知识库，暂时无法回答您，建议联系本人进行了解：19118475038"
4. 回答要简洁专业（不超过300字），基于已有信息，不要编造或臆测
5. 使用中文回答
6. 回答问题中途不要停下来猜测用户意图，直接给出回答即可`
}

async function sendQuestion() {
  const question = userInput.value.trim()
  if (!question || isInputDisabled.value || isLoading.value) return

  messages.value.push({ role: 'user', content: question })
  userInput.value = ''

  const aiMsgIndex = messages.value.length
  messages.value.push({ role: 'ai', content: '', isThinking: true })

  isLoading.value = true
  questionCount.value++

  try {
    const systemPrompt = buildSystemPrompt()
    const apiMessages = [
      { role: 'system', content: systemPrompt },
      ...messages.value
        .filter(m => m.role !== 'ai' || !m.isThinking)
        .map(m => ({ role: m.role === 'ai' ? 'assistant' : m.role, content: m.content }))
    ]

    const response = await fetch(DEEPSEEK_CONFIG.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_CONFIG.apiKey}`
      },
      body: JSON.stringify({
        model: DEEPSEEK_CONFIG.model,
        messages: apiMessages,
        max_tokens: QA_LIMITS.maxTokens,
        temperature: QA_LIMITS.temperature,
        stream: false
      })
    })

    if (!response.ok) {
      const errorData = await response.text()
      throw new Error(`API请求失败 (${response.status}): ${errorData}`)
    }

    const data = await response.json()
    const answer = data.choices?.[0]?.message?.content || '抱歉，暂时无法回答该问题。'
    messages.value[aiMsgIndex] = { role: 'ai', content: answer, isThinking: false }

  } catch (error) {
    console.error('AI问答错误:', error)
    messages.value[aiMsgIndex] = {
      role: 'ai',
      content: `抱歉，AI服务暂不可用（${error.message}）。请稍后重试。`,
      isThinking: false
    }
  } finally {
    isLoading.value = false
    scrollToBottom()
  }
}

function askExample(question) {
  if (isInputDisabled.value || isLoading.value) return
  userInput.value = question
  sendQuestion()
}

function closePanel() {
  isOpen.value = false
}

function scrollToBottom() {
  nextTick(() => {
    if (messagesRef.value) {
      messagesRef.value.scrollTop = messagesRef.value.scrollHeight
    }
  })
}

watch(messages, () => { scrollToBottom() }, { deep: true })
</script>

<style scoped>
/* 悬浮按钮 - 折叠状态 */
.ai-float-btn {
  position: fixed;
  right: 24px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 14px 12px;
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: #fff;
  border: none;
  border-radius: 16px;
  cursor: pointer;
  box-shadow: 0 6px 24px rgba(52, 152, 219, 0.35);
  transition: all 0.3s ease;
  animation: floatPulse 3s ease-in-out infinite;
}

.ai-float-btn:hover {
  transform: translateY(-50%) scale(1.05);
  box-shadow: 0 8px 32px rgba(52, 152, 219, 0.45);
}

@keyframes floatPulse {
  0%, 100% { box-shadow: 0 6px 24px rgba(52, 152, 219, 0.35); }
  50% { box-shadow: 0 6px 32px rgba(52, 152, 219, 0.55); }
}

.ai-float-btn-icon {
  font-size: 1.6rem;
  line-height: 1;
}

.ai-float-btn-text {
  font-size: 0.7rem;
  font-weight: 600;
  writing-mode: vertical-rl;
  letter-spacing: 2px;
}

/* 聊天面板 - 展开状态 */
.ai-float-panel {
  position: fixed;
  right: 24px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 999;
  width: 380px;
  height: 560px;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.18);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from { opacity: 0; transform: translateY(-50%) scale(0.9); transform-origin: right center; }
  to { opacity: 1; transform: translateY(-50%) scale(1); }
}

/* 头部 */
.ai-float-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 18px;
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: #fff;
  flex-shrink: 0;
}

.ai-float-header-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.ai-float-header-icon {
  font-size: 1.3rem;
}

.ai-float-header-title {
  font-weight: 600;
  font-size: 0.95rem;
}

.ai-float-close-btn {
  background: rgba(255,255,255,0.2);
  border: none;
  color: #fff;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

.ai-float-close-btn:hover {
  background: rgba(255,255,255,0.35);
}

/* 消息区域 */
.ai-float-body {
  flex: 1;
  overflow-y: auto;
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: #f8f9fb;
}

.ai-float-body::-webkit-scrollbar {
  width: 4px;
}

.ai-float-body::-webkit-scrollbar-thumb {
  background: #d0d8f0;
  border-radius: 4px;
}

/* 欢迎信息 */
.ai-welcome {
  text-align: center;
  padding: 16px 8px;
  color: #7f8c8d;
  font-size: 0.88rem;
  line-height: 1.6;
}

.ai-example-questions {
  margin-top: 12px;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: center;
}

.ai-example-btn {
  padding: 6px 14px;
  background: #eef2ff;
  border: 1px solid #d0d8f7;
  border-radius: 20px;
  color: #4f6ef7;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s;
}

.ai-example-btn:hover:not(:disabled) {
  background: #4f6ef7;
  color: #fff;
  border-color: #4f6ef7;
}

.ai-example-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 消息气泡 */
.ai-msg {
  display: flex;
  gap: 8px;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}

.ai-msg.user {
  flex-direction: row-reverse;
}

.ai-msg-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  flex-shrink: 0;
  background: #e8ecf1;
}

.ai-msg-bubble {
  max-width: calc(100% - 46px);
  padding: 10px 14px;
  border-radius: 14px;
  font-size: 0.88rem;
  line-height: 1.55;
}

.ai-msg.user .ai-msg-bubble {
  background: #3498db;
  color: #fff;
  border-bottom-right-radius: 4px;
}

.ai-msg.ai .ai-msg-bubble {
  background: #fff;
  color: #333;
  border-bottom-left-radius: 4px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
}

/* 打字动画 */
.ai-typing {
  display: flex;
  gap: 4px;
  padding: 2px 0;
}

.ai-dot {
  width: 7px;
  height: 7px;
  background: #999;
  border-radius: 50%;
  animation: aiBounce 1.4s ease-in-out infinite;
}

.ai-dot:nth-child(2) { animation-delay: 0.2s; }
.ai-dot:nth-child(3) { animation-delay: 0.4s; }

@keyframes aiBounce {
  0%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-6px); }
}

/* 底部 */
.ai-float-footer {
  padding: 12px 16px 14px;
  border-top: 1px solid #e8ecf1;
  background: #fff;
  flex-shrink: 0;
}

.ai-input-row {
  display: flex;
  gap: 8px;
}

.ai-input {
  flex: 1;
  padding: 10px 14px;
  border: 2px solid #e0e6ed;
  border-radius: 10px;
  font-size: 0.88rem;
  outline: none;
  transition: border-color 0.2s;
  font-family: inherit;
}

.ai-input:focus {
  border-color: #3498db;
}

.ai-input:disabled {
  background: #f5f7fa;
  cursor: not-allowed;
}

.ai-send-btn {
  padding: 10px 16px;
  background: #3498db;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 0.88rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  white-space: nowrap;
}

.ai-send-btn:hover:not(:disabled) {
  background: #2980b9;
}

.ai-send-btn:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
}

.ai-counter {
  text-align: center;
  margin-top: 6px;
  font-size: 0.75rem;
  color: #bbb;
}

/* 小屏适配 */
@media (max-width: 600px) {
  .ai-float-panel {
    right: 12px;
    width: calc(100vw - 24px);
    height: 70vh;
    top: 50%;
  }

  .ai-float-btn {
    right: 12px;
    padding: 12px 10px;
  }
}
</style>
