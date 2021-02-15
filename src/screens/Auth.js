import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  Button,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Colors from "../constants/Colors";
import firebase from "../constants/config";
import * as Font from 'expo-font';
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import AppLoading from 'expo-app-loading';

// const loadFonts = () =>Font.loadAsync({
//   'Renner': require("./assets/fonts/Renner.ttf"),
//   'Renner-Bold': require('./assets/fonts/Renner_Bold.ttf'),
//   'rowdies' : require('./assets/fonts/Rowdies-Bold.ttf')
// });

export default function Auth() {
  const [loginMode, setLoginMode] = useState(false);
  const [signUpMode, setSignUpMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [university, setUniversity] = useState("University of Kent");
  const [error, setError] = useState("");
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // let [fontsLoaded] = useFonts({
  //   'gotham': require('../../assets/Gotham-Ultra.otf'),
  // });

  //SIGN IN METHOD
  const signIn = async () => { 
    // dispatch(() => authActions.signIn())
    setIsLoading(true);
    if (!email || !password) {
      setError("Fill in all fields");
      setIsLoading(false);
      return;
    }

    // dispatch(authActions.signIn(email, password));
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {
        return firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(async ({ user }) => {});
      })

      .catch((err) => {
        setError(err.message);
        // console.log(err);
        setIsLoading(false);
      });
  };

  //SIGN UP METHOD
  const signUp = async () => {
    setIsLoading(true);
    if (!firstName || !lastName) {
      setError("Fill in all fields");
      
      return;
    }
    // if(
    //   !email.includes('kent.ac.uk')){
    //     setError('You have to use a university email address')
    //     setIsLoading(false);
    //     return
    //   }
    

    //     else if (!email) {
    //       setError("Password doesn't match");
    //       setIsLoading(false);
    //       return;
    // }
    //  else if (!thought) {
    //       setError("You have to accept the Terms and Conditions");
    //       setIsLoading(false);
    //       return;
    //     }
    //DISPATCHING SIGNUP ACTION TO FIREBASE
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async (usercredentials) => {
        // console.log(usercredentials);
        // await AsyncStorage.setItem("userToken", usercredentials.user.uid);
        await usercredentials.user.updateProfile({
          displayName: `${firstName} ${lastName}`,
        });

        await usercredentials.user
          .sendEmailVerification()

          .then(function () {
            firebase
              .firestore()
              .collection("users")
              .doc(usercredentials.user.uid)
              .set({
                name: `${firstName} ${lastName}`,
                email: email,
                university,
                userBooks:[],
              })
              .then(() => {
                setIsLoading(false);
              });
          })
          .catch(function (error) {
            // An error happened.
          });

        // dispatch(authActions.signUp(email, password, firstName, lastName));
        setEmail("");
        setPassword("");
        // navigation.navigate("DrawerNav");
        //CHECK IF THE SIGNUP WAS SUCCESSFUL AND FETCHING ERRORS
      })
      .catch((err) => {
        setError(err.message);
        console.log(err);
        setIsLoading(false);
      });
  };

// if(!fontsLoaded){
//   return <AppLoading />
// } else {



  //LOADING SPINNER WHILE SENDING REQUEST TO THE SERVER
  if (isLoading) {
    return (
      <View style={styles.activityIndicator}>
        <ActivityIndicator size='large' color='green' />
      </View>
    );
  }

  if (signUpMode) {
    return (
      <View style={styles.container}>
        {/* <Image style={styles.img} source={require('../../assets/book.png')}/>
      <Text style={{fontSize:28,fontWeight:'bold',paddingBottom:60}}>Study Trade</Text> */}
        <Text style={styles.top}>First Name</Text>
        <TextInput
          value={firstName}
          style={styles.input}
          onChangeText={(t) => setFirstName(t)}
        />
        <Text style={styles.top}>Surname</Text>
        <TextInput
          value={lastName}
          style={styles.input}
          onChangeText={(t) => setLastName(t)}
        />
        <Text style={styles.top}>University Email Address</Text>
        <TextInput
          value={email}
          style={styles.input}
          onChangeText={(t) => setEmail(t)} 
        />
        <Text style={{...styles.top,color:'black'}}>Password</Text>
        
        <TextInput
          value={password}
          secureTextEntry={true}
          style={styles.input}
          onChangeText={(t) => setPassword(t)}
        />
        <Text style={styles.top}>Pick University</Text>
        <View style={styles.dropdown}>
          <Picker
            selectedValue={university}
            style={{ height: 44, width: "75%" }}
            onValueChange={(itemValue, itemIndex) => setUniversity(itemValue)}
          >
            <Picker.Item label='University of Kent' value='Kent' />
            <Picker.Item label='University of Hull' value='Hull' />
          </Picker>
          {/* <Ionicons name='ios-arrow-down' size={24} color='black' /> */}
        </View>
        <Text style={{ color: "red", marginTop: 15 }}>{error}</Text>
        <View style={styles.buttons}>
          <TouchableOpacity
            onPress={signUp}
            style={{
              ...styles.btn,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <Text style={styles.top}>Confirm</Text>
            <Ionicons
              name='ios-arrow-forward'
              size={21}
              color='black'
              style={{ position: "relative", top: 1 }}
            />
          </TouchableOpacity>
        </View>
        {/* <Button title='back' onPress={() => setSignUpMode(false)}/> */}
        <TouchableOpacity
          style={styles.btn}
          onPress={() => setSignUpMode(false)}
        >
          <Text style={styles.top}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!signUpMode)
    return (
      <View style={styles.container}>
        <Image style={styles.img} source={require("../../assets/book.png")} />
        <Text style={{ fontSize: 28, paddingBottom: 60,fontFamily:'Renner' }}>
          Study Trade
        </Text>
        <Text style={styles.top}>Email</Text>

        <TextInput
          value={email}
          style={styles.input}
          onChangeText={(t) => setEmail(t)}
        />
        <Text style={styles.top}>Password</Text>
        <TextInput
          secureTextEntry={true}
          value={password}
          style={styles.input}
          onChangeText={(t) => setPassword(t)}
        />
        <Text style={{ color: "red", marginTop: 15 }}>{error}</Text>
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.btn} onPress={signIn}>
            <Text style={styles.top}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              setPassword("");
              setEmail("");
              setSignUpMode(true);
            }}
          >
            <Text style={styles.top}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
          
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 36,
    // justifyContent:'center',
    alignItems: "center",
    backgroundColor: "white",
  },
  img: {
    width: 120,
    height: 120,
  },
  top: {
    fontWeight: "bold",
    fontSize: 18,
  },
  input: {
    backgroundColor: Colors.grey,
    width: "75%",
    borderRadius: 25,
    height: 45,
    marginBottom: 10,
    padding: 10,
  },
  dropdown: {
    borderRadius: 25,
    overflow: "hidden",
    flexDirection: "row",
    backgroundColor: Colors.grey,
    justifyContent: "space-around",
    alignItems: "center",
    width: "75%",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "75%",
    marginTop: 32,
  },
  btn: {
    borderRadius: 25,
    backgroundColor: Colors.grey,
    // paddingVertical:8,
    paddingHorizontal: 25,
    borderColor: "black",
    height: 40,
    borderWidth: 1,
    width: 130,
    alignItems: "center",
    justifyContent: "center",
  },
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
  },
});
