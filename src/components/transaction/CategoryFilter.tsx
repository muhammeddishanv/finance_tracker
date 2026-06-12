import React from 'react';
import { INCOME_CATEGORIES, EXPENSE_CATEGORIES } from '../../constants/categories';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedType: string; // 'all' | 'income' | 'expense'
  onTypeChange: (type: string) => void;
  startDate?: string;
  onStartDateChange?: (date: string) => void;
  endDate?: string;
  onEndDateChange?: (date: string) => void;
}

export function CategoryFilter({
  selectedCategory,
  onCategoryChange,
  selectedType,
  onTypeChange,
  startDate = '',
  onStartDateChange,
  endDate = '',
  onEndDateChange
}: CategoryFilterProps) {
  // Dynamically determine which categories to show based on the selected type
  const categories =
    selectedType === 'income' ? INCOME_CATEGORIES :
    selectedType === 'expense' ? EXPENSE_CATEGORIES :
    [...INCOME_CATEGORIES, ...EXPENSE_CATEGORIES];

  return (
    <div className="bg-white p-4 md:p-5 rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] mb-6 flex flex-col lg:flex-row gap-4">
      {/* Type Filter */}
      <div className="flex-1">
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
          Transaction Type
        </label>
        <select
          value={selectedType}
          onChange={(e) => {
            onTypeChange(e.target.value);
            onCategoryChange('All'); // Reset category when type changes
          }}
          className="w-full rounded-xl border-slate-200 border bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-700 focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all cursor-pointer"
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>
      
      {/* Category Filter */}
      <div className="flex-1">
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
          Category
        </label>
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full rounded-xl border-slate-200 border bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-700 focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all cursor-pointer"
        >
          <option value="All">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Date Range Filters (Optional logic) */}
      {onStartDateChange && onEndDateChange && (
        <div className="flex-1 flex gap-3">
          <div className="flex-1">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              From Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => onStartDateChange(e.target.value)}
              className="w-full rounded-xl border-slate-200 border bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-700 focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all cursor-pointer"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              To Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => onEndDateChange(e.target.value)}
              className="w-full rounded-xl border-slate-200 border bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-700 focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all cursor-pointer"
            />
          </div>
        </div>
      )}
    </div>
  );
}
