//CHECKOUT SCREEN

import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Switch,
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  Picker,
  Image,
  Platform,
  DatePickerIOS,
  ScrollView
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";

export default class Checkout extends Component {
  //COMPONENT STATE
  state = {
    sw: false,
    year: "",
    month: "",
    cardNumber: "",
    cvv: "",
    cardholderName: "",
    errorMessage: "",
    date: new Date(1598051730000),
    address:'',
    postCode:''
  };

  //MANAGING STATE FOR THE SWITCH
  toggleSwitch = () => this.setState({ sw: !this.state.sw });

  //HANDLING EXPIRY DATE
  onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    this.setState({ show: Platform.OS === "ios" });
    this.setState({ date: currentDate });
  };

  showMode = (currentMode) => {
    this.setState({ show: Platform.OS === "ios" });
    this.setState({ mode: currentMode });
  };

  showDatepicker = () => {
    this.showMode("date");
  };

  showTimepicker = () => {
    this.showMode("time");
  };

  render() {
    // const makeOrder = this.props.navigation.getParam("makeOrder");
    return (
      <ScrollView style={{backgroundColor:'white'}} >
        <View style={s.container}>
        <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
              style={s.backArrow}
            >
              <Ionicons name='md-arrow-back' size={24} color='black' />
            </TouchableOpacity>
        <Text style={s.paymentDetails}> Payment Details</Text>
        <Image source={require("../../assets/cards.png")} />
        <View style={{ width: "90%" }}>
          <View style={s.pickerContainer}>
            <Text>Card number </Text>
            <TextInput
              style={{ ...s.input, width: "70%" }}
              placeholder=' 1234 5643 7655 9076'
              onChangeText={(t) => this.setState({ cardNumber: t })}
              keyboardType='numeric'
              maxLength={16}
            />
          </View>
          <View style={s.pickerContainer}>
            <Text>Expiry Date </Text>
            

           {/* PICKING THE EXPIRY DATE OF THE CARD */}
            <TextInput style={{...s.cvv,width:'22%',textAlign:'center',marginLeft:-11}} placeholder='Year' />
            <Text>/</Text>
            <TextInput style={{...s.cvv,width:'22%',textAlign:'center'}} placeholder='Month' />

              
            
          </View>

          {/* CVV INPUT */}
          <View style={s.cvvContainer}>
            <Text>CVV</Text>
            <TextInput
              placeholder='  e.g 356'
              style={s.cvv}
              onChangeText={(t) => this.setState({ cvv: t })}
              keyboardType='numeric'
              maxLength={3}
            />
          </View>

          {/* CARDHOLDER NAME */}
          <View style={s.pickerContainer}>
            <Text>Cardholder</Text>
            <TextInput
              placeholder={Platform.OS === "android" ? "  John Smith" : ""}
              style={s.cardholderInput}
              onChangeText={(t) => this.setState({ cardholderName: t })}
            />
          </View>
          <View style={s.pickerContainer}>
            <Text>Address</Text>
            <TextInput
              placeholder={Platform.OS === "android" ? "  123 Main Str" : ""}
              style={s.cardholderInput}
              onChangeText={(t) => this.setState({ address: t })}
            />
          </View>
          <View style={s.pickerContainer}>
            <Text>Post Code</Text>
            <TextInput
              placeholder={Platform.OS === "android" ? "  LR4 7FF" : ""}
              style={s.cardholderInput}
              onChangeText={(t) => this.setState({ postCode: t })}
            />
          </View>
        </View>
        <View>
          <Text style={s.errorMessage}>{this.state.errorMessage}</Text>
        </View>

        {/* SUBSCRIPTION SWITCH */}
        {/* <View style={s.subscription}>
          <Switch
            // style={{ transform: [{ scaleX: 1.4 }, { scaleY: 1.4 }] }}
            onValueChange={this.toggleSwitch}
            value={this.state.sw}
            thumbColor={this.state.sw ? "green" : "#f4f3f4"}
            trackColor={{ false: "#767577", true: "#05b41f" }}
            style={s.switch}
          />

          <View>
            <Text style={s.subMessage}>
              Subscribe to out monthly plan of £4.99
            </Text>
          </View>
        </View> */}

              {/* FINALIZE ORDER BUTTON */}
        <View style={s.btn}>
          <Button
          // CHECKING IF THE USER HAS PROVIDED ALL THE INFORMATION NEEDED
            disabled={
              !this.state.cardNumber.length ||
              !this.state.cardholderName ||
              !this.state.cvv ||
              !this.state.postCode ||
              !this.state.address
            }
            title='Finalise Order'
            color='green'

            // VERIFYING THE DETAILS
            onPress={() => {
              if (
                this.state.cardNumber.length !== 16 ||
                this.state.cvv.length !== 3
              ) {
                this.setState({ errorMessage: "Please enter valid details" });
                return;
              }
              // IF ALL IS GOOD THE USER IS TAKES TO THE CONFIRMATION SCREEN

              this.props.navigation.navigate("Confirmation");
            }}
          />
        </View>
        </View>
      </ScrollView>
    );
  }
}

//STYLES FOR THE SCREEN

const s = StyleSheet.create({
  btn: {
    width: "90%",
    // height:466,
    marginTop: 10,
    // marginLeft: "6%",
    //  justifyContent:'center',
    //  alignItems:'center',
    borderRadius: 22,
    overflow: "hidden",
  },
  errorMessage: {
    color: "red",
  },
  t: {
    flex: 1,
    flexDirection: "column",
  },
  subMessage: {
    fontWeight: "700",
    fontSize: 14,
  },
  individualPicker:{
    height: Platform.OS === 'android' ? 50 : null,
    width: 100,
    borderWidth: Platform.OS === 'android' ? 1 : 0,
    borderColor: "grey",

  },
  switch: {
    transform: [{ scaleX: 1.4 }, { scaleY: 1.4 }],
    alignSelf: "flex-start",
    marginVertical: 22,
    marginRight: 10,
    fontSize: 16,
  },
  subscription: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    // flexDirection: "column",
    backgroundColor: "white",
    // marginTop: 10,
    alignItems: "center",
    padding:10,
    paddingTop:50
  },
  label: {
    color: "black",
    fontSize: 12,
  },
  input: {
    fontSize: 16,
    color: "black",
    padding: 2,
    borderColor: "grey",
    borderWidth: 1,
  },
  cvv: {
    width: "70%",
    fontSize: 16,
    color: "black",
    padding: 2,
    borderColor: "grey",
    borderWidth: 1,
  },
  cardNumberContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 3,
  },
  cvvContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 3,
  },
  cardholderInput: {
    fontSize: 16,
    color: "black",
    padding: 2,
    borderColor: "grey",
    borderWidth: 1,
    width: "70%",
    
  },
  backArrow: {
    margin: 10,
    padding: 5,
    // backgroundColor: "white",
    width: 35,
    height: 35,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    position:'absolute',
    // top:10,
    left:10
  },
  paymentDetails: {
    textAlign: "center",
    marginBottom: 15,
    fontSize: 22,
    fontWeight: "700",
  },
});