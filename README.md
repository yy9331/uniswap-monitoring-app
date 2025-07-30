# UNI 代币交易监控应用

一个基于 Next.js 的实时 UNI 代币转账监控应用，通过 The Graph 子图获取区块链数据并使用 TradingView 图表库展示。

## 🚀 功能特性

- **实时数据监控**：通过 The Graph 子图实时获取 UNI 代币转账数据
- **交互式图表**：使用 TradingView Lightweight Charts 展示转账趋势
- **转账列表**：显示最新的 UNI 代币转账记录
- **统计信息**：展示总转账数和转账量统计
- **自动刷新**：每 10 秒自动更新数据
- **响应式设计**：支持桌面和移动设备

## 🛠 技术栈

- **前端框架**：Next.js 15.4.5 (App Router)
- **语言**：TypeScript
- **样式**：Tailwind CSS
- **包管理器**：Bun
- **图表库**：TradingView Lightweight Charts v4.1.3
- **GraphQL 客户端**：Apollo Client
- **区块链交互**：Viem
- **日期处理**：date-fns

## 📊 数据源

应用连接到部署在 The Graph Studio 上的子图：
- **子图名称**：`uni-token-monitor-subgraph`
- **端点**：`https://api.studio.thegraph.com/query/117294/uni-token-monitor-subgraph/v0.0.1/`
- **监控合约**：UNI 代币合约 (`0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984`)

## 🚀 快速开始

### 前置要求

- Node.js 18+ 或 Bun
- 确保子图已部署并正常运行

### 安装依赖

```bash
# 使用 Bun (推荐)
bun install

# 或使用 npm
npm install
```

### 启动开发服务器

```bash
# 使用 Bun
bun run dev

# 或使用 npm
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建生产版本

```bash
# 使用 Bun
bun run build

# 或使用 npm
npm run build
```

## 📁 项目结构

```
src/
├── app/                    # Next.js App Router 页面
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 主页面
├── components/             # React 组件
│   ├── TradingChart.tsx   # TradingView 图表组件
│   └── TransferList.tsx   # 转账列表组件
├── graphql/               # GraphQL 查询
│   └── queries.ts         # 数据查询定义
└── lib/                   # 工具库
    └── apollo-client.ts   # Apollo Client 配置
```

## 🔧 配置说明

### GraphQL 端点配置

在 `src/lib/apollo-client.ts` 中配置 The Graph 端点：

```typescript
export const client = new ApolloClient({
  uri: 'https://api.studio.thegraph.com/query/117294/uni-token-monitor-subgraph/v0.0.1/',
  cache: new InMemoryCache(),
});
```

### 数据查询

应用使用以下 GraphQL 查询获取数据：

- `GET_TRANSFERS`：获取 UNI 代币转账记录
- `GET_APPROVALS`：获取授权记录
- `GET_DELEGATE_CHANGES`：获取委托变更记录
- `GET_MINTER_CHANGES`：获取铸币者变更记录

## 📈 图表功能

- **K线图**：展示转账金额的时间序列数据
- **自动排序**：确保数据按时间升序排列
- **重复处理**：自动处理相同时间戳的数据
- **响应式**：图表自动适应容器大小

## 🎨 界面特性

- **深色主题图表**：专业的金融图表样式
- **中文界面**：完整的中文用户界面
- **实时更新**：数据每 10 秒自动刷新
- **加载状态**：优雅的加载和错误状态处理

## 🔄 数据更新

- **轮询间隔**：10 秒
- **数据限制**：每次获取 50 条最新记录
- **错误处理**：网络错误和 GraphQL 错误处理

## 🚀 部署

### Vercel 部署

推荐使用 Vercel 进行部署：

1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目
3. 配置环境变量（如需要）
4. 部署

### 其他平台

应用也可以部署到其他支持 Next.js 的平台，如：
- Netlify
- Railway
- DigitalOcean App Platform

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

本项目采用 MIT 许可证。

## 🔗 相关链接

- [The Graph Studio](https://studio.thegraph.com/)
- [TradingView Lightweight Charts](https://www.tradingview.com/lightweight-charts/)
- [Next.js 文档](https://nextjs.org/docs)
- [Apollo Client 文档](https://www.apollographql.com/docs/react/)
