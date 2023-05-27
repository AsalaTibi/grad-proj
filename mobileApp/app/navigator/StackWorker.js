import React from "react";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "../screens/HomeWorker";
import ReviewDetails from "../screens/ReviewDetails";
import Card from "../components/cardWorker";

//For Worker 
const Stack = createNativeStackNavigator();

function WorkerTask() {
  return (
    <Stack.Navigator style={{marginTop:20}}  screenOptions={{
      headerShown: false
    }} >
      <Stack.Screen name="InfoTask"  component={Home} />
      <Stack.Screen name="CardWorker"  component={Card}/>
      <Stack.Screen name="ReviewDetail" component={ReviewDetails} />

    </Stack.Navigator>
  );
}
const styles=StyleSheet.create({

})

export default WorkerTask;