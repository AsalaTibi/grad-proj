import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, LayoutAnimation,  UIManager,
    Platform,
    Alert, } from 'react-native';
import { globalStyles } from '../constants/global';
import Card from '../components/cardWorker';
import { useLogin } from '../context/LoginProvider';
// import { getFormattedDate } from '../utils/methods';
import { AntDesign } from '@expo/vector-icons'; 
import client from '../api/client';
import axios from 'axios';
import { async } from '@firebase/util';
import { ScrollView } from 'react-native-gesture-handler';
import RecordHarvest from './RecordHarvest';
const layoutAnimConfig = {
    duration: 300,
    update: {
      type: LayoutAnimation.Types.easeInEaseOut, 
    },
    delete: {
      duration: 100,
      type: LayoutAnimation.Types.easeInEaseOut,
      property: LayoutAnimation.Properties.opacity,
    },
  };
export default function Home({ navigation }) {

  const {  profile,setAdminEmail,adminEmail } = useLogin();
  const name = profile.fullname;
  const email = profile.email;
  const [task,setTask] = useState([]);
  const [done,setDone]=useState({})
  const[HarvestIsVisible , setHarvestIsVisible]=useState(false);
  function showModal4() {setHarvestIsVisible(true); }
  function endModalShow4(){setHarvestIsVisible(false);}

  useEffect(()=>{
    async function fetchTask() {
      try{ 
         await client.get(`/get-task-worker/${name}`)
        .then(result =>
          setTask(result.data)
          )
        .catch(error => console.log(error))
      }
      catch(error){
        console.log(error)
        
      }
      }
  fetchTask();
  async function fetchData() {
    try{ 
      const res = await client.get(`/get-admin/${email}`)
      .then(result =>
        setAdminEmail(result.data)
        )
      .catch(error => console.log(error))
    }
    catch(error){
      console.log(error)
    }
    }
    fetchData();
  },[])

  useEffect(()=>{
    async function fetch() {
      try{ 
         await client.get(`/get-task-worker/${name}`)
        .then(result =>{
          setTask(result.data)}
          )
        .catch(error => console.log(error))
      }
      catch(error){
        console.log(error)
      }
      }
  fetch();
  },[done])

 const removeItem = async(index,task) => {
  const id = task._id;
  // if(task.jopType == "Harvest"){
  //   console.log('success')
  // }
  console.log("job",task.jopType);
  await client.put(`/task-done/${id}`)
  .then(result =>{
    setDone(result.data)
    if(task.jopType == "Harvest"){
      //Alert.alert("Reminder","Record the harvest")
      showModal4();
    }
  }
    )
  .catch(error => console.log(error))
  };
  const renderItem = ({ item ,index}) => {
    console.log(item)
    if(!item.isDone){
    return (
      <Card 
      task={item}
      position={index}  
      handleComplete={removeItem}
       />
    );}
  };
  console.log("admin",adminEmail)
  return (
    <View style={globalStyles.container}>
      <Text style={styles.title}>My Tasks </Text>
      <ScrollView>
      {/* <FlatList data={task} renderItem={renderItem} /> */}
      {task.map((item,index)=>{
        if(!item.isDone){
          return(
          <Card 
          task={item}
          position={index}  
          handleComplete={removeItem} 
          key={index}
          />
          
          )}
      })}
      </ScrollView>
      <RecordHarvest visible={HarvestIsVisible} onclose={endModalShow4}/>
    </View>
  );
 }
 const styles = StyleSheet.create({
  title: {
    fontSize:22,
    fontWeight:'600',
    marginHorizontal:10
  },
});     