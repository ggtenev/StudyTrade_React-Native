import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialIcons, Ionicons, FontAwesome5 } from "@expo/vector-icons";
import React from "react";

import Colors from "../constants/Colors";

import Auth from "../screens/Auth";
import Buy from "../screens/Buy";
import BuyResults from "../screens/BuyResults";
import Sell from "../screens/Sell";
import Profile from "../screens/Profile";
import Book from "../screens/Book";

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

const BuyStack = () => {
  return (
    <BuyNav.Navigator screenOptions={defaultNavOptions}>
      <BuyNav.Screen
        name='Buy'
        component={Buy}
        options={{
          headerStyle: {
            height: 70,
            backgroundColor: Colors.blue,
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
const SellStack = () => {
  return (
    <BuyNav.Navigator screenOptions={defaultNavOptions}>
      <BuyNav.Screen
        name='Sell'
        component={Sell}
        options={{
          headerStyle: {
            height: 70,
            backgroundColor: Colors.blue,
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
          component={Profile}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name='account-box' size={24} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
