const initialState = {
  authObj: {},
  loggedIn: false,
  allUsers: [],
  userFollowing: [],
};

function rootReducer(state = initialState, action) {
  if (action.type === "USER-LOGIN-SUCCESS") {
    return {
      ...state,
      authObj: action.payload,
      loggedIn: true,
    };
  } else if (action.type === "SET-ALL-USERS") {
    return {
      ...state,
      allUsers: action.payload,
    };
  } else if (action.type === "SET-USER-FOLLOW") {
    return {
      ...state,
      userFollowing: [...state.userFollowing, action.payload],
    };
  } else if (action.type === "SET-USER-FOLLOWING") {
    return {
      ...state,
      userFollowing: action.payload,
    };
  } else if (action.type === "SET-USER-UNFOLLOW") {
    return {
      ...state,
      userFollowing: [
        ...state.userFollowing.filter((ele) => ele !== action.payload),
      ],
    };
  } else if (action.type === "USER-SIGNOUT-SUCCESS") {
    return initialState;
  } else {
    return { ...state };
  }
}

export default rootReducer;
