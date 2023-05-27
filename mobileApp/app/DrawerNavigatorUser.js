import React from 'react';
import { View, StyleSheet, Text ,Image,TouchableOpacity} from 'react-native';
import BottomTabNavigatorUser from './BottomNavigatorUser';
import Map from './components/Map';
import { useLogin } from './context/LoginProvider';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Expense from './screens/Expense';
import WorkerExpens from './screens/WorkerExpense';
import RecordHarvest from './screens/RecordHarvest';

const Drawer = createDrawerNavigator();

const CustomDrawer = (props) => {
  const { setIsLoggedIn, profile } = useLogin();
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 20,
            backgroundColor: '#f6f6f6',
            marginBottom: 20,
          }}
        >
          <View>
            <Text>{profile.fullname}</Text>
            <Text>{profile.email}</Text>
          </View>
          <Image
            source={{
              uri:
                profile.avatar  ,
            }}
            style={{ width: 60, height: 60, borderRadius: 30 }}
          />
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <TouchableOpacity
        style={{
          position: 'absolute',
          right: 0,
          left: 0,
          bottom: 50,
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

const DrawerNavigatorUser = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: 'transparent',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitle: '',
      }}
      drawerContent={props => <CustomDrawer {...props} />}
    >
      <Drawer.Screen component={BottomTabNavigatorUser} name='Home' />
      <Drawer.Screen component={Map} name='Map'/>
      {/* <Drawer.Screen component={WorkerExpens} name='Expenses'/> */}
      {/* <Drawer.Screen component={RecordHarvest} name='Harvest'/> */}
    </Drawer.Navigator>
  );
};

export default DrawerNavigatorUser;
