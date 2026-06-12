# Personal Finance Tracker

A modern, responsive, and intuitive web application designed to help you manage your personal finances with ease. Track your income, monitor your expenses, and gain valuable insights into your spending habits through a sleek, fintech-inspired dashboard.

## 🚀 Features

- **Transaction Management (CRUD)**
  - Easily add, view, edit, and delete income and expense transactions.
- **Dynamic Dashboard & Insights**
  - Instant visibility into **Total Income**, **Total Expense**, **Net Balance**, and **Top Spending Category**.
  - Intelligent, rule-based financial insights.
- **Visual Analytics**
  - Interactive charts illustrating your spending habits categorized by expense types.
- **Advanced Filtering**
  - Quickly filter transactions by specific categories.
- **Local Storage Persistence**
  - Data is securely saved to your browser's local storage—no database required to get started.
- **Modern UI/UX**
  - Soft shadows, rounded cards, currency formatting, toast notifications, and responsive mobile-first design.

## 🛠️ Tech Stack

- **Framework:** React + Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS (v4)
- **Data Visualization:** Recharts
- **State Management:** Custom React Hooks

## 📂 Project Structure

- `src/components`: UI components organized by feature (dashboard, transaction, ui).
- `src/hooks`: Custom React hooks for business logic (e.g., `useTransactions`).
- `src/services`: Service layers for external interactions (e.g., Local Storage).
- `src/utils`: Helper functions for summaries, formatting, and generating insights.
- `src/types`: TypeScript interfaces and type definitions.

## 🏃‍♂️ Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Install the dependencies:
   ```bash
   npm install
   ```

### Running the Application

To start the development server, run:
```bash
npm run dev
```

Open your browser and navigate to the local URL provided in your terminal (typically `http://localhost:5173`) to view the application.

## 📝 License

This project is licensed under the MIT License.
