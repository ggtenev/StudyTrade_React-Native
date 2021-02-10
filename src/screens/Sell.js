import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import { MaterialIcons, Ionicons, FontAwesome5 } from "@expo/vector-icons";

export default function Sell() {
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [hasCamPermission, setHasCamPermission] = useState(null);
  const [hasGalPermission, setHasGalCamPermission] = useState(null);

  useEffect(() => {
    (async () => {

      const CamPermission = await Camera.requestPermissionsAsync(); 
      setHasCamPermission(CamPermission.status === 'granted');

      const GalPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalCamPermission(GalPermission.status === 'granted');
      
    })();
  }, []);

  const takePhoto = async () => {
    if(camera){
      const data = await camera.takePictureAsync()
      setImage(data.uri)
    }
  }
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  if (hasCamPermission === null || hasGalPermission === null) {
    return <View />; 
  }
  if (hasCamPermission === false || hasGalPermission == false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
    <View style={styles.cameraContainer}>
    <Camera 
    ref={ref => setCamera(ref)}
    style={styles.fixedRatio}
    //  type={type}
    ratio={'1:1'}
    > 
      {/* <TouchableOpacity 
      style={styles.button}
      onPress={() => {
        setType(
          type === Camera.Constants.Type.back
            ? Camera.Constants.Type.front
            : Camera.Constants.Type.back
        );
      }}>
        <MaterialIcons name="camera-front" size={55} color="white" />
      </TouchableOpacity> */}
    </Camera>
    <Button  title='Take Photo' onPress={takePhoto} color='red'/>
    <Button title="Pick an image from camera roll" onPress={pickImage}/>
    <Button title="Save" onPress={() => navigation.navigate('Save', {image})}/>
    {image && <Image style={styles.img} source={{uri:image}} />}
    </View>
   


      
  </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    // flex: 0.1,
    // alignSelf: 'flex-end',
    // alignItems: 'center',
    position:'absolute',
    bottom:20,
    left:10
    
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
  cameraContainer:{
    flex:1,
  },
  fixedRatio:{
    flex:2,
    aspectRatio:1
  },
  img:{
    flex:1
  }
})