import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyDuen0ForYj6LTaRmuHqyBU4XglBvmPmD0",
  authDomain: "praise-app2.firebaseapp.com",
  projectId: "praise-app2",
  storageBucket: "praise-app2.appspot.com",
  messagingSenderId: "979408191338",
  appId: "1:979408191338:web:bbe39750a00eb60bd66f13",
  measurementId: "G-E61CYMFJHW",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export default firebase;
//firebaseの公式サイトの文コピペした

//データの追加方法をFirebase公式サイトの方法で試してみる
