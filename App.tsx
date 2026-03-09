/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import { SafeAreaView } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/login/LoginScreen';
import HomeScreen from './src/home/HomeScreen';
import TravelDetailsScreen from './src/detail/TravelDetailsScreen';
import ExampleScreen from './src/ExampleScreen';
import { StatusBar } from 'react-native';
import ViewAllScreen from './src/home/ViewAllScreen';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from '@react-native-vector-icons/ionicons';
import ProfileScreen from './src/profile/ProfileScreen';
import { NewsData } from './src/home/NewsData';
import { Colors } from './src/theme';


export type RootStackParamList = {
  Home: undefined;
  Details: { place: NewsData };
  ViewAll: { news: NewsData[]; title: string };
};

const tabScreenOptions = ({ route }: any) => ({
  headerShown: false,
  tabBarIcon: ({ focused, color, size }: any) => {
    let iconName: string;

    switch (route.name) {
      case 'Home':
        iconName = focused ? 'home' : 'home-outline';
        break;
      case 'Profile':
        iconName = focused ? 'person' : 'person-outline';
        break;
      case 'Favourite':
        iconName = focused ? 'heart' : 'heart-outline';
        break;
      default:
        iconName = 'ellipse';
    }

    return <Ionicons name={iconName} size={size} color={color} />;
  },

  tabBarActiveTintColor: '#0D47A1',
  tabBarInactiveTintColor: 'gray',

  tabBarStyle: {
    height: 60,
    paddingBottom: 5,
  },
});

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator screenOptions={tabScreenOptions}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Favourite" component={LoginScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

function RootStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="Details" component={TravelDetailsScreen} />
      <Stack.Screen name="Example" component={ExampleScreen} />
      <Stack.Screen name="ViewAll" component={ViewAllScreen} />
    </Stack.Navigator>
  );
}

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primaryDark }}>
      <StatusBar barStyle="light-content" />
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
