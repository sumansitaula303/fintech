import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware';
import { zustandStorage } from './mmkv-strorage';
export interface Transaction{
    id: string,
    amount: number,
    date: Date,
    title: string
}

export interface BalanceState{
    transaction: Array<Transaction>;
    runTransaction: (transaction: Transaction)=> void;
    balance: ()=> number;
    clearTransaction: ()=> void;
}
export const useBalanceStore= create<BalanceState>()(
    persist((set, get)=>({
        transaction: [],
        runTransaction: (transaction: Transaction)=> set((state)=> ({transaction: [...state.transaction, transaction]})),
        balance: () => get().transaction.reduce((acc, t) => acc + t.amount, 0),
        clearTransaction: ()=> {
            set({transaction: []})
        }
    }),
{
    name: 'balance',
    storage: createJSONStorage(()=> zustandStorage)
})
)