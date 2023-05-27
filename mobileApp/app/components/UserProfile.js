import React from 'react';
import { useLogin } from '../context/LoginProvider'
import BottomNavigatorUser from '../BottomNavigatorUser'
import { StyleSheet, Text, View } from 'react-native'
import messaging from '@react-native-firebase/messaging';

const UserProfile = () => {
  const requestUserPermission = async () =>{
    const authStatus = await messaging().requestPermission();
    const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
     console.log('Authorization status:', authStatus);
    }
  }
  return (
    <View>
      <Text>UserProfile</Text>
    </View>
  )
}

export default UserProfile

const styles = StyleSheet.create({})