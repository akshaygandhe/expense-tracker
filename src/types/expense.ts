export type TransactionType = "income" | "expense"

export type FilterTransactionType = "income" | "expense" | "all"

export interface Transaction {
    id: number;
    title: string;
    amount: number;
    type: TransactionType;
    category: string;
    date: string;
}

export type NewTransaction = Omit<Transaction, "id">

