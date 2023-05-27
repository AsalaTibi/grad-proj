import React, { useEffect, useState } from 'react';
import { StyleSheet,Button, View, Text, TouchableOpacity ,Image} from 'react-native';
import { globalStyles } from '../constants/global';
import { AntDesign } from '@expo/vector-icons'; 
import client from '../api/client';
import AddSales from '../components/ModalActionSales';
import { useLogin } from '../context/LoginProvider';

export default function ReviewDetails({navigation,route }) {

  const {harvestItem} = route.params;
  const [crop,setCrop]=useState([]);
  const HD = new Date(harvestItem.submitDate);
  const [modalVisible, setModalVisible] = useState(false);
  const {profile} = useLogin();
  const email = profile.email

  return (
    <View style={{flex:1}}>
      <View style={{alignItems:'center'}}>
      <Image source={require('../images/veg.jpg')} style={{width:250,height:250}}/>
      </View> 
        <View style={{flexDirection:'row',marginTop:20,marginHorizontal:15}} >
        <Text style={{color:'#557732',fontSize:28,fontWeight:'bold'}}>
         {harvestItem.cropName}
        </Text>
         </View>
        <View >
        <View style={{flexDirection:'row',margin:15}}>
            <Text style={styles.text}>Harvest Date: </Text>
            <Text style={styles.text}>{HD.getFullYear()}/{HD.getMonth()}/{HD.getDay()}</Text>
        </View>
        <View style={styles.data}>
            <Text style={styles.text}>Team: </Text>
            <Text style={styles.text}>{harvestItem.workersName}</Text>
        </View>
        <View style={styles.data}>
            <Text style={styles.text}>Box size: </Text>
            <Text style={styles.text}>{harvestItem.boxSize}</Text>
        </View>
        <View style={styles.data}>
            <Text style={styles.text}>Amount: </Text>
            <Text style={styles.text}>{harvestItem.amount}</Text>
        </View>
        <View style={styles.data}>
            <Text style={styles.text}>Quality: </Text>
            <Text style={styles.text}>{harvestItem.quality}</Text>
        </View>
        <View style={styles.data}>
            <Text style={styles.text}>Note: </Text>
            <Text style={styles.text}>{harvestItem.note }</Text>
        </View>
        </View>
        <View style={{flexDirection:"row"}}>
        <TouchableOpacity style={{marginRight:10}} onPress={() => navigation.goBack()} >
          <AntDesign name="doubleleft" size={20} color="black" />
        </TouchableOpacity>
        <View style={{justifyContent:'center',alignItems:'center'}}>
        <TouchableOpacity style={{alignItems:'center',
        backgroundColor:'#889b63',
        width:80,
        height:50,
        padding:10,
        borderRadius: 8,
        justifyContent:'center'}}
       onPress={()=>setModalVisible(true)}
        >
              <Text style={{fontWeight:'600',fontSize:22,color:'white'}}> Sell it  </Text>
        </TouchableOpacity>
        </View >
        </View>
        <AddSales
           modalVisible={modalVisible}
           setModalVisible={setModalVisible}
           data={harvestItem}
            />
    </View>
  );
}

const styles = StyleSheet.create({
  text:{
    fontSize:18,
    fontWeight:'500',
    //color:'#3d5b35'
    // margin:15
  },
  data:{
    flexDirection:'row',
    margin:11
  }
})