<template>
  <div class="portfolio-page">
    <div class="page-header">
      <h1 class="page-title">作品集</h1>
      <p class="page-subtitle">Power BI 数据可视化与分析项目展示</p>
    </div>

    <!-- 作品集说明 -->
    <div class="card">
      <h2 class="card-title">📊 Power BI 数据看板</h2>
      <p style="color: #555; margin-bottom: 1rem;">
        以下是王泽伟在数据分析工作中制作的 Power BI 数据可视化看板，展示了其在数据建模、可视化设计、经营分析等方面的专业能力。
        点击下方按钮可在线查看作品。
      </p>
    </div>

    <!-- 作品集网格 -->
    <div class="portfolio-grid">
      <div v-for="(item, index) in portfolioItems" :key="index" class="portfolio-card">
        <div class="portfolio-icon">
          {{ index === 0 ? '📈' : '📊' }}
        </div>
        <h3>{{ item.title }}</h3>
        <p>{{ item.description }}</p>
        <a :href="item.url" target="_blank" rel="noopener noreferrer" class="portfolio-link">
          🔗 在线查看
        </a>
        <div v-if="item.password" class="portfolio-password">
          🔑 密码：{{ item.password }}
        </div>
        <div v-else class="portfolio-password">
          ✅ 无需密码，直接访问
        </div>
      </div>
    </div>

    <!-- 能力展示 -->
    <div class="card" style="margin-top: 1.5rem;">
      <h2 class="card-title">🌟 作品集涵盖的能力</h2>
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem;">
        <div v-for="(ability, index) in abilities" :key="index" style="background: #f8f9fa; padding: 1rem; border-radius: 12px; text-align: center;">
          <div style="font-size: 2rem; margin-bottom: 0.5rem;">{{ ability.icon }}</div>
          <div style="font-weight: 600; font-size: 0.95rem;">{{ ability.name }}</div>
        </div>
      </div>
    </div>

    <!-- AI 悬浮助手 -->
    <AIFloatingWidget />
  </div>
</template>

<script setup>
import AIFloatingWidget from '../components/AIFloatingWidget.vue'

const portfolioItems = [
  {
    title: 'Power BI 经营分析看板',
    url: 'http://c.u6v.cn/6xpgpA',
    password: 'WYCX8050',
    description: '企业经营数据分析看板，涵盖业务指标监控、商品分析、用户分析及渠道销售追踪，展示全面的数据可视化与经营分析能力'
  },
  {
    title: 'Power BI 数据分析看板',
    url: 'http://c.u6v.cn/6j2NIw',
    password: '',
    description: '数据分析可视化看板，展示数据挖掘、统计建模与分析成果，体现专业的数据处理与可视化设计能力'
  }
]

const abilities = [
  { icon: '📊', name: '数据建模与可视化' },
  { icon: '📈', name: '经营指标监控' },
  { icon: '🔍', name: '数据分析与挖掘' },
  { icon: '🎯', name: '业务决策支持' },
  { icon: '🤖', name: 'AI 与自动化集成' },
  { icon: '📋', name: '报表开发与设计' }
]
</script>
