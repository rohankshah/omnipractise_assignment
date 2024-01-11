const initialState = {
  authObj: {},
};

function rootReducer(state = initialState, action) {
  if (action.type === "USER-LOGIN-SUCCESS") {
    return {
      ...state,
      authObj: action.payload,
    };
  } else {
    return { ...state };
  }
}

export default rootReducer;
