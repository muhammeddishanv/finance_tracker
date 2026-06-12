import { useMemo } from 'react';
import type { Transaction } from '../../types/transaction';
import { generateInsight } from '../../utils/generateInsight';
import { Card } from '../ui/Card';
import { Lightbulb } from 'lucide-react';

interface InsightCardProps {
  transactions: Transaction[];
}

export function InsightCard({ transactions }: InsightCardProps) {
  const insight = useMemo(() => generateInsight(transactions), [transactions]);

  return (
    <Card className="bg-gradient-to-r from-blue-600 to-indigo-700 border-none shadow-lg transform transition-all">
      <div className="flex items-center gap-5">
        <div className="bg-white/20 p-3.5 rounded-2xl shrink-0 backdrop-blur-sm">
          <Lightbulb className="w-7 h-7 text-white fill-white/20" />
        </div>
        <div>
          <h3 className="text-blue-100 text-sm font-semibold uppercase tracking-wider mb-1">
            Financial Insight
          </h3>
          <p className="text-white text-lg md:text-xl font-medium leading-snug">
            {insight}
          </p>
        </div>
      </div>
    </Card>
  );
}
