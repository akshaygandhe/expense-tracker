interface ExpenseSummaryProps {
    totalIncome: number;
    totalExpense: number;
    balance: number;
}

export function ExpenseSummary({ totalIncome, totalExpense, balance }: ExpenseSummaryProps) {
    return (
        <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-slate-500">
                            Balance
                        </p>

                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500">
                            Total
                        </span>
                    </div>

                    <p className="mt-4 text-2xl font-bold tracking-tight text-slate-900">
                        ₹{balance.toFixed(2)}
                    </p>
                </div>

                <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-5 shadow-sm transition hover:shadow-md">
                    <p className="text-sm font-medium text-emerald-700">
                        Total Income
                    </p>

                    <p className="mt-4 text-2xl font-bold tracking-tight text-emerald-700">
                        +₹{totalIncome.toFixed(2)}
                    </p>
                </div>

                <div className="rounded-2xl border border-red-100 bg-red-50/70 p-5 shadow-sm transition hover:shadow-md">
                    <p className="text-sm font-medium text-red-700">
                        Total Expenses
                    </p>

                    <p className="mt-4 text-2xl font-bold tracking-tight text-red-700">
                        -₹{totalExpense.toFixed(2)}
                    </p>
                </div>
            </div>
        </>
    )
}
