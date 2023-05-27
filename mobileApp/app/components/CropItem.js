import { Pressable, StyleSheet, Text, TouchableOpacity, View,Alert } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { GlobalStyles } from '../constants/style';
import { getFormattedDate } from '../utils/methods';
import CropDetails from './CropDetails';
import React,{useState} from 'react';
import CropEdit from '../Edit/cropEdit';
import { AntDesign } from '@expo/vector-icons';
import client from '../api/client';

function CropItem(props) {

  const cropItem = props.crop;
  const hDate = cropItem.HarvestDate ;
  const pDate = cropItem.startingDate;
  const HarvestDate = new Date(hDate)
  const PlantingDate = new Date(pDate)
  const[ModalIsVisible , setModalIsVisible]=useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  function showModal() {setModalIsVisible(true); }
  function endModalShow(){setModalIsVisible(false);}

  function updateEq(){
    setModalVisible(true);
   }
  function closePopup(){
    setModalVisible(false)
  }
  function deleteCrop(id){
    const res =  client.delete(`/delete-crop/${id}`)
    .then((res)=>{
      Alert.alert("Successfully Deleted")
    })
    .catch(err => console.log(err))
  }
  // function Harvest(){
  //   let date1 = date
  //   console.log(date1)
  //   let date2 = Date.now();
  //   if(date2>date1){
  //     alert('HarvestTime')
  //   }
  // }
  return (
    <>
    <View >
      
      <View style={styles.cropItem}>
      <CropEdit modalVisible={modalVisible} setModalVisible={setModalVisible} info={cropItem} id={cropItem._id} handleClose={closePopup}/>
               
        {/* <Text>{cropItem.cropName}</Text> */}
        <TouchableOpacity style={styles.amountContainer} onPress={showModal}>
            <Text style={styles.amount}>{cropItem.cropName}</Text>
        </TouchableOpacity>  
      <View style={{marginHorizontal:10}} >
        <View style={{flexDirection:'row'}}>
          <Text style={[styles.textBase, styles.description]}>
            {cropItem.amount} crops
          </Text>
     
          <TouchableOpacity key={cropItem._id} onPress={()=>updateEq(cropItem)} style={{left:50}} >
              <Text style={{color: 'white' , marginBottom:5}}>
             <AntDesign name='edit' color='black' size={20}/>
              </Text>
          </TouchableOpacity>

          <TouchableOpacity  
          key={cropItem._id}
           onPress={()=>deleteCrop(cropItem._id)}
           style={{left:80}}
           >
              <Text style={{color: 'white'}}>
             <AntDesign name="delete" color='red' size={20} />
              </Text>
          </TouchableOpacity>
        </View>
        
          <Text>{cropItem.fieldName}</Text>
          <View style={{flexDirection:'row'}} >
            <Text style={styles.textBase}>Planting Date: </Text>
            <Text style={styles.textBase}>{PlantingDate.getFullYear()}/{PlantingDate.getMonth()}/{PlantingDate.getDay()}</Text>
          </View>
          <View style={{flexDirection:'row'}} >
            <Text style={styles.textBase}>Harvest Date: </Text>
            <Text style={styles.textBase}>{HarvestDate.getFullYear()}/{HarvestDate.getMonth()}/{HarvestDate.getDay()}</Text>
          </View>
          </View> 
      </View>
    </View>
   
    <CropDetails visible={ModalIsVisible} onclose={endModalShow} item={cropItem}/>
    </>
  );
}
 export default CropItem;

const styles = StyleSheet.create({
  cropItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor:"#cfdcaa",
    flexDirection: 'row',
    borderRadius: 6,
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  textBase: {
    color:'black',
    // fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    minWidth: 80
  },
  amount: {
    color: GlobalStyles.colors.primary500,
    fontWeight: 'bold',
  },
});