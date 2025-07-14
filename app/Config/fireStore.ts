import { getFirestore } from "firebase/firestore";
import app from "./firebaseConfig";
import { getAuth } from "firebase/auth";

const db = getFirestore(app);
const authApp = getAuth(app);

export {db,authApp};