import React , {useState , useEffect} from 'react';
import { StyleSheet, View,RefreshControl,ScrollView, Alert  } from 'react-native';
import { GlobalStyles } from '../constants/style';
import client from '../api/client';
import { useLogin } from '../context/LoginProvider';
import CropItem from './CropItem';

function CropOutput() {

  const {profile} = useLogin();
  const email = profile.email;
  const [refreshing, setRefreshing] = useState(false);
  const [crop,setCrop] = useState([]);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    async function fetchCrop() {
      try{ 
         await client.get(`/display-crops/${email}`)
        .then(result =>
          setCrop(result.data)
          )
        .catch(error => console.log(error))
      }
      catch(error){
        console.log(error)
      }
      }
  fetchCrop();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
useEffect(()=>{
  async function fetchCrop() {
    try{ 
       await client.get(`/display-crops/${email}`)
      .then(result =>
        setCrop(result.data)
        )
      .catch(error => console.log(error))
    }
    catch(error){
      console.log(error)
    }
    }
fetchCrop();
},[])
useEffect(()=>{
 crop.map(item => {
  let harvest = new Date(item.HarvestDate).getDay();
  let date = new Date(Date.now()).getDay(); 
  console.log("h",harvest);
  console.log("r",date);
  if(harvest == date){
    Alert.alert(`It is a harvest date for ${item.cropName}`)
  }
  // else{
  //   Alert.alert("There is no crop need to harvest today")
  // }
 })
},[crop])
    console.log(crop)
  return (
    <View >
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
      { crop.map((item,index) => {
        return(<CropItem crop={item} />)
        })
      }
      </ScrollView>
    </View>
  );
}


export default CropOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700
  }
});