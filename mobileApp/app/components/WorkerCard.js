import { View, Text,Image,TouchableOpacity,StyleSheet,Alert } from 'react-native'
import React,{useState} from 'react'
import { AntDesign } from '@expo/vector-icons';
import EditWorker from '../Edit/WorkerEdit';
import Email from 'react-native-vector-icons/MaterialCommunityIcons';
import Phone from 'react-native-vector-icons/FontAwesome';
import Address from 'react-native-vector-icons/FontAwesome';
import Salary from 'react-native-vector-icons/MaterialIcons';
import client from '../api/client';

const WorkerCard = (props) => {
   const workerItem = props.item;
   const [modalVisible, setModalVisible] = useState(false);
   console.log(workerItem)
   const index = props.index
   function closePopup(){
      setModalVisible(false)
    }
    function updateWorker(){
      setModalVisible(true);
     }
     function deleteWorker(id){
      const res =  client.delete(`/delete-Worker/${id}`)
      .then((res)=>{
        Alert.alert("Successfully Deleted")
      })
      .catch(err => console.log(err))
    }
  return (
   <>
   <EditWorker modalVisible={modalVisible} setModalVisible={setModalVisible} info={workerItem} id={workerItem._id} handleClose={closePopup}/>
   <View style={styles.itemList} key={index}>
      <Image 
      style={styles.icon}
      source={{ uri: workerItem.avatar }}
      />
       <View style={{paddingLeft:15}}>
       <View style={{flexDirection:'row'}}>
           <Text style={styles.txtName}>{workerItem.workerName}</Text>
           <TouchableOpacity 
               key={workerItem._id} 
               onPress={()=>updateWorker(workerItem)} 
               style={{left:50}} >
               <Text style={{color: 'white' , marginBottom:5}}>
               <AntDesign name='edit' color='black' size={20}/>
               </Text>
           </TouchableOpacity>

           <TouchableOpacity 
            key={workerItem._id}
            style={{left:80}}
             onPress={()=>deleteWorker(workerItem._id)}
            >
               <Text style={{color: 'white'}}>
               <AntDesign name="delete" color='red' size={20} />
               </Text>
           </TouchableOpacity>
           </View>

           <View style={{flexDirection:'row',marginTop:5}}>
              <Email name='email' size={20}/>
              <Text style={{marginHorizontal:5 ,fontSize:16}}>{workerItem.workerEmail}</Text>
           </View>
           <View style={{flexDirection:'row',marginTop:5}}>
               <Phone name='phone' size={20}/>
               <Text style={{marginHorizontal:5 ,fontSize:16}}>{workerItem.phoneNumber}</Text>
           </View>
           <View style={{flexDirection:'row',marginTop:5}}>
               <Address name='map-pin' size={20}/>
              <Text style={{marginHorizontal:5 ,fontSize:16}}>{workerItem.address}</Text>
           </View>
           <View style={{flexDirection:'row',marginTop:5}}>
               <Salary name='attach-money' size={20}/>
              <Text style={{marginHorizontal:5 ,fontSize:16}}>{workerItem.salary}</Text>
           </View>
       </View>
   </View>
   </>
  )
}
const styles = StyleSheet.create({
   container:{
       // marginTop:10,
       // padding:20
   },
   headerBar:{
       // padding:20
       marginHorizontal:20
   },
   txtHeader:{
       fontSize:22,
       fontWeight:"bold"
   },
   itemList:{
       paddingVertical:15,
       borderBottomColor:'white',
       borderBottomWidth:0.5,
       flexDirection:'row',
       marginTop:20,
       borderRadius: 6,
       elevation: 3,
       backgroundColor: '#fff',
       shadowOffset: { width: 1, height: 1 },
       shadowColor: '#333',
       shadowOpacity: 0.3,
       shadowRadius: 2,
   },
   icon:{
       width:100,
       height:100,
       borderRadius:100,
       backgroundColor:'gray',
       marginHorizontal:10
   },
   txtName:{
       fontSize:18,
       fontWeight:'bold'
   }
})
export default WorkerCard
