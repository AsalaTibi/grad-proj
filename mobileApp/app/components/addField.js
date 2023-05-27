import { StyleSheet, Text, TextInput, TouchableOpacity, View ,Modal} from 'react-native'
import React ,{useEffect,useState} from 'react'
import MapView ,{Marker,Callout}  from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import client from '../api/client';
import { useLogin } from '../context/LoginProvider';
import Return from 'react-native-vector-icons/AntDesign';
//import Geolocation from '@react-native-community/geolocation';

// const API_endpoint = `https://api.openweathermap.org/data/2.5/weather?`
// const API_key =`d54dbbd88955aec6784643ac27202b7c`;
const AddField = (props) => {

  const[title,setTitle]=useState('');
  const { profile} = useLogin();
  // const[latitude,setLatitude] = useState('');
  // const[longitude,setLongitude] = useState('');
  const[pin,setPin] = useState({
    latitude:13.406,
    longitude:123.3753,
  })

  const addField = async() =>{
    const res = await client.post('/add-field',{
      adminEmail:profile.email,
      title:title,
      location: {
        type: "Point",
        coordinates: [pin.latitude,pin.longitude]
  }})
    if(res.data.success){
      console.log('success')
      setTitle('')
    }
  }
    useEffect(() => {
        (async () => {
          
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
          let location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Highest, maximumAge: 10000});
          console.log(location.coords);
          setPin({
            latitude:location.coords.latitude,
            longitude:location.coords.longitude,
          })
        })();
        
      }, []);

  return (
    <Modal visible={props.visible} animationType="slide">
      <TouchableOpacity onPress={()=>{
              props.onclose()}}>
        <Return name="left" size={20} color='black' />
      </TouchableOpacity>
    <SafeAreaView  style={styles.container}>
      <View style={styles.titleContainer}>
      <Text style={styles.title}>Add Field</Text>
      </View>
      <View style={styles.inputContainer}>
      <Text>Field Name</Text>
      <TextInput 
      style={styles.input}
      value={title}
      onChangeText={text => setTitle(text)}
      />
      <Text>Detect the location</Text>
      <MapView
      style={styles.map}
      initialRegion={{
      latitude: 32.2242783,
      longitude: 35.2450083,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
     >
    <Marker
    coordinate={pin}
    draggable={true}
    onDragStart={(e)=>{
        console.log(e.nativeEvent.coordinate);
    }}
    onDragEnd={(e)=>{
        console.log(e.nativeEvent.coordinate)
        setPin({
          latitude:e.nativeEvent.coordinate.latitude,
          longitude:e.nativeEvent.coordinate.longitude,
        });
    }}
    
    >
    <Callout>
       <Text>This is a Callout</Text> 
    </Callout>
    </Marker>
    </MapView>
    <View style={styles.btnContainer}>
    <TouchableOpacity style={styles.btn} onPress={() => addField()}>
      <Text style={styles.btn_txt}>ADD</Text>
    </TouchableOpacity>
    </View>
    </View>
    </SafeAreaView>
    </Modal>
  )
}

export default AddField

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      titleContainer:{
        justifyContent:'center',
        alignItems:'center',
      },
      inputContainer:{
        marginHorizontal:20
      },
      input:{
        backgroundColor:'#ececee',
        width:200,
        height:30,
        marginTop:10,
        marginBottom:20
      },
      map: {
        width: '90%',
        height: 500,
        marginTop:10,
      },
      title:{
        fontSize:22,
        fontWeight:'500'
      },
      btn:{
          borderRadius:10,
          backgroundColor: '#73914b',
          height:45,
          width:200,
          padding:10,
          alignItems: 'center',
          justifyContent: 'center',
         // marginBottom:20,
          marginTop:20
      },
      btn_txt:{
        fontWeight:'500',
        fontSize:18
      },
      btnContainer:{
      alignItems:'center'
      }
    });