// store.ts
import { getData } from "@/app/Config/functions"
import { create } from 'zustand'
import { StoreState } from "./types"

export const useDataStore = create<StoreState>((set, get) => ({
  expenses: [],
  date: new Date(),
  setDate: (date: Date) => {
    set({ date })
  },

  email:'',
  getUserName:'',
  phoneNumber:'',
  currency:'',

  setCurrency(currency:string)
  {
    set({currency})
  },

  setPhoneNumber(phoneNumber:string)
  {
    set({phoneNumber})
  },


  setUserName(getUserName:string) {
      set({getUserName})
  },

   setEmail: (email: string) => {
    set({ email })
  },

  fetchExpenses: async () => {
    const date = get().date
    const email = get().email;
    
    const month = date.toLocaleString("default", { month: "short" })
    const expensesList = await getData()

    const filteredExpenses = expensesList?.filter(
      (item) => item.createdAt.split(",")[1] === month && item.email === email
    )
    set({ expenses: filteredExpenses || [] })
  },

   sumOfValues: () => {
    const expenses = get().expenses;
  return expenses.reduce(
    (totals, item) => {
      if (item.type === 'expense') {
        totals.expenseSum += item.value;
      } else {
        totals.incomeSum += item.value;
      }
      totals.currency = item.currency;
      return totals;
    },
    { expenseSum: 0, incomeSum: 0, currency: '', totalSum: 0 }
  );
},

}))

