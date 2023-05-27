import React, { useState,useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList,RefreshControl,ScrollView } from 'react-native';
import { globalStyles } from '../constants/global';
import CardAdmin from '../components/CardAdmin';
import { getFormattedDate } from '../utils/methods';
import { useLogin } from '../context/LoginProvider';
import client from '../api/client';

export default function HomeAdmin({ navigation }) {

  const {  profile ,adminTask,setAdminTask,adminHarvest,setAdminHarvest} = useLogin();
  const email = profile.email;
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    async function fetchTask() {
      try{ 
         await client.get(`/get-task/${email}`)
        .then(result =>
          setAdminTask(result.data)
          )
        .catch(error => console.log(error))
      }
      catch(error){
        console.log(error)
      }
      }
  fetchTask();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(()=>{
    async function fetchTask() {
      try{ 
         await client.get(`/get-task/${email}`)
        .then(result =>
          setAdminTask(result.data)
          )
        .catch(error => console.log(error))
      }
      catch(error){
        console.log(error)
      }
      }
  fetchTask();
  },[])
  
  return (
    <View >
       <ScrollView
        contentContainerStyle={globalStyles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
      <FlatList data={adminTask} renderItem={({ item }) => (
          <CardAdmin task={item} />
      )}
      />
      </ScrollView>
    </View>
  );
      }