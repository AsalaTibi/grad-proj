import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./components/Home";
import Icon from 'react-native-vector-icons/Entypo';
import Plus from 'react-native-vector-icons/AntDesign';
import AddPage from "./components/addPage";
import { View, StyleSheet, Text } from 'react-native';
import StackAdmin from "./navigator/StackAdmin";
import AdminTask from "./navigator/TaskDisplay";
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
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
       if(route.name == 'Tasks'){
         iconName ='add-to-list';
         size = focused?25:20;
         return (
           <Icon 
           name={iconName} 
           size={size}
            color={color}
            />
            );
       }
       if(route.name == 'Create'){
        iconName ='pluscircleo';
        
        size = 30;
        return (
          <Plus 
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
      {/* <Tab.Screen name="Tasks" component={StackAdmin} /> */}
      <Tab.Screen 
      name="Create" 
      component={AddPage} 
      tabBarOptions={{showLabel: false,}}/>

    </Tab.Navigator>

  );
};
const styles = StyleSheet.create({
icon:{
  justifyContent:'center',

}
});

export default BottomTabNavigator;