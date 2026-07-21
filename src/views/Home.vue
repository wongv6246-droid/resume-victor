<template>
  <div class="home-page">
    <div class="page-header">
      <h1 class="page-title">个人简介</h1>
      <p class="page-subtitle">5年数据分析运营经验 · 期待与您共事</p>
    </div>

    <!-- 个人信息卡片 -->
    <div class="card">
      <div class="profile-header">
        <div class="avatar">王</div>
        <div class="profile-info">
          <h1>王泽伟</h1>
          <p class="tagline">数据分析运营专家</p>
          <div class="tags">
            <span class="tag">📊 数据分析</span>
            <span class="tag">📈 经营分析</span>
            <span class="tag">🤖 AI应用</span>
            <span class="tag">📉 Power BI</span>
            <span class="tag">🐍 Python</span>
            <span class="tag">🗄️ SQL</span>
          </div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem; margin-top: 1rem;">
        <div class="info-item">
          <span style="color: #7f8c8d; font-size: 0.85rem;">🎂 年龄</span>
          <div style="font-weight: 600;">28岁</div>
        </div>
        <div class="info-item">
          <span style="color: #7f8c8d; font-size: 0.85rem;">📍 现居</span>
          <div style="font-weight: 600;">广州番禺</div>
        </div>
        <div class="info-item">
          <span style="color: #7f8c8d; font-size: 0.85rem;">📧 邮箱</span>
          <div style="font-weight: 600;">1287747912@qq.com</div>
        </div>
        <div class="info-item">
          <span style="color: #7f8c8d; font-size: 0.85rem;">📞 电话</span>
          <div style="font-weight: 600;">19118475038</div>
        </div>
        <div class="info-item">
          <span style="color: #7f8c8d; font-size: 0.85rem;">🎓 学历</span>
          <div style="font-weight: 600;">杭州电子科技大学 · 统计学本科</div>
        </div>
        <div class="info-item">
          <span style="color: #7f8c8d; font-size: 0.85rem;">🏆 荣誉</span>
          <div style="font-weight: 600;">省统计调查大赛一等奖</div>
        </div>
      </div>
    </div>

    <!-- 自我评价 -->
    <div class="card">
      <h2 class="card-title">💡 自我评价</h2>
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <div style="background: #f8f9fa; padding: 1rem 1.25rem; border-radius: 12px; border-left: 4px solid #3498db;">
          <strong>职业背景：</strong>
          <p style="margin-top: 0.3rem;">5年数据分析运营经验（3年C端 + 2年B端），擅长数据分析与经营策略提报，具备较强的逻辑思维与业务洞察力</p>
        </div>
        <div style="background: #f8f9fa; padding: 1rem 1.25rem; border-radius: 12px; border-left: 4px solid #2ecc71;">
          <strong>核心素质：</strong>
          <p style="margin-top: 0.3rem;">杭电统计学专业，数学与计算机基础扎实；熟练运用 AI工具（Claude Code）、SQL Server、Python、RPA（影刀、Coze）、BI工具（Power BI、FineBI），持有帆软认证数据分析师，内驱力强，业务理解深入</p>
        </div>
      </div>
    </div>

    <!-- 工作经历 -->
    <div class="card">
      <h2 class="card-title">💼 工作经历</h2>
      <div class="timeline">
        <div v-for="(exp, index) in workExperience" :key="index" class="timeline-item">
          <div class="timeline-period">{{ exp.period }}（{{ exp.duration }}）</div>
          <div class="timeline-company">{{ exp.company }}</div>
          <div class="timeline-position">{{ exp.department }} · {{ exp.position }}</div>
          <ul class="timeline-detail">
            <li v-for="(resp, rIdx) in exp.keyPoints" :key="rIdx">{{ resp }}</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 技能标签 -->
    <div class="card">
      <h2 class="card-title">🛠️ 专业技能</h2>
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1rem;">
        <div v-for="(skill, index) in skills" :key="index" style="background: #f8f9fa; padding: 1rem; border-radius: 12px;">
          <div style="font-weight: 600; margin-bottom: 0.5rem;">{{ skill.category }}</div>
          <div style="display: flex; flex-wrap: wrap; gap: 0.4rem;">
            <span v-for="(item, i) in skill.items" :key="i" class="tag">{{ item }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 求职意向 -->
    <div class="card">
      <h2 class="card-title">🎯 求职意向</h2>
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem;">
        <div>
          <span style="color: #7f8c8d; font-size: 0.85rem;">目标岗位</span>
          <div style="font-weight: 600;">数据分析师 / 数据分析运营 / BI工程师</div>
        </div>
        <div>
          <span style="color: #7f8c8d; font-size: 0.85rem;">期望城市</span>
          <div style="font-weight: 600;">广州</div>
        </div>
        <div>
          <span style="color: #7f8c8d; font-size: 0.85rem;">优势</span>
          <div style="font-weight: 600;">全链路数据分析能力 · AI工具应用 · 业务理解深入</div>
        </div>
      </div>
    </div>

    <!-- AI 悬浮助手 -->
    <AIFloatingWidget />
  </div>
</template>

<script setup>
import AIFloatingWidget from '../components/AIFloatingWidget.vue'

const workExperience = [
  {
    company: '广州灵动创想（玩具潮品）',
    department: '销售管理部',
    position: '销售运营',
    period: '2024.10-2026.06',
    duration: '1年8个月',
    keyPoints: [
      '搭建Agent销售分析智能体，打通ERP→BI→DeepSeek全链路，人效提升90%',
      '从零搭建公司经营分析数据体系，节省数字化专项投入',
      '开发自动化报表模板，提升跨部门协作效率',
      '统筹编制年/季/月度预算指标及经营计划'
    ]
  },
  {
    company: '广州粒上皇食品（食品零售）',
    department: '集团运营中台',
    position: '运营分析高级专员',
    period: '2022.06-2024.10',
    duration: '2年4个月',
    keyPoints: [
      '负责集团及子公司全面预算管理与滚动预测',
      '出具月度经营分析报告，推动重点事项落地',
      '优化门店运营评价体系，推动奖惩方案执行',
      '运用Power BI搭建业务经营分析体系'
    ]
  },
  {
    company: '食亨（外卖运营）',
    department: '广州分公司',
    position: '运营专员',
    period: '2021.07-2022.06',
    duration: '11个月',
    keyPoints: [
      '负责20家连锁外卖店铺运营，营收增长46%',
      '运用Power BI搭建指标体系，制定精细化运营方案',
      '竞品调研与数据分析，辅助运营决策'
    ]
  }
]

const skills = [
  {
    category: '数据分析工具',
    items: ['Power BI', 'FineBI', 'SQL Server', 'Python']
  },
  {
    category: 'AI与自动化',
    items: ['Claude Code', 'DeepSeek', '影刀RPA', 'Coze']
  },
  {
    category: '分析能力',
    items: ['经营分析', '数据建模', '指标体系搭建', '策略提报']
  },
  {
    category: '其他',
    items: ['英语六级', '驾照', '统计学专业背景']
  }
]
</script>
