import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBFTI096nshmx2QXhRN4hvwzfiPuVMdDWM",
  authDomain: "disneyplus-clone-e0c57.firebaseapp.com",
  projectId: "disneyplus-clone-e0c57",
  storageBucket: "disneyplus-clone-e0c57.appspot.com",
  messagingSenderId: "346482390579",
  appId: "1:346482390579:web:9cebd38ae5a7e8ab3cd546",
  measurementId: "G-QT1T6YB912"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
