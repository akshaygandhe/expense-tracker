import { useState, useEffect } from "react"
import type { NewTransaction, Transaction, TransactionType } from "../types/expense";

interface ExpenseFormProps {
    onAdd: (transaction: NewTransaction) => void;
    onUpdate: (transaction: Transaction) => void;
    transactionToEdit?: Transaction;
}

export function ExpenseForm({ onAdd, onUpdate, transactionToEdit }: ExpenseFormProps) {
    const [title, setTitle] = useState<string>("");
    const [amount, setAmount] = useState<number>(0);
    const [type, setType] = useState<TransactionType>("expense");
    const [category, setCategory] = useState<string>("");
    const [expenseDate, setExpenseDate] = useState<string>("");

    useEffect(() => {
        if (transactionToEdit) {
            setTitle(transactionToEdit.title);
            setAmount(transactionToEdit.amount);
            setType(transactionToEdit.type);
            setCategory(transactionToEdit.category);
            setExpenseDate(transactionToEdit.date);
        } else {
            setTitle("");
            setAmount(0);
            setType("expense");
            setCategory("");
            setExpenseDate("");
        }
    }, [transactionToEdit])

    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

        if (title.trim() === "") {
            console.log("Title is required");
            return;
        }
        if (amount <= 0) {
            console.log("Amount must be greater than zero");
            return;
        }
        if (category === "") {
            console.log("Category is required");
            return;
        }
        if (expenseDate === "") {
            console.log("Expense date is required");
            return;
        }

        if (transactionToEdit) {
            onUpdate({
                ...transactionToEdit,
                title: title.trim(),
                amount,
                type,
                category,
                date: expenseDate,
            });
        } else {
            onAdd({
                title: title.trim(),
                amount,
                type,
                category,
                date: expenseDate
            })

            setTitle("");
            setAmount(0);
            setType("expense");
            setCategory("");
            setExpenseDate("");
        }
    }

    return (
        <form className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6" onSubmit={handleSubmit}>
            <div className="mb-6">
                <h2 className="text-lg font-semibold text-slate-900">
                    {transactionToEdit ? "Edit Transaction" : "Add Transaction"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    {transactionToEdit
                        ? "Update the details of this transaction."
                        : "Add your income or expense to keep your finances organized."}
                </p>
            </div>

            {/* Responsive grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                {/* Title - Full width */}
                <div className="sm:col-span-2">
                    <label
                        htmlFor="expense-title"
                        className="mb-2 block text-sm font-medium text-slate-700"
                    >
                        Title
                    </label>

                    <input
                        type="text"
                        name="expense-title"
                        id="expense-title"
                        placeholder="e.g. Grocery shopping"
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                        value={title}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                    />
                </div>

                {/* Amount */}
                <div>
                    <label
                        htmlFor="expense-amount"
                        className="mb-2 block text-sm font-medium text-slate-700"
                    >
                        Amount
                    </label>

                    <input
                        type="number"
                        name="expense-amount"
                        id="expense-amount"
                        placeholder="0.00"
                        min="0"
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                        value={amount}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(Number(e.target.value) || 0)}
                    />
                </div>

                {/* Type */}
                <div>
                    <label
                        htmlFor="expense-type"
                        className="mb-2 block text-sm font-medium text-slate-700"
                    >
                        Type
                    </label>

                    <select
                        name="expense-type"
                        id="expense-type"
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                        value={type}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setType(e.target.value as TransactionType)}
                    >
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                </div>

                {/* Category */}
                <div>
                    <label
                        htmlFor="expense-category"
                        className="mb-2 block text-sm font-medium text-slate-700"
                    >
                        Category
                    </label>

                    <select
                        name="expense-category"
                        id="expense-category"
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                        value={category}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value)}
                    >
                        <option value="">Select category</option>
                        <option value="food">Food</option>
                        <option value="travel">Travel</option>
                        <option value="shopping">Shopping</option>
                        <option value="bills">Bills</option>
                        <option value="salary">Salary</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                {/* Date */}
                <div>
                    <label
                        htmlFor="expense-date"
                        className="mb-2 block text-sm font-medium text-slate-700"
                    >
                        Date
                    </label>

                    <input
                        type="date"
                        name="expense-date"
                        id="expense-date"
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                        value={expenseDate}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setExpenseDate(e.target.value)}
                    />
                </div>
            </div>

            {/* Submit button */}
            <div className="mt-6 flex justify-end">
                <button
                    type="submit"
                    className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                >
                    {transactionToEdit ? "Save Transaction" : "Add Transaction"}
                </button>
            </div>
        </form>
    )
}