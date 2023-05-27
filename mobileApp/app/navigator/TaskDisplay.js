import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Crops from "../screens/Crops";
import HomeAdmin from "../screens/HomeAdmin";
import CompletedTask from "../screens/CompletedTask";
import PendingTask from "../screens/PendingTask";
import Pending from 'react-native-vector-icons/MaterialCommunityIcons';
import Bar from 'react-native-vector-icons/AntDesign';
import Done from 'react-native-vector-icons/AntDesign';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();


function AdminTask() {
  return (
    <Tab.Navigator
    initialRouteName={'Tasks'}
    screenOptions={({route}) => ({
      headerShown: false ,
      tabBarStyle:{
       backgroundColor:'#73914b',
       height:60,
       width:350,
       paddingBottom:5,
       paddingTop:5,
       borderRadius:40,
       marginBottom:10,
       marginHorizontal:10
      },
      tabBarIcon:({focused,color,size}) =>{
       let iconName;
       if(route.name == 'All Task'){
         iconName ='bars';
         size = focused?30:25;
         return (
           <Bar 
           name={iconName} 
           size={size}
            color={color}
            />
            );
       }
       if(route.name == 'Pending'){
        iconName ='clipboard-clock-outline';
        size = focused?30:25;
        return (
          <Pending 
          name={iconName} 
          size={size}
          color={color}
           />
           );
      }
      if(route.name == 'Completed'){
        iconName ='checkcircleo';
        size = focused?30:25;
        return (
          <Done 
          name={iconName} 
          size={size}
          color={color}
           />
           );
      }
     }
    })
   }
   tabBarOptions={{
     activeTintColor:'#fff',
     inactiveTintColor:'#e9e9e8',
     labelStyle:{fontSize :15,fontWeight:'bold'},
      // showLabel: false,
   }}
    >
      <Tab.Screen name="All Task" component={HomeAdmin} />
      <Tab.Screen 
      name="Completed" 
      component={CompletedTask} 
      tabBarOptions={{showLabel: false,}}/>
      
      <Tab.Screen 
      name="Pending" 
      component={PendingTask} 
      tabBarOptions={{showLabel: false,}}/>

    </Tab.Navigator>

  );
};
const styles = StyleSheet.create({
icon:{
  justifyContent:'center',

}
});

export default AdminTask;