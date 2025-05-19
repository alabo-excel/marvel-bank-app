// types.ts (optional but recommended)
export type Transaction = {
  id: string;
  amount: number;
  type: 'debit' | 'credit';
  description: string;
  date: Date;
  balanceAfter: number;
  receiver: string
};


export const formatBalance = (amount: number) => {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};