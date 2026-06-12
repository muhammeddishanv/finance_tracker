import React from 'react';
import { SummaryCards } from './components/dashboard/SummaryCards';
import { SpendingChart } from './components/dashboard/SpendingChart';
import { InsightCard } from './components/dashboard/InsightCard';
import type { Transaction } from './types/transaction';

function App() {
  // Temporary empty state
  const [transactions] = React.useState<Transaction[]>([]);

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <header>
          <h1 className="text-3xl font-bold text-slate-900">Finance Tracker</h1>
          <p className="text-slate-500 mt-1">Manage your income and expenses easily.</p>
        </header>

        <main className="space-y-8">
          <InsightCard transactions={transactions} />
          
          <SummaryCards transactions={transactions} />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Transaction Form and Table will go here in Phase 1 (CRUD) */}
              <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-6 h-full flex items-center justify-center text-slate-400">
                Transaction Table Placeholder
              </div>
            </div>
            <div className="lg:col-span-1">
              <SpendingChart transactions={transactions} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
