import { useState, useEffect } from 'react'
import './App.css'
import { ExpenseForm } from './components/ExpenseForm'
import type { Transaction, NewTransaction, FilterTransactionType } from './types/expense'
import { ExpenseList } from './components/ExpenseList'
import { ExpenseSummary } from './components/ExpenseSummary'


function App() {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const storedTransactions = localStorage.getItem("transactions")

    return storedTransactions ? JSON.parse(storedTransactions) : []
  })

  const [filter, setFilter] = useState<FilterTransactionType>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [search, setSearch] = useState<string>("");
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions))
  }, [transactions])

  function handleAddTransaction(transaction: NewTransaction) {
    const newTransaction: Transaction = {
      id: Date.now(),
      ...transaction
    }

    setTransactions((prevTransactions) =>
      [
        newTransaction,
        ...prevTransactions
      ]
    )
  }

  function handleDeleteTransaction(id: number) {
    setTransactions((prevTransactions) =>
      prevTransactions.filter((transaction) =>
        transaction.id !== id
      )
    )
  }

  function handleEditTransaction(id: number) {
    setEditingId(id);
  }

  function handleUpdateTransaction(updatedTransaction: Transaction) {
    setTransactions((prevTransactions) =>
      prevTransactions.map((transaction) =>
        transaction.id === updatedTransaction.id
          ? updatedTransaction
          : transaction
      )
    )
    setEditingId(null);
  }

  const totalIncome = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((accumulator, currValue) => {
      return accumulator + currValue.amount
    }, 0)

  const totalExpense = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((accumulator, currValue) => {
      return accumulator + currValue.amount
    }, 0)

  const balance = totalIncome - totalExpense

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesType =
      filter === "all" || transaction.type === filter;

    const matchesCategory =
      categoryFilter === "all" ||
      transaction.category === categoryFilter;

    const matchesSearch = transaction.title.toLowerCase().includes(search.toLowerCase())

    return matchesType && matchesCategory && matchesSearch
  });

  const filterTypes: FilterTransactionType[] = [
    "all",
    "income",
    "expense"
  ]

  const duplicateCategories = transactions.map((transaction) =>
    transaction.category
  )

  const categories = ["all", ...new Set(duplicateCategories)]

  const transactionToEdit =
    editingId !== null
      ? transactions.find((transaction) => transaction.id === editingId)
      : undefined;


  return (
    <>
      <div className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">

          {/* Header */}
          <header className="mb-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Personal Finance
                </p>

                <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  Expense Tracker
                </h1>

                <p className="mt-2 max-w-2xl text-sm text-slate-500 sm:text-base">
                  Keep track of your income and spending in one simple place.
                </p>
              </div>

              <div className="hidden rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm sm:block">
                {transactions.length}{" "}
                {transactions.length === 1 ? "transaction" : "transactions"}
              </div>
            </div>
          </header>

          {/* Summary */}
          <section className="mb-6">
            <ExpenseSummary
              totalIncome={totalIncome}
              totalExpense={totalExpense}
              balance={balance}
            />
          </section>

          {/* Form */}
          <section className="mb-6">
            <ExpenseForm
              onAdd={handleAddTransaction}
              onUpdate={handleUpdateTransaction}
              transactionToEdit={transactionToEdit}
            />
          </section>

          {/* Filters */}
          <section className="mb-6">

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-5">
                <h2 className="text-lg font-semibold text-slate-900">
                  Transactions
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Search and filter your transactions.
                </p>
              </div>

              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  name="expensesearch"
                  id="expensesearch"
                  placeholder="Search transactions..."
                  value={search}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSearch(e.target.value)
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                />
              </div>

              {/* Type filters */}
              <div className="mt-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Type
                </p>

                <div className="flex flex-wrap gap-2">
                  {filterTypes.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setFilter(item)}
                      className={`rounded-lg px-4 py-2 text-sm font-medium capitalize transition ${filter === item
                        ? "bg-slate-900 text-white shadow-sm"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category filters */}
              <div className="mt-5">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Category
                </p>

                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setCategoryFilter(category)}
                      className={`rounded-lg px-4 py-2 text-sm font-medium capitalize transition ${categoryFilter === category
                        ? "bg-slate-900 text-white shadow-sm"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

            </section>

          </section>

          {/* Transactions */}
          <section>
            <ExpenseList
              transactions={filteredTransactions}
              onDelete={handleDeleteTransaction}
              onEdit={handleEditTransaction}
            />
          </section>
        </div>
      </div>
    </>
  )
}

export default App
