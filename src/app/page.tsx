'use client';

import { useQuery } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { client } from '@/lib/apollo-client';
import { GET_TRANSFERS } from '@/graphql/queries';
import TransferList from '@/components/TransferList';
import TradingChart from '@/components/TradingChart';

interface Transfer {
  id: string;
  from: string;
  to: string;
  amount: string;
  blockNumber: string;
  blockTimestamp: string;
  transactionHash: string;
}

function HomeContent() {
  const { loading, error, data } = useQuery(GET_TRANSFERS, {
    variables: { first: 50, skip: 0 },
    pollInterval: 10000,
  });

  // 转换数据为图表格式
  const chartData = data?.transfers?.map((transfer: Transfer, index: number) => ({
    time: parseInt(transfer.blockTimestamp) + index, // 为每个数据点添加小的增量
    open: parseFloat(transfer.amount) / 1e18 * 0.99,
    high: parseFloat(transfer.amount) / 1e18 * 1.02,
    low: parseFloat(transfer.amount) / 1e18 * 0.98,
    close: parseFloat(transfer.amount) / 1e18,
    price: parseFloat(transfer.amount) / 1e18,
  })) || [];

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-xl text-gray-600">加载中...</div>
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-xl text-red-600">错误: {error.message}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          UNI 代币交易监控
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <TradingChart data={chartData} />
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">统计信息</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">总转账数</p>
                <p className="text-2xl font-bold text-gray-900">{data?.transfers?.length || 0}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">总转账量</p>
                <p className="text-2xl font-bold text-green-600">
                  {(data?.transfers?.reduce((sum: number, transfer: Transfer) => sum + parseFloat(transfer.amount) / 1e18, 0) || 0).toFixed(2)} UNI
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <TransferList transfers={data?.transfers || []} />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <ApolloProvider client={client}>
      <HomeContent />
    </ApolloProvider>
  );
}