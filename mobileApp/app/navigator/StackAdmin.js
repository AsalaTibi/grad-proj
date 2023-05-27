import React from "react";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeAdmin from "../screens/HomeAdmin";
import ReviewDetails from "../screens/ReviewDetails";
import AdminTask from "./TaskDisplay";
import { NavigationContainer } from '@react-navigation/native';
import DisplayHarvest from "../screens/DisplayHarvest";

const Stack = createNativeStackNavigator();

function StackAdmin() {
  return (
   
    <Stack.Navigator style={{marginTop:20}}  screenOptions={{headerShown: false}} >
      <Stack.Screen name="HarvestComponent" component={DisplayHarvest} />
      <Stack.Screen name="Details" component={ReviewDetails} />
    </Stack.Navigator>

  );
}
const styles=StyleSheet.create({

})

export default StackAdmin;