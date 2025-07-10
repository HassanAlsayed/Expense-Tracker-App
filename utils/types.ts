 type Expense = {
  id:string,
  name: string;
  icon: string;
  currency: string;
  type: string;
  value: number;
  createdAt:string
};

type FlatListType = {
  expenses:Expense[],
  modalVisible:boolean,
  setModalVisible:(visible:boolean) => void,

}

type StoreState = {
  expenses: Expense[]
  date: Date
  setDate: (date: Date) => void
  fetchExpenses: () => Promise<void>
  sumOfValues:() => {
    expenseSum: number;
    incomeSum: number;
    currency: string;
    totalSum: number;
  }
}

type ModalBlockProps = {
       modalVisible:boolean,
       setModalVisible:(visible:boolean) => void ,
       id:string
    }

export {Expense, FlatListType,StoreState,ModalBlockProps};