  import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
  import {db,authApp} from "../Config/fireStore";
  import {auth, Expense} from "@/utils/types";
  import {createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword} from 'firebase/auth'


   const expensesCol = collection(db, "Expenses"); 
  export const addData = async ({name,icon,type,value,createdAt,index}:Expense) =>{
     try {
          await addDoc(expensesCol, {
            name: name,
            icon: icon,
            currency: '$',
            type: type,
            value: value,
            createdAt: createdAt,
            index:index
          });
          } catch (error) {
      console.log("Error adding document: ", error);
    }
  }

  export const getData = async () =>{
     try {
   
    const expensesSnapshot = await getDocs(expensesCol);
    const expensesList = expensesSnapshot.docs.map(doc => ({
      ...doc.data() as Expense,
        id:doc.id

    }));

    return expensesList;

    } catch (error) {
    console.log("Error getting documents: ", error);
  }
  }

  export const getDataById = async (id:string) =>{
     try {
          const expensesColId = doc(db, "Expenses",id); 
          const expensesSnapshot = await getDoc(expensesColId);
          
    return expensesSnapshot.data() as Expense;

    } catch (error) {
    console.log("Error getting documents: ", error);
  }
  }

  export const deleteData = async (id:string) =>{
    try{
      const expensesColId = doc(db, "Expenses",id); 
      await deleteDoc(expensesColId)
    }catch (error) {
    console.log("Error getting documents: ", error);
  }
  }

  export const updateData = async (id:string,expense:Expense) =>{

    try{
      const expensesCol = doc(db, "Expenses",id); 
    await updateDoc(expensesCol,expense);
    }catch(error){
      console.log("Error getting documents: ", error)
    }
  }

  export const signUp = async (obj:auth) =>{
   try{
      const userCredential  = await createUserWithEmailAndPassword(authApp,obj.email,obj.password);
     const user = userCredential.user;
     return user;
   }catch(error){
    console.log("Signup error:", error);
   }
  }

  
  export const signIn = async (obj:auth) =>{
   try{
      const userCredential  = await signInWithEmailAndPassword(authApp,obj.email,obj.password);
     const user = userCredential.user;
     return user;
   }catch(error){
    console.log(error);
   }
  }

  export const addUserInfo = async (email:string,userName:string) =>
  {
    try{
       const userRef = collection(db,"UserInfo");

    const user = await addDoc(userRef,{email:email,userName:userName});
    return user;
    }catch(error){
      console.log('faild adding user info',error);
      
    }

  }

  export const getUserInfo = async (email:string) =>
  {
    try{
       const userRef = doc(db,"UserInfo",email);

       console.log(userRef);
       

    const user = await getDoc(userRef);
    return user;
    }catch(error){
      console.log('faild loading user info',error);
      
    }

  }

  export const resetPassword = async (email:string) =>{

    try {
    await sendPasswordResetEmail(authApp, email);
    console.log("Password reset email sent!");
    return true;
  } catch (error) {
    console.error("Error sending password reset email:", error);
    return false;
  }
};

