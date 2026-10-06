import { useState } from 'react';
import type { Transaction } from '../types/expense';

interface ExpenseItemProps {
    transaction: Transaction;
    onDelete: (id: number) => void;
    onEdit: (id: number) => void;
}

export function ExpenseItem({ transaction, onDelete, onEdit }: ExpenseItemProps) {
    const [showConfirm, setShowConfirm] = useState<boolean>(false);
    return (
        <>
            <div className="flex items-start gap-4">
                {/* Transaction information */}
                <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                        <h3 className="truncate text-base font-semibold text-slate-900">
                            {transaction.title}
                        </h3>

                        <span
                            className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${transaction.type === "income"
                                    ? "bg-emerald-50 text-emerald-700"
                                    : "bg-red-50 text-red-700"
                                }`}
                        >
                            {transaction.type}
                        </span>
                    </div>

                    <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-500">
                        <span className="rounded-lg bg-slate-100 px-2.5 py-1 capitalize">
                            {transaction.category}
                        </span>

                        <span className="text-slate-300">•</span>

                        <span>{transaction.date}</span>
                    </div>
                </div>

                {/* Amount + actions */}
                <div className="flex shrink-0 items-start gap-3">
                    <div className="text-right">
                        <p
                            className={`text-lg font-bold ${transaction.type === "income"
                                    ? "text-emerald-600"
                                    : "text-red-500"
                                }`}
                        >
                            {transaction.type === "income" ? "+" : "-"}₹
                            {transaction.amount.toFixed(2)}
                        </p>
                    </div>

                    {/* Edit */}
                    <button
                        type="button"
                        onClick={() => onEdit(transaction.id)}
                        aria-label={`Edit ${transaction.title}`}
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-5 w-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Z"
                            />
                        </svg>
                    </button>

                    {/* Delete */}
                    <button
                        type="button"
                        onClick={() => setShowConfirm(true)}
                        aria-label={`Delete ${transaction.title}`}
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-5 w-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 7h12M9 7V5h6v2m-7 0 .75 12h6.5L16 7M10 11v5m4-5v5"
                            />
                        </svg>
                    </button>
                </div>
            </div>
            {showConfirm && (
                <div className="mt-4 rounded-xl border border-red-100 bg-red-50 p-4">
                    <div className="flex items-start gap-3">
                        <div className="flex-1">
                            <p className="text-sm font-semibold text-slate-800">
                                Delete this transaction?
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                                This action cannot be undone.
                            </p>
                        </div>
                    </div>

                    <div className="mt-4 flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={() => setShowConfirm(false)}
                            className="rounded-lg bg-white px-3 py-2 text-sm font-medium text-slate-600 shadow-sm transition hover:bg-slate-100"
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            onClick={() => onDelete(transaction.id)}
                            className="rounded-lg bg-red-500 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-red-600"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}
