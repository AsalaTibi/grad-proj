import { StyleSheet, Text, View,FlatList ,TouchableOpacity} from 'react-native'
import React ,{useState,useEffect} from 'react'
import { useLogin } from '../context/LoginProvider';
import CardAdmin from '../components/CardAdmin';
import client from '../api/client';
import { globalStyles } from '../constants/global';
import Location from 'react-native-vector-icons/Entypo';
import CompletedCard from '../components/CompletedCard';

const CompletedTask = () => {
  const { adminTask } = useLogin();
  
  const renderItem = ({ item ,index}) => {
    if(item.isDone){
    return (
      <CompletedCard 
      task={item}
      position={index}  
       />
    );}
  };
  return (
    <View style={globalStyles.container}>
       <Text style={styles.title}>Completed Tasks </Text>
      <FlatList data={adminTask} renderItem={renderItem}/>
    </View>
  );
}

export default CompletedTask

const styles = StyleSheet.create({
  title: {
    fontSize:22,
    fontWeight:'600',
    marginHorizontal:10,
    color:'#73914b',
  },
})