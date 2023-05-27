import React from 'react';
import { StyleSheet, View ,Text,TouchableOpacity} from 'react-native';
import Check from 'react-native-vector-icons/AntDesign';
import { globalStyles } from '../constants/global';
import { useNavigation } from '@react-navigation/native';
import Location from 'react-native-vector-icons/Entypo';
export default function Card(props) {

  const navigation = useNavigation();
  const taskItem = props.task;
  const deadline = taskItem.deadline;
  const format = new Date(deadline);
  console.log('card task',taskItem)
  return (
    <View style={styles.card}>
      <TouchableOpacity >
        <View style={{flexDirection:'row'}}>
          <Text style={{fontSize: 18, color: '#333',fontWeight: 'bold',}}>Task: </Text>
          <Text style={{fontSize: 18, color: '#333',fontWeight: 'bold',}}>{taskItem.jopType}</Text>
        </View>
        <View style={{flexDirection:'row',marginTop:5}}>
        <Text style={{fontSize: 18, color: '#333',}}>Team: </Text>
        <Text style={globalStyles.titleText}>
        { taskItem.workersName.map((item)=>{
          return(<Text style={{fontSize: 18}}>{item} ,</Text>)
        }) }
        </Text>
        </View>
        <View style={{flexDirection:'row',marginTop:5}}>
            <Location name='location-pin' size={25}/>
            <Text style={{fontSize:18}}>{taskItem.fieldName}</Text>
            </View>
        <View style={{flexDirection:'row',marginTop:5}}>
          <Text style={{color:'red',fontSize:18}}> Deadline </Text>
          <Text style={{fontSize:18}}>{format.getFullYear()} - {format.getMonth()+ 1} - {format.getDate()}</Text>
        </View>
        <View style={{flexDirection:'row',marginTop:5}}>
            <Text style={{fontSize:18}}> Status: </Text> 
            <Text style={{fontSize:18}}>{taskItem.taskStatues}</Text>
        </View>
            <View style={{flexDirection:"row"}}>
              <TouchableOpacity style={styles.done}  onPress={() =>props.handleComplete(props.position,taskItem)} >
              <Text style={{fontSize:18}}>Done</Text>
              </TouchableOpacity>            
              {/* <TouchableOpacity style={{marginLeft:7,marginTop:10}} onPress={() => navigation.navigate('ReviewDetail', {item})}>
              <AntDesign name="doubleright" size={20} color="black" />
              </TouchableOpacity> */}
            </View>
      </TouchableOpacity>
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
  },
  done:{
    marginTop:10,
    flexDirection:"row",
    borderRadius:20,
    backgroundColor:'#c0ac5d',
    height:40,
    width:90,
    padding:7,
    alignItems:'center',
    justifyContent:'center'
  }
});