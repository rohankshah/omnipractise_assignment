import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

function userSignupSuccess(userCredential) {
  return {
    type: "USER-SIGNUP-SUCCESS",
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
            dispatch(userSignupSuccess(userCredential.user));
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

export { signUpUser };
