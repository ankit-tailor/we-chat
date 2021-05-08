import React from "react";
import firebase, { projectAuth } from "../firebase/config";
import "../App.css";

const SignIn = () => {
  const signInWithGoogle = () => {
    projectAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  };

  return (
    <div className="sign-in">
      <button onClick={signInWithGoogle}>Sign In with google</button>
      <p>No rules!! Enjoy chatting.</p>
    </div>
  );
};

export default SignIn;
