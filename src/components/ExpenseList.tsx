import { ExpenseItem } from './ExpenseItem';
import type { Transaction } from '../types/expense';

interface ExpenseListProps {
  transactions: Transaction[];
  onDelete: (id: number) => void;
  onEdit: (id: number) => void
}

export function ExpenseList({ transactions, onDelete, onEdit }: ExpenseListProps) {

  if (transactions.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
        <h3 className="text-base font-semibold text-slate-900">
          No transactions found
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          Try changing your filters or add a new transaction.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {transactions.map((transaction) => (
        <ExpenseItem
          key={transaction.id}
          transaction={transaction}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  )
}
