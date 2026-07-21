# 王泽伟 - 个人求职网站 更新指南

> 本文档介绍如何修改网站内容并发布到公网。

---

## 🌐 在线地址

| 地址 | 说明 |
|------|------|
| **https://www.victor-resume.online** | 🎯 主站（自定义域名，国内可访问） |
| https://wongv6246-droid.github.io/resume-victor | GitHub Pages 原始地址 |
| https://resume-victor-cyan.vercel.app | Vercel 备用地址（海外） |

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
| `.github/workflows/deploy.yml` | GitHub Actions 自动部署配置 |

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

### 方式一：自动部署（推荐）

修改完成并确认无误后，执行以下命令：

```bash
cd D:/求职网站
git add .
git commit -m "这里写你本次修改的内容说明"
git push
```

推送后，**GitHub Actions 会自动构建并部署到 GitHub Pages**，等待约 **1-2 分钟**，访问以下地址即可看到更新：

**https://www.victor-resume.online**

> 无需手动操作，推送即自动部署。

### 方式二：手动部署

如果自动部署失败，可以手动部署：

```bash
cd D:/求职网站

# 1. 确保依赖已安装
npm install

# 2. 构建项目
npm run build

# 3. 创建并推送到 gh-pages 分支
git checkout --orphan gh-pages
git rm -rf .
cp -r dist/* .
rm -rf dist
git add -A
git commit -m "部署到 GitHub Pages"
git push origin gh-pages --force
git checkout main
git branch -D gh-pages
```

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
- 如果推送后 GitHub Actions 部署失败，可登录 GitHub 仓库 → Actions 标签页查看失败原因，或手动部署
- 知识库文档（`qa-knowledge.md`）支持随时补充，AI 会自动学习新内容
- 自定义域名 `victor-resume.online` 通过阿里云 DNS（CNAME → www）解析到 GitHub Pages

---

## 🔧 首次部署参考

如需重新部署到新域名：

1. 在阿里云 DNS 添加 CNAME 记录：`www` → `wongv6246-droid.github.io`
2. 在 GitHub 仓库 Settings → Pages → Custom domain 填入域名
3. `.github/workflows/deploy.yml` 已配置自动部署，推送到 `main` 后自动生效
4. `vite.config.js` 中 `base` 设为 `'/'`（适用于自定义域名根路径）
