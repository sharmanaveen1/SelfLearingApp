/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import { SafeAreaView } from "react-native-safe-area-context";
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/login/LoginScreen';
import HomeScreen from './src/home/HomeScreen';
import TravelDetailsScreen from './src/detail/TravelDetailsScreen';
import ExampleScreen from './src/ExampleScreen';
import { StatusBar } from "react-native";
import ViewAllScreen from "./src/home/ViewAllScreen";
import { Place } from "./src/home/place";


export type RootStackParamList = {
  Home: undefined;
  Details: { place: Place };
  ViewAll: { places: Place[] };
};


const RootStack = createNativeStackNavigator({
  screens: {
    Home: {
      screen: HomeScreen,
      options: {title: 'Welcome',headerShown: false},
    },
    Details: {
      screen: TravelDetailsScreen,
       options: {headerShown: false}
    },
      Example: {
      screen: ExampleScreen,
    },
      LoginScreen: {
      screen: LoginScreen,
    },
    ViewAll: {
      screen: ViewAllScreen,
      options: { headerShown: false },
    },
    
  },
});

const Stack = createStaticNavigation(RootStack);

const App = () => {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0D47A1" }}>
      <StatusBar barStyle="light-content" />
      <Stack />
    </SafeAreaView>
  );
};




export default App;
