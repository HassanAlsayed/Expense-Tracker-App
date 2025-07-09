import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyCm9A_81BKjLYznEh8PrSzX0tXuwh9OxiM',
  authDomain: 'expense-tracker-568cd.firebaseapp.com',
  projectId: 'expense-tracker-568cd',
  storageBucket: 'expense-tracker-568cd.appspot.com',
  messagingSenderId: '369569145206',
  appId: '1:369569145206:android:011fb75346f13e7a635a57',
};

const app = initializeApp(firebaseConfig);

export default app;
