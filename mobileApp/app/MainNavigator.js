import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import AppForm from './components/AppForm';
import ImageUpload from './components/ImageUpload';
import UserProfile from './components/UserProfile';
import { useLogin } from './context/LoginProvider';
import DrawerNavigator from './DrawerNaviagtor';
import DrawerNavigatorUser from './DrawerNavigatorUser';
import Home from './components/Home';
import BottomTabNavigator from './BottomNavigator';
import AddWorker from './components/addWorker';
import AddPage from './components/addPage';
import reviewJobForm from './components/Tasks';
import AddField from './components/addField';
import { add } from 'react-native-reanimated';
import Map from './components/Map';


const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen component={reviewJobForm} name='AddTask'/> */}
      <Stack.Screen component={AppForm} name='AppForm' />
      <Stack.Screen component={AddField} name='AddField'/>
      <Stack.Screen component={reviewJobForm} name='Tasks'/>
      <Stack.Screen component={ImageUpload} name='ImageUpload' />
      <Stack.Screen component={UserProfile} name='UserProfile' />
      <Stack.Screen component={AddPage} name='AddPage' />
      <Stack.Screen component={AddWorker} name='AddWorker'/>
     
    </Stack.Navigator>
  );
};

const MainNavigator = () => {
  const { isLoggedIn,profile } = useLogin();
  // return isLoggedIn ? <DrawerNavigator /> : <StackNavigator />;
  if(isLoggedIn && profile.isAdmin){
    return (
    <DrawerNavigator />
    )
  }
  else if (isLoggedIn )
    return <DrawerNavigatorUser/>
  else  return <StackNavigator />
};
export default MainNavigator;
