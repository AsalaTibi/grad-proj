import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./components/Home";
import WorkerTask from "./navigator/StackWorker";
import Icon from 'react-native-vector-icons/Ionicons';
import Main from 'react-native-vector-icons/FontAwesome';
import AddPage from "./components/addPage";
import { View, StyleSheet, Text,Image } from 'react-native';
import Chat from "./components/Chat";
import Task from 'react-native-vector-icons/Entypo';

const Tab = createBottomTabNavigator();

const BottomTabNavigatorUser = () => {
  return (
    <Tab.Navigator
    initialRouteName={'Add Tasks'}
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
          <Task 
          name={iconName} 
          size={size}
           color={color}
           />
           );
      }
       if(route.name == 'Chat'){
         iconName ='chatbubble-outline';
         size = focused?25:20;
         return (
           <Icon 
           name={iconName} 
           size={size}
            color={color}
            />
            );
       }
       if(route.name == 'Main'){
        iconName ='home';
        return (
          <Main 
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
      <Tab.Screen name="Tasks" component={WorkerTask} />
      {/* <Tab.Screen 
        name="Main" 
        component={Home} 
        tabBarOptions={{showLabel: false}}
        />
   */}
      <Tab.Screen 
        name="Chat" 
        component={Chat} 
        tabBarOptions={{showLabel: false}}/>

      </Tab.Navigator>
  );
};
const styles = StyleSheet.create({
icon:{
  justifyContent:'center',

}
});

export default BottomTabNavigatorUser;