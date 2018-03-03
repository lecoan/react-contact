const initialState = {
  user: null
};
//每次返回的必须是一个全新的store
const userReducer = (state=initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {...state, user: action.payload};
    case 'LOGOUT':
      return {...state, user: null};
    default:
      return state;
  }
};

export default userReducer;