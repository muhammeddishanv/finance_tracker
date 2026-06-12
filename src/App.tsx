import { useState } from 'react';
import { SummaryCards } from './components/dashboard/SummaryCards';
import { SpendingChart } from './components/dashboard/SpendingChart';
import { InsightCard } from './components/dashboard/InsightCard';
import { TransactionForm } from './components/transaction/TransactionForm';
import { TransactionTable } from './components/transaction/TransactionTable';
import { CategoryFilter } from './components/transaction/CategoryFilter';
import { ConfirmModal } from './components/ui/ConfirmModal';
import { Toast } from './components/ui/Toast';
import { useTransactions } from './hooks/useTransactions';
import { useTransactionFilters } from './hooks/useTransactionFilters';
import { useToast } from './hooks/useToast';
import type { Transaction, TransactionFilters, TransactionInput } from './types/transaction';

function App() {
  const { transactions, addTransaction, updateTransaction, deleteTransaction } = useTransactions();
  
  // Consolidated Filter state
  const [filters, setFilters] = useState<TransactionFilters>({
    type: 'all',
    category: 'All',
    startDate: '',
    endDate: ''
  });

  // Edit state
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  // UI state
  const [transactionToDelete, setTransactionToDelete] = useState<string | null>(null);
  
  // Custom Toast Hook
  const { toast, showToast, hideToast } = useToast();

  // Custom Filtering Hook
  const filteredTransactions = useTransactionFilters(transactions, filters);

  const handleFormSubmit = (data: TransactionInput | Transaction) => {
    if (editingTransaction) {
      updateTransaction(data as Transaction);
      setEditingTransaction(null);
      showToast('Transaction updated successfully');
    } else {
      addTransaction(data as TransactionInput);
      showToast('Transaction added successfully');
    }
  };

  const confirmDelete = (id: string) => {
    setTransactionToDelete(id);
  };

  const handleDelete = () => {
    if (transactionToDelete) {
      deleteTransaction(transactionToDelete);
      setTransactionToDelete(null);
      showToast('Transaction deleted successfully');
    }
  };

  return (
    <div className="min-h-screen pb-8 selection:bg-[var(--color-neo-lime)] selection:text-black">
      {/* Header Marquee */}
      <div className="w-full bg-[var(--color-neo-lime)] border-b-[3px] border-[#111111] flex items-center justify-between h-12 shadow-[0_4px_0_rgba(0,0,0,0.1)]">
        <div className="flex-1 overflow-hidden whitespace-nowrap flex items-center h-full">
           <div className="animate-marquee flex w-max pt-1 font-bold uppercase tracking-widest text-sm">
             <div className="flex-shrink-0 px-2">
               TRACK SMART ★ SPEND WISELY ★ BUILD WEALTH ★ LIVE FREELY ★ TRACK SMART ★ SPEND WISELY ★ BUILD WEALTH ★ LIVE FREELY ★ TRACK SMART ★ SPEND WISELY ★ BUILD WEALTH ★ LIVE FREELY ★ TRACK SMART ★ SPEND WISELY ★ BUILD WEALTH ★ LIVE FREELY ★ TRACK SMART ★ SPEND WISELY ★ BUILD WEALTH ★ LIVE FREELY ★ 
             </div>
             <div className="flex-shrink-0 px-2">
               TRACK SMART ★ SPEND WISELY ★ BUILD WEALTH ★ LIVE FREELY ★ TRACK SMART ★ SPEND WISELY ★ BUILD WEALTH ★ LIVE FREELY ★ TRACK SMART ★ SPEND WISELY ★ BUILD WEALTH ★ LIVE FREELY ★ TRACK SMART ★ SPEND WISELY ★ BUILD WEALTH ★ LIVE FREELY ★ TRACK SMART ★ SPEND WISELY ★ BUILD WEALTH ★ LIVE FREELY ★ 
             </div>
           </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
        
        {/* Top Row: Branding & Insight */}
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 lg:h-[136px]">
          <header className="bg-[var(--color-neo-lime)] border-neo shadow-neo p-6 shrink-0 w-full lg:w-[360px] xl:w-[380px] flex flex-col justify-between h-full">
            <h1 className="text-3xl font-extrabold uppercase leading-[0.9] tracking-tight">
              Finance Tracker
            </h1>
            <p className="font-bold text-xs uppercase mt-auto leading-tight">
              Manage your income & expenses easily.
            </p>
          </header>
          
          <div className="flex-1 h-full">
            <InsightCard transactions={transactions} />
          </div>
        </div>

        <main className="space-y-8">
          <SummaryCards transactions={transactions} />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 -ml-4 lg:-ml-16 xl:-ml-28 -mr-4 lg:-mr-16 xl:-mr-28">
            {/* Left Column: Form (3 cols) */}
            <div className="lg:col-span-3 space-y-6">
              <TransactionForm 
                onSubmit={handleFormSubmit} 
                initialData={editingTransaction} 
                onCancelEdit={() => setEditingTransaction(null)} 
              />
            </div>
            
            {/* Center Column: Filters & Table (6 cols) */}
            <div className="lg:col-span-6 xl:col-span-7 flex flex-col h-full space-y-6">
              <CategoryFilter
                filters={filters}
                onFilterChange={setFilters}
              />
              <div className="flex-1">
                <TransactionTable 
                  transactions={filteredTransactions} 
                  onDelete={confirmDelete} 
                  onEdit={setEditingTransaction}
                />
              </div>
            </div>

            {/* Right Column: Chart (3 cols) */}
            <div className="lg:col-span-3 xl:col-span-2 space-y-6">
              <SpendingChart transactions={transactions} />
            </div>
          </div>
        </main>
      </div>

      <ConfirmModal 
        isOpen={!!transactionToDelete}
        title="DELETE TRANSACTION?"
        message="Are you sure you want to delete this transaction? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setTransactionToDelete(null)}
      />

      <Toast 
        isVisible={toast.isVisible}
        message={toast.message}
        type={toast.type}
        onClose={hideToast}
      />
    </div>
  );
}

export default App;
