import { atom } from 'jotai'
import { Transaction } from '../utils/data';

export const isFirstTime = atom(true)
export const balanceAtom = atom(20000)
export const transactionsAtom = atom<Transaction[]>([]);


