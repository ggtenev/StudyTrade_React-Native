import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  TextInput,
  Modal,
  StatusBar,
  Image,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import {
  MaterialIcons,
  Ionicons,
  FontAwesome5,
  Octicons,
  FontAwesome,
} from "@expo/vector-icons";
import firebase from "../constants/config";
import Colors from "../constants/Colors";
import {useSelector, useDispatch} from 'react-redux'
import * as actions from '../store/actions'


export default function Sell({navigation}) {
  const [camera, setCamera] = useState(null);
  const [image, setImgId] = useState(null);
  const [hasCamPermission, setHasCamPermission] = useState(null);
  const [hasGalPermission, setHasGalCamPermission] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [condition, setCondition] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [isVerified, setIsverified] = useState(false)

  let user = firebase.auth().currentUser;
  let currentBooks = useSelector(state => state.reducer.userBooks)
  const dispatch = useDispatch()

useEffect(() => {
  if(user.emailVerified) {
    setIsverified(true)
  }
  return 
}, [])

  const fireUploadID = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    var ref = firebase
      .storage()
      .ref()
      .child("users/" + user.uid + "/" + "books/" + uri.toString().slice(-12));
    return ref.put(blob).then(() => {
      ref
        .getDownloadURL()
        .then((url) => {
          firebase
            .firestore()
            .collection("users")
            .doc(user.uid)
            .set(
              {
                userBooks: [
                  {
                    title,
                    condition,
                    author,
                    url,
                    price
                  },
                  ...currentBooks,
                ],
              },
              { merge: true }
            );
            firebase
            .firestore()
            .collection("books")
            .doc(Math.random().toString(12))
            .set({
              title,
              condition,
              url:String(url),
              author,
              price,
              key:Math.random().toString(12)
            });
        })
        .then((url) => {
          setTitle('')
          setCondition('')
          setAuthor('')
          setPrice('')
         navigation.navigate('Buy')
          dispatch(actions.fetchBooks())
        })
        .catch((e) => {
          console.log(e);
        });
    });
  };

  const pickIdCamera = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    } catch (e) {
      console.log(e);
    }
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      // aspect: [1, 1],
      quality: 0.6,
    });
    setModalVisible(false);
    console.log(result);
    if (!result.cancelled) {
      setImgId(result.uri);
      // fireUploadID(result.uri)
      // .then(() => {
      //   console.log("Success");
      // })
      // .catch((err) => console.log(err));
    }
  };
  const pickIdGallery = async () => {
    try {
      const {
        status,
      } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    } catch (e) {
      console.log(e);
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      // aspect: [1, 1],
      quality: 0.6,
    });
    setModalVisible(false);
    console.log(result);

    if (!result.cancelled) {
      setImgId(result.uri);
      // fireUploadID(result.uri)
      //   .then(() => {
      //     console.log("Success");
      //   })
      //   .catch((err) => console.log(err));
    }
  };

  if(!isVerified) {
    return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Text style={{fontSize:22,color:'red', marginBottom:20,textAlign:'center',width:'80%'}}>Please verify you email and sign in again </Text>
        <TouchableOpacity style={styles.btn} onPress={() => firebase.auth().signOut()}>
            <Text style={styles.top}>Sign Out</Text>
          </TouchableOpacity>
      </View>
    )
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.container}>
        {/* <StatusBar backgroundColor={Colors.red} /> */}
        <Modal
          animationType='fade'
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            // Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={{ ...styles.modalText, color: "black" }}>
                Select file from
              </Text>
              <TouchableOpacity
                style={styles.modalBoxes}
                onPress={pickIdCamera}
              >
                <Text style={styles.modalText}>Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalBoxes}
                onPress={pickIdGallery}
              >
                <Text style={styles.modalText}>Gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={{ ...styles.modalText, color: "red" }}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <View style={{ alignItems: "center", paddingBottom: 10,width:'95%' }}>
          {/* <TouchableOpacity style={styles.uploadContainer} onPress={pickImage}> */}
          <TouchableOpacity
            style={styles.uploadContainer}
            onPress={() => {
              // setModalVersion("id");
              setModalVisible(true);
            }}
          >
            <Octicons name='cloud-upload' size={36} color='red' />
            <Text
              style={{
                color: "white",
                fontSize: 19,
                fontWeight: "bold",
              }}
            >
              Upload the cover of your book
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginLeft: 10, marginTop: 5 }}>
          {image ? (
            <Image
              resizeMode='cover'
              source={{
                uri:
                 image,
              }}
              style={{ width: 150, height: 250 }}
            />
          ) : null}
        </View>
        <View style={styles.input}>
          {/*Email input field */}
          <MaterialIcons name='title' size={21} color='red' />
          {/* <MaterialIcons name='person' size={21} color='red' /> */}
          <TextInput
            style={styles.inputFiled}
            placeholder='Title *'
            keyboardType='email-address'
            required
            // editable={false}
            autoCapitalize='none'
            errorText='Please enter a valid email'
            onChangeText={(text) => setTitle(text)}
            value={title}
          />
        </View>
        <View style={styles.input}>
          {/*Email input field */}
          <MaterialIcons name='library-books' size={21} color='red' />
          <TextInput
            style={styles.inputFiled}
            placeholder='Condition *'
            keyboardType='email-address'
            required
            // editable={false}
            autoCapitalize='none'
            errorText='Please enter a valid email'
            onChangeText={(text) => setCondition(text)}
            value={condition}
          />
        </View>
        <View style={styles.input}>
          {/*Email input field */}
          <MaterialIcons name='person' size={21} color='red' />
          <TextInput
            style={styles.inputFiled}
            placeholder='Author *'
            keyboardType='email-address'
            required
            // editable={false}
            autoCapitalize='none'
            errorText='Please enter a valid email'
            onChangeText={(text) => setAuthor(text)}
            value={author}
          />
        </View>
        <View style={styles.input}>
          {/*Email input field */}
          <FontAwesome
            name='gbp'
            size={21}
            color='red'
            style={{ marginLeft: 5, marginRight: 4 }}
          />
          {/* <MaterialIcons name='person' size={21} color='red' /> */}
          <TextInput
            style={styles.inputFiled}
            placeholder='Price *'
            keyboardType='number-pad'
            required
            // editable={false}
            autoCapitalize='none'
            errorText='Please enter a valid email'
            onChangeText={(text) => setPrice(text)}
            value={price}
          />
        </View>
        <TouchableOpacity
            onPress={() => fireUploadID(image)}
            style={{
              ...styles.btn,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginVertical: 10,
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
        {/* <Button title='Uplaod' onPress={}/> */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent:'center',
    alignItems: "center",
    backgroundColor: "white",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
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
  top: {
    fontWeight: "bold",
    fontSize: 18,
  },
  button: {
    // flex: 0.1,
    // alignSelf: 'flex-end',
    // alignItems: 'center',
    position: "absolute",
    bottom: 20,
    left: 10,
  },
  text: {
    fontSize: 18,
    color: "white",
  },
  cameraContainer: {
    flex: 1,
  },
  fixedRatio: {
    flex: 2,
    aspectRatio: 1,
  },
  img: {
    flex: 1,
  },
  uploadContainer: {
    justifyContent: "space-around",
    alignItems: "center",
    padding: 15,
    borderWidth: 2,
    borderColor: "green",
    borderStyle: "dashed",
    borderRadius: 12,
    width: "95%",
    height: 120,
    backgroundColor: "#f9a9ab",
    marginTop: 20,
  },
  menuBtn: {
    marginLeft: 15,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    marginTop: 22,
  },
  imgPicker: {
    zIndex: 1,
    padding: 4,
    borderWidth: 3,
    borderColor: "grey",
    width: 148,
    height: 148,
    borderRadius: 80,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    marginVertical: 7,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    marginVertical: 15,
    fontSize: 16,
    fontWeight: "bold",
    color: "blue",
  },
  modalBoxes: {
    borderBottomWidth: 0.4,
    borderBottomColor: "blue",
  },
  calendar: {
    marginRight: 10,
  },
  rxScreen: {
    width: "90%",
    height: 64,
    marginTop: 20,
    borderRadius: 5,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    width: "95%",
    padding: 5,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "grey",
    marginVertical: 2,
  },
  input: {
    padding: 6,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 0.5,
    borderColor: "#000",
    height: 45,
    borderRadius: 5,
    margin: 5,
    width: "95%",
  },
  dobInputField: {
    flexDirection: "row",
    width: "61%",
  },
  inputFiled: {
    flex: 1,
    marginLeft: 15,
  },
});
