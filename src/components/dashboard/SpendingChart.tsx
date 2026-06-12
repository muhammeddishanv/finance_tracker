import { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card } from '../ui/Card';
import type { Transaction } from '../../types/transaction';
import { formatCurrency } from '../../utils/formatCurrency';

const CATEGORY_COLORS: Record<string, string> = {
  'Entertainment': '#C9B4FF',
  'Travel': '#B7F8D5',
  'Food': '#FFE87A',
  'Shopping': '#FF9A9A',
  'Bills': '#93C5FD',
  'Health': '#F9A8D4',
  'Education': '#FDBA74',
  'Other Expense': '#CBD5E1'
};

export function SpendingChart({ transactions }: { transactions: Transaction[] }) {
  const chartData = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'expense');
    
    if (expenses.length === 0) return [];

    const categorySums = expenses.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(categorySums)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [transactions]);

  if (chartData.length === 0) {
    return (
      <Card className="flex flex-col items-center justify-center h-80">
        <div className="w-16 h-16 border-neo rounded-full bg-[var(--color-neo-bg)] flex items-center justify-center mb-4">
          <div className="w-8 h-8 border-neo rounded-full bg-[var(--color-neo-warning)]" />
        </div>
        <p className="text-lg font-bold uppercase text-[var(--color-neo-black)]">No expenses yet</p>
      </Card>
    );
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border-neo shadow-neo p-3">
          <p className="font-bold uppercase text-xs mb-1">{payload[0].name}</p>
          <p className="font-bold text-sm text-rose-600">
            {formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <div className="inline-block px-3 py-1 border-neo bg-[var(--color-neo-lime)] text-xs font-bold uppercase mb-6">
        EXPENSES BY CATEGORY
      </div>
      <div className="h-[380px] w-full pb-4">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              stroke="#111111"
              strokeWidth={3}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[entry.name] || '#CBD5E1'} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="bottom" 
              height={140} 
              iconType="circle"
              formatter={(value) => <span className="font-bold uppercase text-xs text-[var(--color-neo-black)] ml-1">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
