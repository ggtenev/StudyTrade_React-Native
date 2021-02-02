import firebase from 'firebase/app'
import 'firebase/firebase-firestore'
import 'firebase/firebase-auth'
import 'firebase/firebase-storage'


var firebaseConfig = {
  apiKey: "AIzaSyAUhPoy3ax2napWnSpRxbaqF1LdOy2t5Fo",
  authDomain: "studytrade-cd79b.firebaseapp.com",
  projectId: "studytrade-cd79b",
  storageBucket: "studytrade-cd79b.appspot.com",
  messagingSenderId: "790307427749",
  appId: "1:790307427749:web:e60af2cb90cd4a4021044c"
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

firebase.firestore()
firebase.storage()

export default firebase