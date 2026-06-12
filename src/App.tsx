import React from 'react';
import { SummaryCards } from './components/dashboard/SummaryCards';
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
          <SummaryCards transactions={transactions} />
          {/* Other components like charts and tables will go here */}
        </main>
      </div>
    </div>
  );
}

export default App;
