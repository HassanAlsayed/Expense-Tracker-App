 type Expense = {
  name: string;
  icon: string;
  currency: string;
  type: string;
  value: number;
  createdAt:string
};

type FlatListType = {
  expenses:Expense[],
  setModalVisible:(visible:boolean) => void,

}

export {Expense, FlatListType};