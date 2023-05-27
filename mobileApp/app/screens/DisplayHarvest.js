import { StyleSheet, Text, View,RefreshControl,ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native';
import { areIntervalsOverlapping } from 'date-fns';
import { useLogin } from '../context/LoginProvider';
import client from '../api/client';
import { AntDesign } from '@expo/vector-icons';

const DisplayHarvest = ({navigation}) => {
   const{profile} = useLogin();
   const [harvest,setHarvest] = useState([]);
   const [refreshing, setRefreshing] = useState(false);

   const onRefresh = React.useCallback(() => {
     setRefreshing(true);
     async function fetch() {
      try{ 
        const email = profile.email;
        await client.get(`/fetch-harvest/${email}`)
       .then(result =>
         setHarvest(result.data)
         )
       .catch(error => console.log(error))
     }
     catch(error){
       console.log(error)
     }
       }
     fetch();
     setTimeout(() => {
       setRefreshing(false);
     }, 2000);
   }, []);

   useEffect(()=>{
      async function fetchHarvest() {
        try{ 
           const email = profile.email;
           await client.get(`/fetch-harvest/${email}`)
          .then(result =>
            setHarvest(result.data)
            )
          .catch(error => console.log(error))
        }
        catch(error){
          console.log(error)
        }
        }
      fetchHarvest();

    },[])
    console.log("har",harvest)
  return (
    <View>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
      <View style={styles.wrapperHeadTopHarvest}>
         <Text style={styles.tittleTopProducts}>My Harvest fields</Text>
      </View>
      
      <View style={styles.sectionBoxTopProduct}>
      { harvest.map((element)=>{
        return(<TouchableOpacity onPress={()=>navigation.navigate('Details',{harvestItem:element})} style={styles.containerBox}>
        <View style={{top: 40}}>
           <Text style={styles.text}>{element.fieldName}</Text>
        </View>
        </TouchableOpacity>)
      })
      }
      </View>
      <View
              style={{
                height:35,
               // backgroundColor: '#889b63',
                borderWidth: 0,
                width: 40,
                marginLeft: -26,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                flexDirection:'column'
              }}>
            </View>
            </ScrollView>
    </View>
  )
}

export default DisplayHarvest

const styles = StyleSheet.create({
   wrapperHeadTopHarvest:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      marginBottom: 10,
   },
   tittleTopProducts: {
      color:"black",
      // fontFamily: fonts.SemiBold,
      fontSize: 25,
      fontWeight:'bold'
    },
    textSeeAll: {
      // color: colors.black,
      // fontFamily: fonts.Medium,
      fontSize: 12,
    },
    sectionBoxTopProduct: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    containerBox:{
      height: 130,
      width: 130,
      borderRadius: 12,
      marginHorizontal: 16,
      marginVertical: 40,
      backgroundColor:'#bbd4a7',
      alignItems:'center',
      color:'black'
    },
    text: {
      paddingLeft: 10,
      fontSize: 22,
      color:'white',
      //fontWeight:'bold'
      // fontFamily: fonts.Medium,
    },
    scrollView: {
      flex: 1,
    },
})