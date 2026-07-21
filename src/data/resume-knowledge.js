/**
 * 简历知识库 - 从王泽伟简历中提取的结构化信息
 * 用于AI问答时的上下文参考
 */
export const resumeKnowledge = {
  basicInfo: {
    name: '王泽伟',
    age: 28,
    location: '广州番禺',
    email: '1287747912@qq.com',
    phone: '19118475038',
    education: {
      school: '杭州电子科技大学',
      major: '统计学',
      degree: '本科',
      period: '2017.09-2021.06'
    },
    honors: [
      '浙江省大学生统计调查大赛一等奖',
      '浙江省大学生"挑战杯"二等奖',
      '优秀志愿者',
      '青协会长'
    ],
    english: '英语六级',
    driverLicense: '有驾照'
  },

  selfEvaluation: {
    careerBackground: '5年数据分析运营经验（3年C端 + 2年B端），擅长数据分析与经营策略提报，具备较强的逻辑思维与业务洞察力',
    coreSkills: '杭电统计学专业，数学与计算机基础扎实；熟练运用 AI工具（Claude Code）、SQL Server、Python、RPA（影刀、Coze）、BI工具（Power BI、FineBI），持有帆软认证数据分析师，内驱力强，业务理解深入'
  },

  workExperience: [
    {
      company: '广州灵动创想（玩具潮品）',
      department: '销售管理部',
      position: '销售运营',
      period: '2024.10-2026.06',
      duration: '1年8个月',
      responsibilities: [
        {
          title: 'Agent销售分析智能体',
          detail: '运用影刀RPA打通：ERP取数→PowerQuery清洗→BI建模→DeepSeek分析&产出报告全链路，实现销售日报全自动生成，人效提升90%'
        },
        {
          title: 'BI经营分析体系搭建（0→1）',
          detail: '从零搭建公司经营分析数据体系，覆盖业务指标监控、商品分析、用户分析及大渠道C端动销追踪，完成数据底层构建与指标体系沉淀；零成本基于企微安全部署BI看板，配置RLS行级权限实现数据安全分级管控，为管理层提供精准决策支撑，为公司节省数字化专项投入'
        },
        {
          title: '数据报表开发及跨部门协同',
          detail: '深入兄弟部门了解实际业务流程，定制开发人资KPI、财务返利、市场物料配比、研发产品项目进度等自动化报表模板，实现一键刷新，大幅提升跨部门工作效率'
        },
        {
          title: '销售指标与经营计划',
          detail: '单品目标预测：综合产品IP、品类、价格、品线与渠道铺市深度、节奏的适配性，结合产品潜力指数建模测算，输出销量预测辅助供应链备货；总目标及KPI：统筹编制公司年/季/月度预算指标，负责经营计划编制、分解、下达、动态调整及风险预警'
        },
        {
          title: '数据分析与挖掘',
          detail: '通过常用数据算法与分析框架，针对产品铺市、动销及产品销售情况进行数据挖掘、整合、统计建模分析，从数据分析角度提出相应优化改善建议，为公司业务决策、产品/运营方向等提供强有力的数据支持'
        }
      ]
    },
    {
      company: '广州粒上皇食品（食品零售）',
      department: '集团运营中台',
      position: '运营分析高级专员',
      period: '2022.06-2024.10',
      duration: '2年4个月',
      responsibilities: [
        {
          title: '运营预算管理',
          detail: '负责支持集团及下属子公司的年度、月度全面预算及滚动预测，深入了解业务，根据品牌、运营和供应链的实际执行效果，协助业务在预算范围内完成KPI指标'
        },
        {
          title: '财务专项分析',
          detail: '①出具月度经营分析报告并与业务经营层沟通，推动重点事项的落地与执行；②对子公司上报的业务方案进行风险评估，建立定期的业务和财务数据跟踪体系，对重点业务项目进行事前评估、事中跟进、事后定期反馈；③识别运营中台及下属子公司门店中可以降本增效事项，联动财税资金部门增收节支'
        },
        {
          title: '运营会议专项',
          detail: '组织运营中心业务会议，通过会议进行部门内部沟通，以及跨部门的沟通协同，并对会议上提出的问题及机会点进行探讨和跟进，达成决议'
        },
        {
          title: '运营评价体系',
          detail: '优化门店运营评价体系设计，综合筹算评价门店运营过程、结果指标，推动评价结果的奖惩方案落地执行'
        },
        {
          title: '运营数据分析',
          detail: '整合汇总各子公司经营数据，多维度对子公司经营情况进行分析，发现业绩提升机会点，为子公司精细化运营管理提供支持及保障'
        },
        {
          title: '指标体系搭建',
          detail: '运用Power BI，搭建业务经营分析体系、包括（核心指标设计与监控、结果复盘、专题分析等），提升集团及子公司平台的经营管理效率'
        }
      ]
    },
    {
      company: '食亨（外卖运营）',
      department: '广州分公司',
      position: '运营专员',
      period: '2021.07-2022.06',
      duration: '11个月',
      responsibilities: [
        {
          title: '店铺运营',
          detail: '负责品牌方20家连锁外卖店铺运营，制定精细化运营方案，实现营收环比（接管前）46%增长'
        },
        {
          title: '竞品调研',
          detail: '调研整理市场竞品公司有效销售经营数据，协助促销活动的制订、组织实施、监控调整，形成有效分析报告，确保数据提供的准确性和及时性'
        },
        {
          title: '数据分析',
          detail: '运用Power BI，根据业务核心公式搭建指标体系，制作详细运营方案，通过复盘分析优化调整，找到适合品牌的运营打法，合理分配资源，使产出最大化'
        },
        {
          title: '活动运营',
          detail: '明确活动目的，与平台谈判资源，配合平台营销日历或时间节点进行主题场景活动影响，增加热度和曝光'
        },
        {
          title: '付费推广',
          detail: '熟悉平台方付费工具及其推广逻辑，结合品牌方业务需求，跟进平台字段定义，确认各个资源位流量量级、产出情况，进行资源位评级，优化流量运营，增加店铺曝光流量，带动订单量及营业额增长，提升店铺综合排名，带动店铺自然流量增长'
        }
      ]
    }
  ],

  portfolio: [
    {
      title: 'Power BI 数据看板 - 作品1',
      url: 'http://c.u6v.cn/6xpgpA',
      password: 'WYCX8050',
      description: 'Power BI 数据可视化与经营分析看板'
    },
    {
      title: 'Power BI 数据看板 - 作品2',
      url: 'http://c.u6v.cn/6j2NIw',
      password: '无需密码',
      description: 'Power BI 数据可视化与分析看板'
    }
  ],

  // 离职原因
  departureReasons: {
    lastCompany: '广州灵动创想（玩具潮品）',
    lastPosition: '销售运营',
    reason: '广州灵动经济型裁员，上到CEO，下到主管、专员都有进行裁减。'
  },
  departureReasons2: {
    company: '广州粒上皇食品（食品零售）',
    position: '运营分析高级专员',
    reason: '领导带他跳槽到了灵动创想公司。'
  },
  departureReasons3: {
    company: '食亨（外卖运营）',
    position: '运营专员',
    reason: '广州子公司撤销，需要搬迁到上海总部，综合考虑下提出离职。'
  },

  // 求职意向
  jobIntent: {
    targetPosition: ['数据分析师', '数据分析运营', 'BI工程师', '销售运营分析'],
    expectedCity: '广州',
    advantages: ['5年经验（3年C端+2年B端）', '全链路数据分析能力（从取数到策略输出）', 'AI工具应用能力强', '业务理解深入']
  }
}

/**
 * 将知识库转换为适合作为AI上下文的文本格式
 */
export function getKnowledgeContext() {
  const info = resumeKnowledge
  return `
【个人信息】
姓名：${info.basicInfo.name}
年龄：${info.basicInfo.age}
现居：${info.basicInfo.location}
邮箱：${info.basicInfo.email}
电话：${info.basicInfo.phone}
教育背景：${info.basicInfo.education.school} ${info.basicInfo.education.major} ${info.basicInfo.education.degree} ${info.basicInfo.education.period}
荣誉：${info.basicInfo.honors.join('、')}
英语：${info.basicInfo.english}
驾照：${info.basicInfo.driverLicense}

【自我评价】
${info.selfEvaluation.careerBackground}
${info.selfEvaluation.coreSkills}

【工作经历】
${info.workExperience.map(exp => `
--- ${exp.company} | ${exp.position} | ${exp.period}（${exp.duration}）---
${exp.responsibilities.map(r => `• ${r.title}：${r.detail}`).join('\n')}
`).join('\n')}

【离职原因】
① 食亨（外卖运营）- 运营专员：${info.departureReasons3.reason}
② 广州粒上皇食品 - 运营分析高级专员：${info.departureReasons2.reason}
③ 广州灵动创想 - 销售运营：${info.departureReasons.reason}

【求职意向】
目标岗位：${info.jobIntent.targetPosition.join('、')}
期望城市：${info.jobIntent.expectedCity}
核心优势：${info.jobIntent.advantages.join('、')}
`
}
