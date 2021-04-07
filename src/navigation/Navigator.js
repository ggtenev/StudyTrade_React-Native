import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialIcons, Ionicons, FontAwesome5, Entypo } from "@expo/vector-icons";
import React from "react";

import Colors from "../constants/Colors";

import Auth from "../screens/Auth";
import Buy from "../screens/Buy";
import BuyResults from "../screens/BuyResults";
import Sell from "../screens/Sell";
import Profile from "../screens/Profile";
import Book from "../screens/Book";
import Chat from '../screens/Chat'
import Checkout from '../screens/Checkout'
import Confirmation from '../screens/Confirmation'
import Conversations from '../screens/Conversations'

const BuyNav = createStackNavigator();
const Tab = createBottomTabNavigator();

const defaultNavOptions = {
  headerTitleAlign: "center",
  height: 50,

  headerStyle: {
    height: 70,
    backgroundColor: Colors.grey,
    shadowRadius: 0,

    elevation: 0,
  },
  headerTitleStyle: {
    textAlign: "center",
    fontSize: 20,
  },

  headerTintColor: Colors.dark,
};

const ChatStack = () => {
  return (
    <BuyNav.Navigator screenOptions={{...defaultNavOptions}}>
    <BuyNav.Screen
    name='Conversations'
    component={Conversations}
    options={{
      headerShown:true,
      headerStyle: {
        height: 80,
        backgroundColor: 'white',
      },
      headerTintColor: "black",
      headerTitleStyle: {
        fontSize: 28,
      },
    }}
    />
    <BuyNav.Screen
      name='Chat'
      component={Chat}
      options={{
        headerShown:true,
        headerStyle: {
          height: 90,
          backgroundColor: "white",
          shadowRadius: 0,
          shadowOffset: {
            height: 0,
          },
          elevation: 0,
        },
        headerTintColor: "black",
        headerTitleStyle: {
          fontSize: 28,
        },
      }}
      />
  </BuyNav.Navigator>
  )
  
}

const BuyStack = () => {
  return (
    <BuyNav.Navigator screenOptions={{...defaultNavOptions}}>
      <BuyNav.Screen
        name='Buy'
        component={Buy}
        options={{
          headerShown:true,
          headerStyle: {
            height: 100,
            backgroundColor: Colors.blue,
          },
          headerTintColor: "white",
          headerTitleStyle: {
            fontSize: 28,
          },
        }}
      />
      <BuyNav.Screen
      name='Results'
      component={BuyResults}
      options={{
        headerShown:true,
        headerStyle: {
          height: 100,
          backgroundColor: 'white',
        },
        headerTintColor: "black",
        headerTitleStyle: {
          fontSize: 28,
        },
      }}
      />
      <BuyNav.Screen
      name='Chat'
      component={Chat}
      options={{
        headerShown:true,
        headerStyle: {
          height: 90,
          backgroundColor: "white",
          shadowRadius: 0,
          shadowOffset: {
            height: 0,
          },
          elevation: 0,
        },
        headerTintColor: "black",
        headerTitleStyle: {
          fontSize: 28,
        },
      }}
      />
      <BuyNav.Screen
      name='Checkout'
      component={Checkout}
      options={{
        headerShown:false,
        headerStyle: {
          height: 90,
          backgroundColor: "white",
          shadowRadius: 0,
          shadowOffset: {
            height: 0,
          },
          elevation: 0,
        },
        headerTintColor: "black",
        headerTitleStyle: {
          fontSize: 28,
        },
      }}
      />
      <BuyNav.Screen
      name='Confirmation'
      component={Confirmation}
      options={{
        headerShown:false,
        headerStyle: {
          height: 90,
          backgroundColor: "white",
          shadowRadius: 0,
          shadowOffset: {
            height: 0,
          },
          elevation: 0,
        },
        headerTintColor: "black",
        headerTitleStyle: {
          fontSize: 28,
        },
      }}
      />
      <BuyNav.Screen
      options={{
        headerShown:false
      }}
      name='Book' component={Book} />
    </BuyNav.Navigator>
  );
};
const SellStack = () => {
  return (
    <BuyNav.Navigator screenOptions={defaultNavOptions}>
      <BuyNav.Screen
        name='Sell'
        component={Sell}
        options={{
          headerStyle: {
            height: 100,
            backgroundColor: Colors.red,
          },
          headerTintColor: "white",
          headerTitleStyle: {
            fontSize: 28,
          },
        }}
      />
      <BuyNav.Screen name='Book' component={Book} />
    </BuyNav.Navigator>
  );
};
const ProfileStack = () => {
  return (
    <BuyNav.Navigator screenOptions={defaultNavOptions}>
      <BuyNav.Screen
        name='Profile'
        component={Profile}
        options={{
          headerStyle: {
            height: 100,
            backgroundColor: 'black',
          },
          headerTintColor: "white",
          headerTitleStyle: {
            fontSize: 28,
          },
        }}
      />
      <BuyNav.Screen name='Book' component={Book} />
    </BuyNav.Navigator>
  );
};

export default Navigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        barStyle={{ backgroundColor: "black" }}
        tabBarOptions={{
          labelStyle: {
            fontSize: 14,
          },
          activeTintColor: Colors.blue,
          inactiveTintColor: "white",
          style: {
            backgroundColor: "black",
            height: 50,
            paddingBottom: 3,
            paddingTop: 6,
          },
        }}
      >
        <Tab.Screen
          name='Buy'
          component={BuyStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name='ios-basket' size={31} color={color} />
              // <MaterialIcons name="account-box" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name='Sell'
          component={SellStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5
                name='money-bill-wave-alt'
                size={24}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name='Profile'
          component={ProfileStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name='account-box' size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name='Messages'
          component={ChatStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Entypo name="chat" size={24} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
