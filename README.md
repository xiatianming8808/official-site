# 云栖智能 · YunQi AI 官网

纯静态单页官网（HTML + CSS + 原生 JS，无构建步骤），用于展示工作室的产品、能力、定价与团队。

## 本地预览

直接双击 `index.html`，或用任意静态服务器：

```powershell
npx serve .
# 或
python -m http.server 8080
```

## 结构

```
index.html
assets/
  css/style.css
  js/main.js
  favicon.svg
.nojekyll
```

## 特性

- 无依赖、无构建，首屏 < 60KB 文本
- 深色主题 + 玻璃拟态卡片，响应式（980 / 720 两档断点）
- IntersectionObserver 滚动入场与数字滚动
- 原生表单校验与提交反馈
- 支持 `prefers-reduced-motion`

## 部署

- GitHub Pages：`main` 分支根目录，访问 `https://<user>.github.io/official-site/`
- 备选：Cloudflare Pages / Vercel 直接指向该静态目录

## 技术说明

见同目录 `PRD.md`。
