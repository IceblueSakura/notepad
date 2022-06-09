# 记事本-前端页面(Next.js)

毕设项目，大缝合怪，人生第一个写完的Node.js项目，很多特性没用上，只是能跑起来

**需要配合notepad-nestjs后端才能用**


### 已用组件：
- Next.js (主框架)
- Redux (状态管理)
- redux-persist (状态管理持久化)
- localforage (持久化到IndexedDB)
- next-pwa (自动生成PWA需要的service-worker,只加没配置)
- wangeditor (富文本编辑器)
- MUI (组件库，几乎一句css没写全靠它)

### 如何运行：

**加载各种库：**

```bash
    npm install pnpm -g
    pnpm install
```

**启动生产版本(带PWA)：**

```bash
    pnpm run build
    pnpm run start
```

**启动生产版本(不带PWA)：**

```bash
    pnpm run dev
```
