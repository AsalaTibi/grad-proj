import React,{useEffect,useState} from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useLogin } from '../context/LoginProvider';
import client from '../api/client';
const Home = () => {
  const { setAdminEmail, profile ,adminEmail} = useLogin();
  useEffect( () => {
    async function fetchData() {
    console.log(profile.email)
    const email = profile.email
    try{ 
      const res = await client.get(`/get-admin/${email}`)
      .then(result =>
        setAdminEmail(result.data)
        )
      // .then(console.log(adminEmail))
      .catch(error => console.log(error))
    }
    catch(error){
      console.log(error)
    }
    }
    fetchData()
  },[])
  return (
    <View style={styles.container}>
      <Text>Home</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
