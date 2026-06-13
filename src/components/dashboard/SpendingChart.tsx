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

export function SpendingChart({ transactions, onViewAll }: { transactions: Transaction[]; onViewAll?: () => void }) {
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
      <>
        {/* Mobile empty state */}
        <div className="block md:hidden bg-white border-[3px] border-[#111111] shadow-[4px_4px_0px_#111111] rounded-[20px] p-6 text-center">
          <div className="w-12 h-12 border-neo rounded-full bg-[var(--color-neo-bg)] flex items-center justify-center mx-auto mb-3">
            <div className="w-6 h-6 border-neo rounded-full bg-[var(--color-neo-warning)]" />
          </div>
          <p className="text-sm font-bold uppercase text-[var(--color-neo-black)]">No expenses yet</p>
        </div>

        {/* Desktop empty state */}
        <div className="hidden md:block">
          <Card className="flex flex-col items-center justify-center h-80">
            <div className="w-16 h-16 border-neo rounded-full bg-[var(--color-neo-bg)] flex items-center justify-center mb-4">
              <div className="w-8 h-8 border-neo rounded-full bg-[var(--color-neo-warning)]" />
            </div>
            <p className="text-lg font-bold uppercase text-[var(--color-neo-black)]">No expenses yet</p>
          </Card>
        </div>
      </>
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
    <>
      {/* Mobile Layout */}
      <div className="block md:hidden bg-white border-[3px] border-[#111111] shadow-[4px_4px_0px_#111111] rounded-[20px] p-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-black text-[#111111] uppercase tracking-wide">Expenses by Category</h3>
          {onViewAll && (
            <button 
              onClick={onViewAll}
              className="text-xs font-bold uppercase text-emerald-600 flex items-center gap-0.5 hover:underline"
            >
              View All <span className="text-[10px]">▶</span>
            </button>
          )}
        </div>
        <div className="flex items-center gap-4">
          {/* Donut Chart */}
          <div className="w-[120px] h-[120px] shrink-0 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={32}
                  outerRadius={46}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="#111111"
                  strokeWidth={2}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-mobile-${index}`} fill={CATEGORY_COLORS[entry.name] || '#CBD5E1'} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          {/* Legend list */}
          <div className="flex-1 grid grid-cols-1 gap-1.5 pl-2">
            {chartData.map((entry) => {
              const totalAmount = chartData.reduce((sum, item) => sum + item.value, 0);
              const percentage = totalAmount > 0 ? Math.round((entry.value / totalAmount) * 100) : 0;
              return (
                <div key={entry.name} className="flex items-center justify-between text-xs font-bold text-[#111111] uppercase">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-2.5 h-2.5 rounded-full border border-[#111111] shrink-0" style={{ backgroundColor: CATEGORY_COLORS[entry.name] || '#CBD5E1' }} />
                    <span className="truncate text-slate-700">{entry.name}</span>
                  </div>
                  <span className="text-slate-900 font-black">{percentage}%</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block">
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
      </div>
    </>
  );
}
