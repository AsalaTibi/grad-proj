import { StyleSheet, Text, View,FlatList ,TouchableOpacity} from 'react-native'
import React ,{useState,useEffect} from 'react'
import { useLogin } from '../context/LoginProvider';
import CardAdmin from '../components/CardAdmin';
import { AntDesign } from '@expo/vector-icons'; 
import { globalStyles } from '../constants/global';
import Location from 'react-native-vector-icons/Entypo';

const PendingCard = (props) => {

    const taskItem = props.task;
    const deadline = taskItem.deadline ;
    const convert = new Date(deadline)

    return (
      <View style={styles.card}>
        <TouchableOpacity style={styles.cardContent} >
          <View style={{flexDirection:'row'}}>
          <Text style={{fontSize: 18, color: '#333',fontWeight: 'bold',}}>Task: </Text>
          <Text style={{fontSize: 18, color: '#333',fontWeight: 'bold',}}>{taskItem.jopType}</Text>
             </View>
          <View style={{flexDirection:'row',marginTop:5}}>
          <Text style={{fontSize: 18, color: '#333',}}>Workers: </Text>
          {/* <Text style={globalStyles.titleText}> */}
          { taskItem.workersName.map((item)=>{
            return(<Text style={{fontSize: 18}}>{item} , </Text>)
          }) }
          </View>
          <View style={{flexDirection:'row',marginTop:5}}>
              <Location name='location-pin' size={25}/>
              <Text style={{fontSize:18}}>{taskItem.fieldName}</Text>
              </View>
          <View style={{flexDirection:'row',marginTop:5}}>
            <Text style={{color:'red',fontSize:18}}> Deadline : </Text>
            {/* {let d = taskItem.submitDate} */}
            <Text style={{fontSize:18}}>{convert.getFullYear()} - {convert.getMonth()+ 1} - {convert.getDate()}</Text>
          </View>
           <View style={{flexDirection:'row',marginTop:5}}>
              <Text style={{fontSize:18}}> Expected duration: </Text> 
              <Text style={{fontSize:18 }}>{taskItem.duration} hours</Text>
          </View> 
                {/* <TouchableOpacity style={{marginLeft:7,marginTop:10}} onPress={() => navigation.navigate('ReviewDetail', {item})}>
                <AntDesign name="doubleright" size={20} color="black" />
                </TouchableOpacity> */}
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
export default PendingCard