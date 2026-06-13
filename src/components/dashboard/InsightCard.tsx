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
    <Card className="flex items-center gap-6 hover-neo h-full">
      <div className="flex items-center gap-6 w-full h-full overflow-hidden">
        <div className="bg-[var(--color-neo-black)] p-4 border-neo shrink-0 hidden sm:block">
          <Lightbulb className="w-10 h-10 text-[var(--color-neo-lime)]" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--color-neo-black)] mb-2 flex items-center gap-2">
            <span className="sm:hidden block"><Lightbulb className="w-4 h-4" /></span>
            Financial Insight
          </h3>
          <p className="text-xl md:text-2xl font-extrabold uppercase leading-tight text-[var(--color-neo-black)] max-w-2xl line-clamp-2">
            {insight}
          </p>
        </div>
      </div>
    </Card>
  );
}
