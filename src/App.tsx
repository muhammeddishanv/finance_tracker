import { useState, useEffect, useMemo } from 'react';
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
import { calculateSummary } from './utils/calculateSummary';
import { generateInsight } from './utils/generateInsight';
import { formatCurrency } from './utils/formatCurrency';
import { 
  LayoutDashboard, 
  ReceiptText, 
  PieChart, 
  Plus, 
  X, 
  ArrowUpRight, 
  ArrowDownRight, 
  Wallet, 
  TrendingUp,
  ChevronRight,
  Briefcase,
  DollarSign,
  Film,
  Plane,
  Utensils,
  ShoppingBag,
  FileText,
  Activity,
  GraduationCap,
  HelpCircle
} from 'lucide-react';


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
  
  // Mobile UI States
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'transactions' | 'analytics'>('dashboard');
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Custom Toast Hook
  const { toast, showToast, hideToast } = useToast();

  // Custom Filtering Hook
  const filteredTransactions = useTransactionFilters(transactions, filters);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Scroll to top when changing tabs in mobile view
  useEffect(() => {
    if (isMobile) {
      window.scrollTo(0, 0);
    }
  }, [activeTab, isMobile]);

  // Reset filters when navigating between tabs
  useEffect(() => {
    setFilters({
      type: 'all',
      category: 'All',
      startDate: '',
      endDate: ''
    });
  }, [activeTab]);

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

  const handleEditMobile = (t: Transaction) => {
    setEditingTransaction(t);
    setIsFormOpen(true);
  };

  const summary = useMemo(() => calculateSummary(transactions), [transactions]);

  // Render Mobile Layout
  if (isMobile) {
    // Helper to get category icons/colors for transaction lists
    const getCategoryMobileStyles = (category: string) => {
      switch (category) {
        case 'Freelance':
          return { icon: Briefcase, color: 'bg-[var(--color-neo-income)]' };
        case 'Business':
          return { icon: TrendingUp, color: 'bg-[var(--color-neo-lime)]' };
        case 'Salary':
        case 'Other Income':
          return { icon: DollarSign, color: 'bg-emerald-300' };
        case 'Entertainment':
          return { icon: Film, color: 'bg-[var(--color-neo-purple)]' };
        case 'Travel':
          return { icon: Plane, color: 'bg-[var(--color-neo-income)]' };
        case 'Food':
          return { icon: Utensils, color: 'bg-[var(--color-neo-warning)]' };
        case 'Shopping':
          return { icon: ShoppingBag, color: 'bg-[var(--color-neo-expense)]' };
        case 'Bills':
          return { icon: FileText, color: 'bg-blue-300' };
        case 'Health':
          return { icon: Activity, color: 'bg-pink-300' };
        case 'Education':
          return { icon: GraduationCap, color: 'bg-orange-300' };
        default:
          return { icon: HelpCircle, color: 'bg-slate-300' };
      }
    };

    return (
      <div className="min-h-screen pb-28 bg-[var(--color-neo-bg)] text-[var(--color-neo-black)] selection:bg-[var(--color-neo-lime)] selection:text-black font-sans">
        
        {/* 1. Header */}
        <header className="bg-white border-b-[3px] border-[#111111] px-4 py-3 flex items-center justify-center sticky top-0 z-50">
          <h1 className="text-xl font-black uppercase tracking-tight text-[#111111]">
            Finance Tracker
          </h1>
        </header>

        {/* Tab Contents */}
        <main className="p-4 space-y-5 pb-8">
          {activeTab === 'dashboard' && (
            <>
              {/* 2. Net Balance Top Card */}
              <div className="bg-[var(--color-neo-lime)] border-[3px] border-[#111111] shadow-[4px_4px_0px_#111111] rounded-[20px] p-5 relative overflow-hidden flex justify-between items-center min-h-[140px]">
                <div className="space-y-1 z-10 flex-1 min-w-0 pr-4">
                  <span className="text-[11px] font-black uppercase text-slate-800 tracking-wider">Net Balance</span>
                  <div className="text-3xl font-black text-[#111111] tracking-tight">
                    {formatCurrency(summary.netBalance)}
                  </div>
                  <div className="flex items-center gap-1.5 mt-2 bg-white border border-[#111111] rounded-[14px] py-1.5 px-3 w-fit">
                    <span className="w-5 h-5 rounded-full bg-white flex items-center justify-center border border-[#111111] shrink-0 shadow-[1px_1px_0px_#111111]">
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#111111]" strokeWidth={3} />
                    </span>
                    <span className="text-[10px] font-bold text-slate-900 uppercase leading-[1.2] max-w-[170px]">
                      {generateInsight(transactions)}
                    </span>
                  </div>
                </div>

                {/* SVG Wallet Illustration */}
                <div className="z-10 shrink-0">
                  <svg width="76" height="72" viewBox="0 0 100 90" fill="none" className="drop-shadow-[3px_3px_0px_rgba(0,0,0,1)]">
                    {/* Sparkle stars */}
                    <path d="M 58 10 L 58 16 M 55 13 L 61 13" stroke="#111111" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M 92 28 L 92 34 M 89 31 L 95 31" stroke="#111111" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M 60 44 L 60 50 M 57 47 L 63 47" stroke="#111111" strokeWidth="2.5" strokeLinecap="round" />

                    {/* Coins */}
                    <circle cx="80" cy="18" r="9" fill="#FFE87A" stroke="#111111" strokeWidth="2.5" />
                    <text x="80" y="21.5" fontFamily="Space Grotesk" fontSize="11" fontWeight="900" textAnchor="middle" fill="#111111">₹</text>
                    
                    <circle cx="70" cy="28" r="8" fill="#FFE87A" stroke="#111111" strokeWidth="2.5" />
                    <text x="70" y="31.5" fontFamily="Space Grotesk" fontSize="10" fontWeight="900" textAnchor="middle" fill="#111111">₹</text>
                    
                    {/* Wallet Body */}
                    <path d="M 12 42 C 12 37, 16 35, 22 35 L 78 35 C 84 35, 88 37, 88 42 L 88 78 C 88 83, 84 85, 78 85 L 22 85 C 16 85, 12 83, 12 78 Z" fill="#D9FF6A" stroke="#111111" strokeWidth="3" />
                    {/* Wallet Stitching */}
                    <path d="M 20 45 L 80 45" stroke="#111111" strokeWidth="2.5" strokeDasharray="3 3" />
                    {/* Wallet Flap */}
                    <path d="M 50 42 L 82 42 C 85 42, 88 44, 88 48 L 88 65 C 88 69, 85 71, 82 71 L 50 71 Z" fill="#B5E434" stroke="#111111" strokeWidth="3" />
                    {/* Wallet Button */}
                    <circle cx="64" cy="56.5" r="4" fill="#FFE87A" stroke="#111111" strokeWidth="2.5" />
                  </svg>
                </div>
              </div>

              {/* 3. 2x2 Grid KPI Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white border-[3px] border-[#111111] shadow-[4px_4px_0px_#111111] rounded-[20px] p-3 flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full border-[2px] border-[#111111] bg-[var(--color-neo-income)] flex items-center justify-center shrink-0">
                    <ArrowUpRight className="w-5 h-5 text-[#111111]" strokeWidth={3} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block truncate">Total Income</span>
                    <div className="text-sm font-black text-[#111111] leading-tight">{formatCurrency(summary.totalIncome)}</div>
                  </div>
                </div>

                <div className="bg-white border-[3px] border-[#111111] shadow-[4px_4px_0px_#111111] rounded-[20px] p-3 flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full border-[2px] border-[#111111] bg-[var(--color-neo-expense)] flex items-center justify-center shrink-0">
                    <ArrowDownRight className="w-5 h-5 text-[#111111]" strokeWidth={3} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block truncate">Total Expense</span>
                    <div className="text-sm font-black text-[#111111] leading-tight">{formatCurrency(summary.totalExpense)}</div>
                  </div>
                </div>

                <div className="bg-white border-[3px] border-[#111111] shadow-[4px_4px_0px_#111111] rounded-[20px] p-3 flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full border-[2px] border-[#111111] bg-[var(--color-neo-warning)] flex items-center justify-center shrink-0">
                    <Wallet className="w-5 h-5 text-[#111111]" strokeWidth={3} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block truncate">Net Balance</span>
                    <div className="text-sm font-black text-[#111111] leading-tight">{formatCurrency(summary.netBalance)}</div>
                  </div>
                </div>

                <div className="bg-white border-[3px] border-[#111111] shadow-[4px_4px_0px_#111111] rounded-[20px] p-3 flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full border-[2px] border-[#111111] bg-[var(--color-neo-purple)] flex items-center justify-center shrink-0">
                    <TrendingUp className="w-5 h-5 text-[#111111]" strokeWidth={3} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block truncate">Top Spending</span>
                    <div className="text-sm font-black text-[#111111] leading-tight uppercase">{summary.topCategory}</div>
                  </div>
                </div>
              </div>

              {/* 4. Donut Chart (Expenses by Category) */}
              <SpendingChart transactions={transactions} onViewAll={() => setActiveTab('analytics')} />

              {/* 5. Recent Transactions Card */}
              <div className="bg-white border-[3px] border-[#111111] shadow-[4px_4px_0px_#111111] rounded-[20px] p-5">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-black text-[#111111] uppercase tracking-wide">Recent Transactions</h3>
                  <button 
                    onClick={() => setActiveTab('transactions')}
                    className="text-xs font-bold uppercase text-emerald-600 flex items-center gap-0.5 hover:underline"
                  >
                    View All <span className="text-[10px]">▶</span>
                  </button>
                </div>

                <div className="divide-y-[2px] divide-[#111111]/10">
                  {transactions.slice(0, 3).map((t) => {
                    const style = getCategoryMobileStyles(t.category);
                    const Icon = style.icon;
                    return (
                      <div key={t.id} className="py-3.5 flex items-center justify-between gap-3 first:pt-0 last:pb-0">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className={`w-10 h-10 border-[2px] border-[#111111] ${style.color} rounded-xl flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#111111]`}>
                            <Icon className="w-5 h-5 text-[#111111]" strokeWidth={2.5} />
                          </div>
                          <div className="min-w-0">
                            <div className="font-black text-xs text-[#111111] uppercase truncate">{t.category}</div>
                            <div className="text-[10px] font-bold text-slate-500 uppercase mt-0.5">
                              {new Date(t.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).toUpperCase()} • {t.type}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <div className={`font-black text-xs ${t.type === 'income' ? 'text-emerald-600' : 'text-rose-600'}`}>
                            {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-400" />
                        </div>
                      </div>
                    );
                  })}
                  {transactions.length === 0 && (
                    <div className="py-6 text-center font-bold uppercase text-xs text-slate-500">
                      No Transactions Yet
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {activeTab === 'transactions' && (
            <div className="space-y-4 relative">
              <div className="sticky top-[53px] z-40 bg-[var(--color-neo-bg)] pt-4 pb-6 -mx-4 px-4 -mt-4">
                <CategoryFilter filters={filters} onFilterChange={setFilters} />
              </div>
              
              <div className="bg-white border-[3px] border-[#111111] shadow-[4px_4px_0px_#111111] rounded-[20px] p-5">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-black text-[#111111] uppercase tracking-wide">
                    Filtered ({filteredTransactions.length})
                  </h3>
                </div>

                <div className="divide-y-[2px] divide-[#111111]/10">
                  {filteredTransactions.map((t) => {
                    const style = getCategoryMobileStyles(t.category);
                    const Icon = style.icon;
                    return (
                      <div key={t.id} className="py-3.5 flex items-center justify-between gap-3 first:pt-0 last:pb-0">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className={`w-10 h-10 border-[2px] border-[#111111] ${style.color} rounded-xl flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#111111]`}>
                            <Icon className="w-5 h-5 text-[#111111]" strokeWidth={2.5} />
                          </div>
                          <div className="min-w-0">
                            <div className="font-black text-xs text-[#111111] uppercase truncate">{t.category}</div>
                            <div className="text-[10px] font-bold text-slate-500 uppercase mt-0.5">
                              {new Date(t.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).toUpperCase()} • {t.type}
                            </div>
                            {t.note && <div className="text-[10px] text-slate-600 truncate max-w-[150px] italic mt-0.5">{t.note}</div>}
                          </div>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <div className={`font-black text-xs ${t.type === 'income' ? 'text-emerald-600' : 'text-rose-600'}`}>
                            {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                          </div>
                          <div className="flex gap-1.5">
                            <button onClick={() => handleEditMobile(t)} className="bg-white border-[2px] border-[#111111] p-1 shadow-[2px_2px_0px_#111111] rounded-lg">✏️</button>
                            <button onClick={() => confirmDelete(t.id)} className="bg-[var(--color-neo-expense)] border-[2px] border-[#111111] p-1 shadow-[2px_2px_0px_#111111] rounded-lg">🗑️</button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {filteredTransactions.length === 0 && (
                    <div className="py-6 text-center font-bold uppercase text-xs text-slate-500">
                      No Matching Transactions
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-4">
              <SpendingChart transactions={transactions} />
            </div>
          )}

        </main>

        {/* 6. Add Transaction FAB */}
        {activeTab === 'dashboard' && (
          <button
            onClick={() => {
              setEditingTransaction(null);
              setIsFormOpen(true);
            }}
            className="fixed bottom-24 right-5 z-40 w-14 h-14 bg-[var(--color-neo-lime)] border-[3px] border-[#111111] shadow-[4px_4px_0px_#111111] rounded-full flex items-center justify-center hover:translate-y-[-2px] active:translate-y-0 transition-transform cursor-pointer"
          >
            <Plus className="w-8 h-8 text-[#111111]" strokeWidth={3.5} />
          </button>
        )}

        {/* Bottom Sheet overlay */}
        {isFormOpen && (
          <div className="fixed inset-0 z-50 flex items-end justify-center animate-fade-in">
            <div 
              className="absolute inset-0 bg-[#111111]/70 backdrop-blur-sm"
              onClick={() => {
                setIsFormOpen(false);
                setEditingTransaction(null);
              }}
            />
            <div className="relative w-full max-h-[85vh] bg-white border-t-[4px] border-[#111111] p-5 overflow-y-auto animate-slide-up z-50 rounded-t-[24px]">
              <div className="flex justify-between items-center mb-4">
                <div className="text-[10px] font-black uppercase bg-[var(--color-neo-lime)] border-[2px] border-[#111111] px-2 py-1 rounded-md">
                  {editingTransaction ? 'Edit Transaction' : 'New Transaction'}
                </div>
                <button 
                  onClick={() => {
                    setIsFormOpen(false);
                    setEditingTransaction(null);
                  }}
                  className="border-[2px] border-[#111111] p-1 bg-white hover:bg-slate-100 rounded-lg"
                >
                  <X className="w-4 h-4 text-[#111111]" strokeWidth={3} />
                </button>
              </div>
              <TransactionForm 
                key={editingTransaction?.id || 'new_mobile'}
                onSubmit={(data) => {
                  handleFormSubmit(data);
                  setIsFormOpen(false);
                }}
                initialData={editingTransaction}
                onCancelEdit={() => {
                  setIsFormOpen(false);
                  setEditingTransaction(null);
                }}
              />
            </div>
          </div>
        )}

        {/* 7. Bottom Navigation Bar */}
        <nav className="fixed bottom-0 left-0 right-0 h-20 bg-white border-t-[3px] border-[#111111] z-40 flex items-center justify-around px-2 pb-2">
          <button 
            onClick={() => setActiveTab('dashboard')} 
            className={`flex flex-col items-center justify-center h-14 px-4 transition-all rounded-[14px] ${
              activeTab === 'dashboard' 
                ? 'bg-[var(--color-neo-lime)] border-[2.5px] border-[#111111] shadow-[2.5px_2.5px_0px_#111111] text-[#111111]' 
                : 'text-slate-500 border-[2.5px] border-transparent'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" strokeWidth={activeTab === 'dashboard' ? 3 : 2.5} />
            <span className="text-[9px] font-black uppercase mt-1 tracking-wider">Dashboard</span>
          </button>

          <button 
            onClick={() => setActiveTab('transactions')} 
            className={`flex flex-col items-center justify-center h-14 px-4 transition-all rounded-[14px] ${
              activeTab === 'transactions' 
                ? 'bg-[var(--color-neo-lime)] border-[2.5px] border-[#111111] shadow-[2.5px_2.5px_0px_#111111] text-[#111111]' 
                : 'text-slate-500 border-[2.5px] border-transparent'
            }`}
          >
            <ReceiptText className="w-5 h-5" strokeWidth={activeTab === 'transactions' ? 3 : 2.5} />
            <span className="text-[9px] font-black uppercase mt-1 tracking-wider">Transactions</span>
          </button>

          <button 
            onClick={() => setActiveTab('analytics')} 
            className={`flex flex-col items-center justify-center h-14 px-4 transition-all rounded-[14px] ${
              activeTab === 'analytics' 
                ? 'bg-[var(--color-neo-lime)] border-[2.5px] border-[#111111] shadow-[2.5px_2.5px_0px_#111111] text-[#111111]' 
                : 'text-slate-500 border-[2.5px] border-transparent'
            }`}
          >
            <PieChart className="w-5 h-5" strokeWidth={activeTab === 'analytics' ? 3 : 2.5} />
            <span className="text-[9px] font-black uppercase mt-1 tracking-wider">Analytics</span>
          </button>

        </nav>

        {/* Global Modals/Toasts */}
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

  // Render original unaltered Desktop/Tablet Layout
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
                key={editingTransaction?.id || 'new_desktop'}
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
