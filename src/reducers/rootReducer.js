const initialState = {
  authObj: {},
  loggedIn: false,
  allUsers: [],
};

function rootReducer(state = initialState, action) {
  if (action.type === "USER-LOGIN-SUCCESS") {
    return {
      ...state,
      authObj: action.payload,
      loggedIn: true,
    };
  }
  if (action.type === "SET-ALL-USERS") {
    return {
      ...state,
      allUsers: action.payload,
    };
  } else {
    return { ...state };
  }
}

export default rootReducer;
