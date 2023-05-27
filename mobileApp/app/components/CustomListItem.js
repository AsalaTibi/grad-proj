import React, {useState} from 'react'
import {StyleSheet, View,TouchableOpacity,ScrollView,Alert} from 'react-native'
import {ListItem, Text, Divider} from 'react-native-elements'
import {MaterialIcons} from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons';
import ExpenseEdit from '../Edit/ExpenseEdit';
import client from '../api/client';

const CustomListItem = ({info, navigation, id}) => {
  const [modalVisible, setModalVisible] = useState(false);
  function closePopup(){
    setModalVisible(false)
  }
  function updateExpense(){
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
     <ExpenseEdit modalVisible={modalVisible} setModalVisible={setModalVisible} info={info}  handleClose={closePopup}/>
      <View>
        <ListItem >
          {info.typeExpense === 'expense' ? (
            <View style={styles.left}>
              <MaterialIcons name='money-off' size={24} color='white' />
            </View>
          ) : (
            <View style={styles.income}>
              <MaterialIcons name='attach-money' size={24} color='white' />
            </View>
          )}
          <ListItem.Content>
            <View style={{flexDirection:'row'}}>
            <ListItem.Title
              style={{fontWeight: 'bold', textTransform: 'capitalize'}}
            >
              {info?.Name}
            </ListItem.Title>
            <TouchableOpacity 
              //  key={workerItem._id} 
               onPress={()=>updateExpense()} 
               style={{left:50}} >
               <Text style={{color: 'white' , marginBottom:5}}>
               <AntDesign name='edit' color='black' size={20}/>
               </Text>
           </TouchableOpacity>

           <TouchableOpacity 
            // key={workerItem._id}
            style={{left:80}}
            //  onPress={()=>deleteWorker(workerItem._id)}
            >
               <Text style={{color: 'white'}}>
               <AntDesign name="delete" color='red' size={20} />
               </Text>
           </TouchableOpacity>
           </View>
            <ListItem.Subtitle>
              {/* {new Date(info?.timestamp?.toDate()).toUTCString()} */}
              {info?.HDate}
            </ListItem.Subtitle>
          </ListItem.Content>
          <View>
            {info.typeExpense === 'expense' ? (
              <Text style={styles.right}>
                $ -{Number(info?.price)?.toFixed(2)}
              </Text>
            ) : (
              <Text style={styles.rightIncome}>
                $ {Number(info?.price)?.toFixed(2)}
              </Text>
            )}
          </View>
        </ListItem>
        <Divider style={{backgroundColor: 'lightgrey'}} />
      </View>
    </>
  )
}

export default CustomListItem

const styles = StyleSheet.create({
  left: {
    backgroundColor: '#533461',
    borderRadius: 8,
    padding: 10,
  },

  income: {
    backgroundColor: '#61ACB8',
    borderRadius: 8,
    padding: 10,
  },
  right: {
    fontWeight: 'bold',
    color: 'red',
  },
  rightIncome: {
    fontWeight: 'bold',
    color: 'green',
  },
})