import { SIGN_IN, SIGN_UP, IS_VERIFIED, SET_STATUS, SET_BOOKS } from "./actions";

const initialState = {
  email:'',
  fullName:'',
  userBooks:[],
  storeBooks:[],
  university:''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
      };
    case SIGN_UP:
      return {
        ...state,
      };
    case IS_VERIFIED:
      return {
        ...state,
        isVerified: action.emailVerified,
      };
      case SET_STATUS:
        
      return {
        ...state,
        ...action.userData
      };
      case SET_BOOKS:
      console.log('REDUCER')
      // console.log(action.books)
        return {
          ...state,
          storeBooks: action.books
        }
  }
  return state;
};
