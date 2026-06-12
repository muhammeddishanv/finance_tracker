import { INCOME_CATEGORIES, EXPENSE_CATEGORIES } from '../../constants/categories';

import type { TransactionFilters } from '../../types/transaction';

interface CategoryFilterProps {
  filters: TransactionFilters;
  onFilterChange: (filters: TransactionFilters) => void;
}

export function CategoryFilter({
  filters,
  onFilterChange
}: CategoryFilterProps) {
  const { type: selectedType, category: selectedCategory, startDate = '', endDate = '' } = filters;

  const categories =
    selectedType === 'income' ? INCOME_CATEGORIES :
    selectedType === 'expense' ? EXPENSE_CATEGORIES :
    [...INCOME_CATEGORIES, ...EXPENSE_CATEGORIES];

  return (
    <div className="bg-[var(--color-neo-warning)] p-4 border-neo shadow-neo mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Type Filter */}
      <div>
        <label className="block text-xs font-bold uppercase mb-1">
          Transaction Type
        </label>
        <select
          value={selectedType}
          onChange={(e) => {
            onFilterChange({
              ...filters,
              type: e.target.value,
              category: 'All' // Reset category when type changes
            });
          }}
          className="w-full h-10 border-neo bg-white px-3 font-bold uppercase text-xs focus:outline-none focus:shadow-neo-sm transition-shadow cursor-pointer rounded-none"
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>
      
      {/* Category Filter */}
      <div>
        <label className="block text-xs font-bold uppercase mb-1">
          Category
        </label>
        <select
          value={selectedCategory}
          onChange={(e) => {
            onFilterChange({
              ...filters,
              category: e.target.value
            });
          }}
          className="w-full h-10 border-neo bg-white px-3 font-bold uppercase text-xs focus:outline-none focus:shadow-neo-sm transition-shadow cursor-pointer rounded-none"
        >
          <option value="All">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Date Range Filters */}
      <div>
        <label className="block text-xs font-bold uppercase mb-1">
          From Date
        </label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => {
            onFilterChange({
              ...filters,
              startDate: e.target.value
            });
          }}
          className="w-full h-10 border-neo bg-white px-3 font-bold uppercase text-xs focus:outline-none focus:shadow-neo-sm transition-shadow rounded-none"
        />
      </div>
      <div>
        <label className="block text-xs font-bold uppercase mb-1">
          To Date
        </label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => {
            onFilterChange({
              ...filters,
              endDate: e.target.value
            });
          }}
          className="w-full h-10 border-neo bg-white px-3 font-bold uppercase text-xs focus:outline-none focus:shadow-neo-sm transition-shadow rounded-none"
        />
      </div>
    </div>
  );
}
