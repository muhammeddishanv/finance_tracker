import { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card } from '../ui/Card';
import type { Transaction } from '../../types/transaction';
import { formatCurrency } from '../../utils/formatCurrency';

interface SpendingChartProps {
  transactions: Transaction[];
}

// A vibrant, fintech-inspired color palette for the pie chart
const COLORS = [
  '#3b82f6', // blue-500
  '#10b981', // emerald-500
  '#f59e0b', // amber-500
  '#ef4444', // red-500
  '#8b5cf6', // violet-500
  '#ec4899', // pink-500
  '#14b8a6', // teal-500
  '#f97316', // orange-500
];

export function SpendingChart({ transactions }: SpendingChartProps) {
  const data = useMemo(() => {
    // Only care about expenses
    const expenses = transactions.filter((t) => t.type === 'expense');
    
    if (expenses.length === 0) return [];

    // Group by category and sum the amounts
    const grouped = expenses.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {} as Record<string, number>);

    // Convert object to array suitable for Recharts and sort by highest
    return Object.entries(grouped)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value); 
  }, [transactions]);

  if (data.length === 0) {
    return (
      <Card className="flex flex-col items-center justify-center h-[400px]">
        <div className="text-slate-300 mb-4">
          <svg className="w-20 h-20 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
          </svg>
        </div>
        <p className="text-slate-500 font-medium">No expenses to display yet</p>
        <p className="text-slate-400 text-sm mt-1">Add an expense to see your spending breakdown.</p>
      </Card>
    );
  }

  return (
    <Card className="h-[400px] flex flex-col">
      <h3 className="text-lg font-bold text-slate-800 mb-6">Expenses by Category</h3>
      <div className="flex-1 w-full h-full min-h-0 pb-4">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={75}
              outerRadius={110}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
              cornerRadius={4}
            >
              {data.map((_entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number) => formatCurrency(value)}
              contentStyle={{ 
                borderRadius: '12px', 
                border: 'none', 
                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
                padding: '12px 16px',
                fontWeight: 500
              }}
              itemStyle={{ color: '#1e293b' }}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36} 
              iconType="circle"
              formatter={(value) => <span className="text-slate-600 font-medium ml-1">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
