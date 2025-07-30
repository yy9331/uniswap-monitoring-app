'use client';

import { formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';

interface Transfer {
  id: string;
  from: string;
  to: string;
  amount: string;
  blockNumber: string;
  blockTimestamp: string;
  transactionHash: string;
}

interface TransferListProps {
  transfers: Transfer[];
}

export default function TransferList({ transfers }: TransferListProps) {
  if (!transfers || transfers.length === 0) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">最新转账</h3>
        <p className="text-gray-500">暂无转账数据</p>
      </div>
    );
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatAmount = (amount: string) => {
    return (parseFloat(amount) / 1e18).toFixed(4);
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">最新转账</h3>
        <div className="space-y-4">
          {transfers.slice(0, 10).map((transfer) => (
            <div key={transfer.id} className="border-b border-gray-200 pb-4 last:border-b-0">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {formatAddress(transfer.from)} → {formatAddress(transfer.to)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatDistanceToNow(parseInt(transfer.blockTimestamp) * 1000, {
                      addSuffix: true,
                      locale: zhCN,
                    })}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    区块: {transfer.blockNumber}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-green-600">
                    {formatAmount(transfer.amount)} UNI
                  </p>
                  <p className="text-xs text-gray-500">
                    TX: {transfer.transactionHash.slice(0, 8)}...
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 