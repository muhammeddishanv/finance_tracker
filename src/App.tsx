import React, { useState } from 'react';
import { SummaryCards } from './components/dashboard/SummaryCards';
import { SpendingChart } from './components/dashboard/SpendingChart';
import { InsightCard } from './components/dashboard/InsightCard';
import { TransactionForm } from './components/transaction/TransactionForm';
import { TransactionTable } from './components/transaction/TransactionTable';
import { CategoryFilter } from './components/transaction/CategoryFilter';
import { useTransactions } from './hooks/useTransactions';
import type { Transaction } from './types/transaction';

function App() {
  const { transactions, addTransaction, updateTransaction, deleteTransaction } = useTransactions();
  
  // Filter state
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Edit state
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  // Apply filters
  const filteredTransactions = transactions.filter(t => {
    if (selectedType !== 'all' && t.type !== selectedType) return false;
    if (selectedCategory !== 'All' && t.category !== selectedCategory) return false;
    if (startDate && new Date(t.date) < new Date(startDate)) return false;
    if (endDate && new Date(t.date) > new Date(endDate)) return false;
    return true;
  });

  const handleFormSubmit = (data: any) => {
    if (editingTransaction) {
      updateTransaction(data);
      setEditingTransaction(null);
    } else {
      addTransaction(data);
    }
  };

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
            {/* Left Column: Form & Chart */}
            <div className="lg:col-span-1 space-y-8">
              <TransactionForm 
                onSubmit={handleFormSubmit} 
                initialData={editingTransaction} 
                onCancelEdit={() => setEditingTransaction(null)} 
              />
              <SpendingChart transactions={transactions} />
            </div>
            
            {/* Right Column: Filters & Table */}
            <div className="lg:col-span-2 flex flex-col h-full">
              <CategoryFilter
                selectedType={selectedType}
                onTypeChange={setSelectedType}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                startDate={startDate}
                onStartDateChange={setStartDate}
                endDate={endDate}
                onEndDateChange={setEndDate}
              />
              <div className="flex-1">
                <TransactionTable 
                  transactions={filteredTransactions} 
                  onDelete={deleteTransaction} 
                  onEdit={setEditingTransaction}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
