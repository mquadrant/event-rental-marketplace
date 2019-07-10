const initState = {
  user: {}
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case "ADD_USER":
      return Object.assign({}, state, {
        user: action.user
      });
    default:
      return state;
  }
};

export default userReducer;
