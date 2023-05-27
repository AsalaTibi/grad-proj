import React from "react";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import Cat from "../screens/Cat";
import Expense from "../screens/Expense";
// Done Task Stack 

const Stack = createNativeStackNavigator();

function StackExp() {
  return (
    // <NavigationContainer>

    <Stack.Navigator   screenOptions={{
      headerShown: true
    }}  >
      <Stack.Screen name="Cat" component={Cat} />
      <Stack.Screen name="Exp" component={Expense} />

    </Stack.Navigator>
    // </NavigationContainer>
  );
}
const styles=StyleSheet.create({

})

export default StackExp;