import React from 'react';
import { StyleSheet, View ,Text,TouchableOpacity} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { globalStyles } from '../constants/global';
import { getFormattedDate } from '../utils/methods';
import Location from 'react-native-vector-icons/Entypo';

export default function CardAdmin(props) {
  const taskItem = props.task;
  const deadline = taskItem.deadline ;
  const convert = new Date(deadline)
  console.log(taskItem)
  return (  
    <View style={styles.card}>
      <View style={styles.cardContent}>
      <TouchableOpacity>
      <View style={{flexDirection:'row'}}>
           <Text style={{fontSize: 18, color: '#333',fontWeight: 'bold',}}>Task: </Text>
          <Text style={{fontSize: 18, color: '#333',fontWeight: 'bold',}}>{taskItem.jopType}</Text>
           {taskItem.isDone ? <Text style={{fontSize: 17, color: '#73914b',fontWeight: 'bold',marginLeft:80}}>Completed</Text>
           :<Text style={{fontSize: 17, color: 'red',fontWeight: 'bold',marginLeft:120}}>Incomplete</Text>
          }
          
        </View>
        <View style={{flexDirection:'row',marginTop:5}}>
        <Text style={{fontSize: 18, color: '#333',}}>Workers: </Text>
       { taskItem.workersName.map((item)=>{
          return(<Text style={{fontSize: 18}}>{item} , </Text>)
        }) }
        </View>
        <View style={{flexDirection:'row',marginTop:5}}>
            <Location name='location-pin' size={25}/>
            <Text style={{fontSize:18}}>{taskItem.fieldName}</Text>
            </View>
        <View style={{flexDirection:'row',marginTop:5}}>
          <Text style={{color:'red',fontSize:18}}> Deadline </Text>
          <Text style={{fontSize:18}}>{convert.getFullYear()} - {convert.getMonth()+ 1} - {convert.getDate()}</Text>
        </View>
        <View style={{flexDirection:'row'}}>
            <Text style={{color:'black',fontSize:18}}> Status: </Text> 
            <Text style={{color:'black',fontSize:18}}>{taskItem.taskStatues}</Text>
        </View>
     
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 6,
    elevation: 3,
    backgroundColor: '#fff',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 6,
  },
  cardContent: {
    marginHorizontal: 18,
    marginVertical: 20,
  }
});