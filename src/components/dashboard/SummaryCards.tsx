import { useMemo } from 'react';
import { calculateSummary } from '../../utils/calculateSummary';
import { formatCurrency } from '../../utils/formatCurrency';
import type { Transaction } from '../../types/transaction';
import { Card } from '../ui/Card';
import { ArrowUpCircle, ArrowDownCircle, Wallet, TrendingUp } from 'lucide-react';

interface SummaryCardsProps {
  transactions: Transaction[];
}

export function SummaryCards({ transactions }: SummaryCardsProps) {
  const summary = useMemo(() => calculateSummary(transactions), [transactions]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Total Income</p>
            <h3 className="text-2xl font-bold text-slate-800 mt-1">
              {formatCurrency(summary.totalIncome)}
            </h3>
          </div>
          <div className="h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
            <ArrowUpCircle className="w-6 h-6" />
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Total Expense</p>
            <h3 className="text-2xl font-bold text-slate-800 mt-1">
              {formatCurrency(summary.totalExpense)}
            </h3>
          </div>
          <div className="h-12 w-12 bg-rose-100 rounded-full flex items-center justify-center text-rose-600">
            <ArrowDownCircle className="w-6 h-6" />
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Net Balance</p>
            <h3 className={`text-2xl font-bold mt-1 ${summary.netBalance >= 0 ? 'text-slate-800' : 'text-rose-600'}`}>
              {formatCurrency(summary.netBalance)}
            </h3>
          </div>
          <div className={`h-12 w-12 rounded-full flex items-center justify-center ${summary.netBalance >= 0 ? 'bg-blue-100 text-blue-600' : 'bg-rose-100 text-rose-600'}`}>
            <Wallet className="w-6 h-6" />
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Top Spending</p>
            <h3 className="text-xl font-bold text-slate-800 mt-1 truncate max-w-[140px]" title={summary.topCategory}>
              {summary.topCategory}
            </h3>
          </div>
          <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>
      </Card>
    </div>
  );
}
