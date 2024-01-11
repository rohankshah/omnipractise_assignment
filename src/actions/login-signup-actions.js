import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import app from "../firebase";

function userLoginSuccess(userCredential) {
  return {
    type: "USER-LOGIN-SUCCESS",
    payload: userCredential,
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
            var userUid = auth.currentUser.uid;
            setDoc(doc(db, "users", userUid), {
              name: userName,
              email: userEmail,
            }).then(() => dispatch(userLoginSuccess(userCredential.user)));
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
      .catch((error) => {
        console.log(error);
      });
  };
}

export { signUpUser, loginExistingUser };
