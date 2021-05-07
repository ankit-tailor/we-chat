import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyDLlr0SpMCQz2U5ySqn-o28I19T4iqOPoU",
  authDomain: "we-chat-bcc9f.firebaseapp.com",
  projectId: "we-chat-bcc9f",
  storageBucket: "we-chat-bcc9f.appspot.com",
  messagingSenderId: "885732948947",
  appId: "1:885732948947:web:820476706e233f98884d26",
});

const projectAuth = firebase.auth();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectAuth, projectFirestore, timestamp };

export default firebase;
