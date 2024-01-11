import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import app from "../firebase";
import { fetchAllUsers } from "./user-actions";

function userLoginSuccess(userCredential) {
  return {
    type: "USER-LOGIN-SUCCESS",
    payload: userCredential,
  };
}

function userSignOutSuccess() {
  return {
    type: "USER-SIGNOUT-SUCCESS",
  };
}

function signUpUser(userEmail, userPass, userName) {
  return (dispatch, state) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, userEmail, userPass)
      .then((userCredential) => {
        console.log(userCredential);
        updateProfile(auth.currentUser, {
          displayName: userName,
        })
          .then(() => {
            const db = getFirestore(app);
            const userUid = auth.currentUser.uid;
            setDoc(doc(db, "users", userUid), {
              name: userName,
              email: userEmail,
            })
              .then(() => dispatch(userLoginSuccess(userCredential.user)))
              .then(() => dispatch(fetchAllUsers()));
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

function loginExistingUser(userEmail, userPass) {
  return (dispatch, state) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, userEmail, userPass)
      .then((userCredential) => {
        console.log("login success");
        console.log(userCredential);
        dispatch(userLoginSuccess(userCredential.user));
      })
      .then(() => dispatch(fetchAllUsers()))
      .catch((error) => {
        console.log(error);
      });
  };
}

function signOutUser() {
  return (dispatch, state) => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("signed out");
        dispatch(userSignOutSuccess());
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export { signUpUser, loginExistingUser, signOutUser };
