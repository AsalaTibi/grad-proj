import React from 'react';
import { View, Text, TouchableOpacity, Image, ImageBackground } from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import Home from './components/Home';
import Tasks from './components/Tasks';
import { useLogin } from './context/LoginProvider';
import BottomTabNavigator from './BottomNavigator';
import StackAdmin from './navigator/StackAdmin';
import AdminTask from './navigator/TaskDisplay';
import AdminFields from './screens/AdminFields';
import Workers from './screens/Workers';
import CropOutput from './components/CropOutput';
import AddPage from './components/addPage';
import CropDetails from './components/CropDetails';
import RecordHarvest from './screens/RecordHarvest';
import StackExp from './navigator/ExpenseStack';
import SOutput from './components/Sold';
import Eqoutput from './screens/Eqdisplay';
import Dashboard from './screens/Dashboard';

const Drawer = createDrawerNavigator();

const CustomDrawer = props => {
  const { setIsLoggedIn, profile } = useLogin();
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View
        style={{
          flexDirection: 'row',
          // justifyContent: 'space-between',
          alignItems: 'center',
          // padding: 20,
          backgroundColor: '#f6f6f6',
          // marginBottom: 20,
          marginLeft:20,
          marginTop:20
        }}>
          <Image
            source={require('../assets/logo.jpg')}
            style={{ width: 50, height: 50, borderRadius: 30 }}
          />
          <Text style={{fontSize:22,fontWeight:'600'}}>Farmable</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 20,
            backgroundColor: '#f6f6f6',
            // marginBottom: 20,
          }}
        >
          <View>
            <Text>{profile.fullname}</Text>
            <Text>{profile.email}</Text>
          </View>
          <ImageBackground
           source={require('../app/images/person.jpg')}
           style={{ width: 60, height: 60, borderRadius: 30 }} >
          <Image
            source={{
              uri:
                profile.avatar 
                // || require('../app/images/person.jpg'),
            }}
            style={{ width: 60, height: 60, borderRadius: 30 }}
          />
          </ImageBackground>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <TouchableOpacity
        style={{
          position: 'absolute',
          right: 0,
          left: 0,
          bottom: 10,
          backgroundColor: '#f6f6f6',
          padding: 20,
        }}
        onPress={() => setIsLoggedIn(false)}
      >
        <Text>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const DrawerNavigator = () => {
  return (
    
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: 'white',
          elevation: 0,
          shadowOpacity: 0,
          alignItems:'center',
          justifyContent:'center'
        },
        headerTitle: '',
      }}
      drawerContent={props => <CustomDrawer {...props} />}
    >
      <Drawer.Screen component={Dashboard} name='Dashboard' />
      <Drawer.Screen component={AddPage} name='Add' />
      <Drawer.Screen component={Workers} name='Workers'/>
      <Drawer.Screen component={AdminFields} name='Fields'/>
      <Drawer.Screen component={Eqoutput} name="Equipment"/>
      <Drawer.Screen component={AdminTask} name='Tasks' />
      <Drawer.Screen component={CropOutput} name='Crops' />
      <Drawer.Screen component={StackAdmin} name='Harvest' />
      <Drawer.Screen component={StackExp} name='Expense' /> 
      <Drawer.Screen component={SOutput} name="Sales"/>
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
