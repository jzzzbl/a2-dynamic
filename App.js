//import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { LogBox } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Entypo } from "@expo/vector-icons";
 
import Signup from "./screens/Signup";
import Login from "./screens/Login";
import Home from "./screens/Home";
  import Athlete from "./screens/Athlete";
import Explore from "./screens/Explore";
import Community from "./screens/Community"
  import Thread from './screens/Thread';

import firebase from "firebase";
import "@firebase/firestore";

LogBox.ignoreAllLogs();

var firebaseConfig = {
  apiKey: "AIzaSyAptcNCvzhGlUzqzQV9QfChdiCT1FzDnW0",
  authDomain: "skatea2.firebaseapp.com",
  databaseURL: "https://skatea2.firebaseio.com",
  projectId: "skatea2",
  storageBucket: "skatea2.appspot.com",
  messagingSenderId: "249353158518",
  appId: "1:249353158518:web:45c7665705eedece510457"
};

if (!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

const Stack = createStackNavigator();
const RootTab = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        options={{headerShown: false}} 
        name="Home" 
        component={Home} 
      />
      <Stack.Screen 
        options={{ title: 'Athlete Profile' }}
        name="Athlete" 
        component={Athlete} 
      />
    </Stack.Navigator>
  );
};

const ThreadStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Community" component={Community} />
      <Stack.Screen name="Thread" component={Thread} />
    </Stack.Navigator>
  );
};

const HomeNav = () => {
  return (
    <RootTab.Navigator
      tabBarOptions={{
        activeTintColor: "#4A73BA",
        inactiveTintColor: "gray",
      }}
    >
      <RootTab.Screen
        name="Home"
        component={HomeStack}
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <Entypo name="home" size={24} color={focused ? "#4A73BA" : "#A7AFB2"} />
          ),
        }}
      />
      <RootTab.Screen
        name="Explore"
        component={Explore}
        options={{
          title: "Explore",
          tabBarIcon: ({ focused }) => (
            <Entypo name="compass" size={24} color={focused ? "#4A73BA" : "#A7AFB2"} />
          ),
        }}
      />
      <RootTab.Screen
        name="Community"
        component={ThreadStack}
        options={{
          title: "Community",
          tabBarIcon: ({ focused }) => (
            <Entypo name="chat" size={24} color={focused ? "#4A73BA" : "#A7AFB2"} />
          ),
        }}
      />
        
    </RootTab.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
       <Stack.Screen options={{headerShown: false}} name="Login" component={Login} />
       <Stack.Screen options={{headerShown: false}} name="Signup" component={Signup} />
       <Stack.Screen options={{headerShown: false}} name="Main" component={HomeNav} />
    </Stack.Navigator>
    </NavigationContainer>

  );
}
