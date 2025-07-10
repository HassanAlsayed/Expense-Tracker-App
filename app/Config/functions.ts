  import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
  import db from "../Config/fireStore";
  import {Expense} from "@/utils/types";

  export const addData = async ({name,icon,type,value,createdAt}:Expense) =>{
     try {
          await addDoc(collection(db, "Expenses"), {
            name: name,
            icon: icon,
            currency: '$',
            type: type,
            value: Number(value),
            createdAt: createdAt
          });
          } catch (error) {
      console.error("Error adding document: ", error);
    }
  }

  export const getData = async () =>{
     try {
    const expensesCol = collection(db, "Expenses"); 
    const expensesSnapshot = await getDocs(expensesCol);
    
    const expensesList = expensesSnapshot.docs.map(doc => ({
      ...doc.data() as Expense,
        id:doc.id

    }));

    return expensesList;

    } catch (error) {
    console.error("Error getting documents: ", error);
  }
  }

  export const deleteData = async (id:string) =>{
    try{
      const expensesCol = doc(db, "Expenses",id); 
      await deleteDoc(expensesCol)
    }catch (error) {
    console.error("Error getting documents: ", error);
  }
    
  }
