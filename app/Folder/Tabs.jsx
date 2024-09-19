import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Image } from 'react-native';
import * as Font from 'expo-font';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from './Dashboard';
import Settings from './Settings';
import Members from './Members';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Profile from './Profile';

// Load fonts asynchronously
const fetchFonts = () => {
  return Font.loadAsync({
    'dm-sans': require('../../assets/fonts/DMSans-Italic-VariableFont_opsz,wght.ttf'), // Update the path if needed
  });
};

const Tab = createBottomTabNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    fetchFonts().then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: 'transparent',
          height: 70,
          padding: 2,
          paddingBottom: 15,
          
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: 'bold',
          fontFamily: 'dm-sans', // Apply DM Sans font
        },
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: '#5E5E5E',
        tabBarIconStyle: {
          size: 18,
        },
        headerStyle: {
          backgroundColor: '#FFFFFF', // Background color for the header
          height: 70, // Height of the header
          
        },
        headerTitleStyle: {
          fontSize: 20, // Font size for the header title
          fontWeight: 'bold', // Font weight for the header title
          fontFamily: 'dm-sans', // Apply DM Sans font to header title
          color: '#333333', // Color of the header title
          paddingBottom:1
        },
        headerTintColor: '#333333', // Color of the header back button
        
      })}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={Dashboard}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="dashboard" size={size} color={color} />
          ),
          headerRight: () => (
            <Image
              source={require('../../assets/GymLogo.png')} // Path to your logo image
              style={{ width: 40, height: 40, marginRight: 15 ,marginBottom:12}}
            />
          ),
          title: 'Dashboard', // Title for the header
        }}
      />
      <Tab.Screen 
        name="Members" 
        component={Members}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={size} color={color} />
          ),
          title: 'Members', // Title for the header
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="profile" size={size} color={color} />
          ),
          title: 'Profile', // Title for the header
        }}
      />
      <Tab.Screen 
        name="Settings" 
        component={Settings}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
          title: 'Settings', // Title for the header
        }}
      />
    </Tab.Navigator>
  );
}
