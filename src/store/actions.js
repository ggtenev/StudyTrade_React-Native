
export const SIGN_IN = "SIGN_IN";
export const SIGN_UP = "SIGN_UP";
export const LOGOUT = "LOGOUT";
export const IS_VERIFIED = "IS_VERIFIED";
export const UPLOAD_DOCS = "UPLOAD_DOCS";
export const SET_STATUS = "SET_STATUS";
export const UPDATE_PROFILE = "UPDATE_PROFILE";
export const SET_BOOKS = "SET_BOOKS";

import firebase from "firebase";
import { decode, encode } from "base-64";
if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

export const fetchUserStatus = (id) => {
  return async (dispatch) => {
   unsubscribe = firebase
      .firestore()
      .collection("users")
      .doc(id)
      .onSnapshot((doc) => {
        console.log(doc.data())
        dispatch({ type: SET_STATUS, userData: doc.data() });
      });
  };
};
export const fetchBooks = () => {
 
  console.log('FETCH BOOKS')
  return async (dispatch) => {
    const books = [] 
    firebase
      .firestore()
      .collection("books").get()
      .then(querySnapshot => {
        
        querySnapshot.forEach(doc => {
          // console.log(doc.data())
          books.push(doc.data())  
        }) 
        dispatch({ type: SET_BOOKS, books:[...books] })
      }) 
      
      
  };
};

export const logout = () => {
  
    
  return async (dispatch) => {
    await AsyncStorage.removeItem("userToken");
  //  await unsubscribe()

    firebase
      .auth()
      .signOut()
      .then(function () {})
      .catch(function (error) {
        // An error happened.
      });

    dispatch({ type: LOGOUT });
  };
};