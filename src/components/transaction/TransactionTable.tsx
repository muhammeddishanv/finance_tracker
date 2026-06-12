import type { Transaction } from '../../types/transaction';
import { formatCurrency } from '../../utils/formatCurrency';
import { Card } from '../ui/Card';
import { Trash2, Edit2 } from 'lucide-react';

interface TransactionTableProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
  onEdit: (transaction: Transaction) => void;
}

const CATEGORY_COLORS: Record<string, string> = {
  'Freelance': 'bg-[var(--color-neo-income)]',
  'Business': 'bg-[var(--color-neo-lime)]',
  'Salary': 'bg-emerald-300',
  'Other Income': 'bg-slate-300',
  'Entertainment': 'bg-[var(--color-neo-purple)]',
  'Travel': 'bg-[var(--color-neo-income)]',
  'Food': 'bg-[var(--color-neo-warning)]',
  'Shopping': 'bg-[var(--color-neo-expense)]',
  'Bills': 'bg-blue-300',
  'Health': 'bg-pink-300',
  'Education': 'bg-orange-300',
  'Other Expense': 'bg-slate-300'
};

export function TransactionTable({ transactions, onDelete, onEdit }: TransactionTableProps) {
  if (transactions.length === 0) {
    return (
      <Card className="flex flex-col items-center justify-center py-16 h-full border-neo shadow-neo bg-white">
        <p className="text-xl font-bold uppercase text-[var(--color-neo-black)] mt-4">No transactions found</p>
        <p className="text-sm font-bold text-slate-500 uppercase mt-2">Try adjusting your filters or add a new one.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="inline-block px-3 py-1 border-neo bg-[var(--color-neo-lime)] text-xs font-bold uppercase mb-2">
        RECENT TRANSACTIONS
      </div>
      
      <div className="border-neo shadow-neo bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[var(--color-neo-black)] text-white text-xs uppercase font-bold tracking-wider">
                <th className="px-6 py-4 border-r border-slate-700 whitespace-nowrap">Date</th>
                <th className="px-6 py-4 border-r border-slate-700 whitespace-nowrap">Category</th>
                <th className="px-6 py-4 border-r border-slate-700 min-w-[150px]">Note</th>
                <th className="px-6 py-4 border-r border-slate-700 text-right whitespace-nowrap">Amount</th>
                <th className="px-6 py-4 text-center whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-neo-black)] border-t-[3px] border-[var(--color-neo-black)]">
              {transactions.map((t) => (
                <tr key={t.id} className="group hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 border-r border-[var(--color-neo-black)] text-sm font-bold whitespace-nowrap">
                    {new Date(t.date).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    }).toUpperCase()}
                  </td>
                  <td className="px-6 py-4 border-r border-[var(--color-neo-black)] whitespace-nowrap">
                    <span className={`inline-block px-3 py-1 border-[2px] border-[var(--color-neo-black)] text-xs font-bold uppercase ${CATEGORY_COLORS[t.category] || 'bg-slate-200'}`}>
                      {t.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 border-r border-[var(--color-neo-black)] text-sm font-medium" title={t.note || ''}>
                    {t.note ? (t.note.length > 21 ? t.note.substring(0, 21) + '...' : t.note) : '-'}
                  </td>
                  <td className={`px-6 py-4 border-r border-[var(--color-neo-black)] text-sm font-bold text-right whitespace-nowrap ${t.type === 'income' ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-3">
                      <button onClick={() => onEdit(t)} className="bg-white border-[2px] border-[var(--color-neo-black)] p-1.5 hover-neo shadow-[2px_2px_0px_#111111]" title="Edit">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => onDelete(t.id)} className="bg-[var(--color-neo-expense)] border-[2px] border-[var(--color-neo-black)] p-1.5 hover-neo shadow-[2px_2px_0px_#111111]" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
