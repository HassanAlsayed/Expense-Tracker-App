
 type Expense = {
  id:string,
  name: string;
  icon: string;
  currency: string;
  type: string;
  value: number;
  createdAt:string,
  index:number | undefined,
  email:string
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
  setEmail:(email:string) => void,
  email:string,
  setUserName:(userName:string) => void,
  getUserName:string,
  setCurrency:(currency:string) => void
  currency:string,
  imageUrl:string,
  setImage:(imageUrl:string) => void
}

type ModalBlockProps = {
       modalVisible:boolean,
       setModalVisible:(visible:boolean) => void ,
       id:string,
       
    }

  type ModalImageProps = {
       setModalImageVisible:(visible:boolean) => void ,
       modalImageVisible:boolean,
  }

  type ModalEditProps = {
       setModalEditVisible:(visible:boolean) => void ,
       modalEditVisible:boolean,
  }

    type ModalBlockCurrency = {
       modalVisible:boolean,
       setModalVisible:(visible:boolean) => void ,
    }

     type ModalPassProps = {
       modalVisible:boolean,
       setModalVisible:(visible:boolean) => void ,
    }

type transactionTypeProp = {
  key:string,
  title:string,
  amount:number
}

type transactionTypePosition = {
 route:transactionTypeProp,
}

type indexPosProps = {
   indexPos: number | undefined,
   amount:number,
    id:string,
    Name:string,
    Icon:string,
    TypeClicked:string
}

 type handleProps={
    showInput:boolean,
    name:string,
    icon:string,
    type:string,
    index:number,
    amount:number,
    id:string,
    Name:string,
    Icon:string,
    indexPos:number | undefined,
    TypeClicked:string,

}

type auth = {
  email:string,
  password:string
}


export {Expense, FlatListType,StoreState,ModalBlockProps,
  transactionTypePosition,indexPosProps,handleProps,auth,
  ModalBlockCurrency,ModalImageProps,ModalEditProps,ModalPassProps};