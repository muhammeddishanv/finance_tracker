import type { Transaction } from '../../types/transaction';
import { formatCurrency } from '../../utils/formatCurrency';
import { Card } from '../ui/Card';
import { Trash2, Edit2 } from 'lucide-react';

interface TransactionTableProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
  onEdit: (transaction: Transaction) => void;
}

export function TransactionTable({ transactions, onDelete, onEdit }: TransactionTableProps) {
  if (transactions.length === 0) {
    return (
      <Card className="flex flex-col items-center justify-center py-16 h-full">
        <div className="text-slate-200 mb-4">
          <svg className="w-20 h-20 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <p className="text-slate-500 font-medium text-lg">No transactions found</p>
        <p className="text-slate-400 mt-1">They will appear here once you add them.</p>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden p-0 h-full flex flex-col">
      <div className="p-6 border-b border-slate-100">
        <h3 className="text-lg font-bold text-slate-800">Recent Transactions</h3>
      </div>
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50/80 text-xs uppercase font-bold text-slate-500 border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 tracking-wider">Date</th>
              <th className="px-6 py-4 tracking-wider">Category</th>
              <th className="px-6 py-4 tracking-wider">Note</th>
              <th className="px-6 py-4 text-right tracking-wider">Amount</th>
              <th className="px-6 py-4 text-center tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {transactions.map((t) => (
              <tr key={t.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-700">{new Date(t.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wide ${t.type === 'income' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-slate-100 text-slate-700 border border-slate-200'}`}>
                    {t.category}
                  </span>
                </td>
                <td className="px-6 py-4 truncate max-w-[200px] text-slate-500">{t.note || '-'}</td>
                <td className={`px-6 py-4 text-right font-bold whitespace-nowrap ${t.type === 'income' ? 'text-emerald-600' : 'text-slate-800'}`}>
                  {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => onEdit(t)} className="text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all p-2 rounded-lg" title="Edit">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => onDelete(t.id)} className="text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-all p-2 rounded-lg" title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
