  import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
  import {db,authApp} from "../Config/fireStore";
  import {auth, Expense} from "@/utils/types";
  import {createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut} from 'firebase/auth'


   const expensesCol = collection(db, "Expenses"); 
  export const addData = async ({name,icon,type,value,createdAt,index,email}:Expense) =>{
     try {
          await addDoc(expensesCol, {
            name: name,
            icon: icon,
            currency: '$',
            type: type,
            value: value,
            createdAt: createdAt,
            index:index,
            email:email
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

  export const addUserInfo = async (email:string,userName:string,imageUrl:string) =>
  {
    try{
       const userRef = collection(db,"UserInfo");

    const user = await addDoc(userRef,{email:email,userName:userName,imageUrl:''});
    return user;
    }catch(error){
      console.log('faild adding user info',error);
      
    }

  }

export const getUserInfo = async (email: string) => {
  try {
    const usersRef = collection(db, "UserInfo");

    const q = query(usersRef, where("email", "==", email));

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const docSnap = querySnapshot.docs[0];
      return docSnap.data(); 
    } else {
      console.log("No user found with that email.");
      return null;
    }
  } catch (error) {
    console.log("Failed loading user info", error);
    return null;
  }
};

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

export const logOut = async () =>{
  try{
    await signOut(authApp).then(() => {
    console.log("User signed out!");
  })
}catch(error){
  console.error("Error signing out:", error);
}

}

export const getCurrency = async (email:string,currency:string) =>{
   try {
    const usersRef = collection(db, "Expenses");

    const q = query(usersRef, where("email", "==", email));


    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      for (const document of querySnapshot.docs) {
        const docRef = doc(db, "Expenses", document.id);

        await updateDoc(docRef, {
          currency: currency,
        });
    }
  }
  } catch (error) {
    console.log("Failed loading user info", error);
    return null;
  }
}

export const getCurrencyByEmail = async (email: string) => {
  try {
    const usersRef = collection(db, "Expenses");

    const q = query(usersRef, where("email", "==", email));

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const docSnap = querySnapshot.docs[0];
      return docSnap.data().currency;
       
    } else {
      console.log("No user found with that email.");
      return null;
    }
  } catch (error) {
    console.log("Failed loading currency", error);
    return null;
  }
};

export const addImage = async (email: string, imageUrl: string) =>{
  try{
        const usersRef = collection(db, "UserInfo");

    const q = query(usersRef, where("email", "==", email));
     const querySnapshot = await getDocs(q);

      return updateDoc(doc(db,"UserInfo",querySnapshot.docs[0].id),{
        imageUrl:imageUrl
      });

  }catch (error) {
    console.error("Failed add image", error);
}
}

export const removeImage = async (email: string) =>{
     try{
        const usersRef = collection(db, "UserInfo");

    const q = query(usersRef, where("email", "==", email));
     const querySnapshot = await getDocs(q);

      return updateDoc(doc(db,"UserInfo",querySnapshot.docs[0].id),{
        imageUrl:''
      });

  }catch (error) {
    console.error("Failed remove image", error);
}
}

export const updateUserName = async (email:string,newUserName:string) =>{
   try{
        const usersRef = collection(db, "UserInfo");

    const q = query(usersRef, where("email", "==", email));
     const querySnapshot = await getDocs(q);

      return updateDoc(doc(db,"UserInfo",querySnapshot.docs[0].id),{
        userName:newUserName
      });

  }catch (error) {
    console.error("Failed update userName", error);
}
}

