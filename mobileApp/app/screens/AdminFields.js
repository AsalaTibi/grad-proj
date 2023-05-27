import { StyleSheet, Text, View ,SafeAreaView} from 'react-native'
import React, { useEffect,useState } from 'react'
import client from '../api/client';
import { useLogin } from '../context/LoginProvider';
import MapView ,{Marker,Callout}  from 'react-native-maps';
import * as Location from 'expo-location';
import { async } from '@firebase/util';

const AdminFields = () => {
    const { profile } = useLogin();
    const[pin,setPin] = useState([])
    useEffect( async() => {
          const adminEmail = profile.email
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
          let location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Highest, maximumAge: 10000});
          console.log(location.coords);
          const res = await client.get(`/get-location/${adminEmail}`)
          .then(result =>
             setPin(result.data)
            )
          .then(console.log("success location"))
          .catch(error => console.log(error))
        
    },[]);
  return (
    <SafeAreaView  style={styles.container}>
      <MapView
      style={styles.map}
      initialRegion={{
      latitude: 32.2242783,
      longitude: 35.2450083,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
     >
      {
        pin.map((item,index) => {
          console.log(item)
          return(
            <Marker
              coordinate={{
                latitude:item.latitude,
                longitude:item.longitude
              }}
               key={index}
            >
              <Callout>
              <Text>{item.title}</Text>
              </Callout>
            </Marker>
           )
        })
      } 

    </MapView>
    </SafeAreaView>
  )
}
export default AdminFields


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
    backgroundColor:'white',
    width:200,
    height:30,
    marginTop:10,
    marginBottom:20
  },
  map: {
    width: '100%',
    height:'100%',
    //marginTop:10,
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
})