import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCKeOyFTyapXmecTKNCu4xhqNSYy2xKlHo",
  authDomain: "slack-clone-213e7.firebaseapp.com",
  projectId: "slack-clone-213e7",
  storageBucket: "slack-clone-213e7.appspot.com",
  messagingSenderId: "742997728572",
  appId: "1:742997728572:web:ecd9bb6f5e817428e51239",
  measurementId: "G-FVXJJB3TFD"
};

initializeApp(firebaseConfig);

const db = getFirestore();

export default db;