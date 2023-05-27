import React from "react";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "../screens/DoneTask";
import ReviewDetails from "../screens/ReviewDetails";
// Done Task Stack 

const Stack = createNativeStackNavigator();

function Stackdone() {
  return (
    <Stack.Navigator style={{marginTop:20}}  screenOptions={{
      headerShown: false
    }} >
      <Stack.Screen name="TaskInfo" component={Home} />
      <Stack.Screen name="ReviewDetails" component={ReviewDetails} />

    </Stack.Navigator>
  );
}
const styles=StyleSheet.create({

})

export default Stackdone