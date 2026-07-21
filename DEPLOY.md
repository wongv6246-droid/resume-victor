# 王泽伟 - 个人求职网站 更新指南

> 本文档介绍如何修改网站内容并发布到公网。

---

## 📁 项目结构速览

| 文件 | 作用 |
|------|------|
| `src/views/Home.vue` | 个人简介页面 |
| `src/views/Portfolio.vue` | 作品集展示页面 |
| `src/components/AIFloatingWidget.vue` | AI 悬浮问答助手 |
| `src/data/qa-knowledge.md` | AI 问答知识库（核心） |
| `src/data/resume-knowledge.js` | 简历数据源（AI 备用知识） |
| `src/data/config.js` | DeepSeek API 配置 |
| `src/style.css` | 全局样式 |
| `public/` | 静态资源目录 |

---

## 🖥️ 本地预览

修改前可以先在本地查看效果：

```bash
cd D:/求职网站
npm run dev
```

浏览器打开 `http://localhost:3000` 预览。

---

## 🚀 发布到公网

修改完成并确认无误后，执行以下命令：

```bash
cd D:/求职网站
git add .
git commit -m "这里写你本次修改的内容说明"
git push
```

推送后，**Cloudflare Pages 会自动构建并部署**，等待约 **1-2 分钟**，访问以下地址即可看到更新：

**https://resume-victor.pages.dev**

> 无需手动登录 Cloudflare，推送即自动部署。

---

## 📝 常见修改场景

### 修改个人信息或工作经历
编辑 `src/views/Home.vue`，找到对应的数据数组或模板内容进行修改。

### 修改 AI 知识库
编辑 `src/data/qa-knowledge.md`，AI 会自动使用最新内容回答问题。
格式参考已有内容，按 markdown 语法添加新的 Q&A 即可。

### 修改作品集
编辑 `src/views/Portfolio.vue`，在 `portfolioItems` 数组中添加或修改作品链接。

### 更换 API Key
编辑 `src/data/config.js`，替换 `apiKey` 字段的值。

---

## ⚠️ 注意事项

- `node_modules` 和 `dist` 目录已配置 `.gitignore`，不会被推送到仓库
- 修改后务必执行 `git push`，否则网站不会更新
- 如果推送后 Cloudflare 部署失败，可登录 [Cloudflare Dashboard](https://dash.cloudflare.com/) → Pages → resume-victor → Deployments → 手动触发重新部署
- 知识库文档（`qa-knowledge.md`）支持随时补充，AI 会自动学习新内容
