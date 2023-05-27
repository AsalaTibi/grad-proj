import { StyleSheet, Text, View,Image,TouchableOpacity,RefreshControl,ScrollView } from 'react-native'
import React, { useState,useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useLogin } from '../context/LoginProvider'
import client from '../api/client'
// import { ScrollView } from 'react-native-gesture-handler'
import Email from 'react-native-vector-icons/MaterialCommunityIcons';
import Phone from 'react-native-vector-icons/FontAwesome';
import Address from 'react-native-vector-icons/FontAwesome';
import Salary from 'react-native-vector-icons/MaterialIcons';
import EditWorker from '../Edit/WorkerEdit'
import WorkerCard from '../components/WorkerCard'

const Workers = () => {
    const [worker,setWorker]=useState([]);
    const {profile} = useLogin();
    const email = profile.email;
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      async function fetch() {
       try{ 
        await client.get(`/get-workers/${email}`)
        .then(result =>
          setWorker(result.data)
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
        async function fetchWorker() {
          try{ 
             await client.get(`/get-workers/${email}`)
            .then(result =>
              setWorker(result.data)
              )
            .catch(error => console.log(error))
          }
          catch(error){
            console.log(error)
          }
          }
      fetchWorker();
      },[])
      
      function deleteWorker(id){
        const res =  client.delete(`/delete-crop/${id}`)
        .then((res)=>{
          Alert.alert("Successfully Deleted")
        })
        .catch(err => console.log(err))
      }
  return (
    <View >
         <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {/* <ScrollView 
        contentContainerStyle={{
            padding:20,
            // backgroundColor:"white"
        }}> */}
        <View style={styles.headerBar}>
           <Text style={styles.txtHeader}>Workers List</Text>
        </View>
        <View>
            {worker.map((element,index) => {
               return(
                 <WorkerCard item={element} index={index}/>
               )        
            })
            }
        </View>
        </ScrollView>
    </View>
  )
}

export default Workers

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