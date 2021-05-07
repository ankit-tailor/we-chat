import React from "react";
import firebase, { projectAuth } from "../firebase/config";

const SignIn = () => {
  const signInWithGoogle = () => {
    projectAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  };

  return (
    <>
      <button className="sign-in" onClick={signInWithGoogle}>
        Sign In with google
      </button>
      <p>
        Do not violate the community guidelines or you will be banned for life!
      </p>
    </>
  );
};

export default SignIn;
