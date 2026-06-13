import { useMemo } from 'react';
import { ArrowUpRight, ArrowDownRight, Wallet, TrendingUp } from 'lucide-react';
import type { Transaction } from '../../types/transaction';
import { calculateSummary } from '../../utils/calculateSummary';
import { formatCurrency } from '../../utils/formatCurrency';
import { Card } from '../ui/Card';

export function SummaryCards({ transactions }: { transactions: Transaction[] }) {
  const summary = useMemo(() => calculateSummary(transactions), [transactions]);

  const cards = [
    {
      title: 'Total Income',
      value: formatCurrency(summary.totalIncome),
      icon: ArrowUpRight,
      color: 'bg-[var(--color-neo-income)]',
    },
    {
      title: 'Total Expense',
      value: formatCurrency(summary.totalExpense),
      icon: ArrowDownRight,
      color: 'bg-[var(--color-neo-expense)]',
    },
    {
      title: 'Net Balance',
      value: formatCurrency(summary.netBalance),
      icon: Wallet,
      color: 'bg-[var(--color-neo-warning)]',
      isNegative: summary.netBalance < 0
    },
    {
      title: 'Top Spending',
      value: summary.topCategory,
      icon: TrendingUp,
      color: 'bg-[var(--color-neo-purple)]',
      isText: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => (
        <Card key={card.title} className="flex items-center justify-between hover-neo">
          <div className="flex flex-col gap-4 w-full">
            <div className="flex justify-between items-start w-full">
              <div className={`inline-block px-3 py-1 border-neo text-xs font-bold uppercase ${card.color}`}>
                {card.title}
              </div>
              <div className={`p-2 border-neo rounded-full ${card.color} shadow-neo-sm`}>
                <card.icon className="w-5 h-5 text-[var(--color-neo-black)]" strokeWidth={3} />
              </div>
            </div>
            <p className={`text-3xl font-extrabold tracking-tight truncate ${card.isNegative ? 'text-rose-600' : 'text-[var(--color-neo-black)]'} ${card.isText ? 'text-2xl uppercase' : ''}`}>
              {card.isNegative ? '-' : ''}{card.value.replace('-', '')}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
}
