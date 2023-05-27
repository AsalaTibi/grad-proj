import React , {useState , useEffect} from 'react';
import { StyleSheet, View ,Alert,RefreshControl,ScrollView} from 'react-native';
import client from '../api/client';
import { useLogin } from '../context/LoginProvider';
import EqCard from '../components/EqCard';

function Eqoutput() {

  const {profile} = useLogin();
  const email = profile.email;
  const [Item,setItem] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    async function fetchSales() {
      try{ 
         await client.get(`/display-equipment/${email}`)
        .then(result =>
          setItem(result.data)
          )
        .catch(error => console.log(error))
      }
      catch(error){
        console.log(error)
      }
      }
  fetchSales();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const deleteEq = (id,index) => {
    const res =  client.delete(`/delete-Eq/${id}`)
    .then((res)=>{
      Alert.alert("Successfully Deleted")
      const updateList = [...Item];
      updateList.splice(index,1);
      setItem(updateList)
    })
    .catch(err => console.log(err))
  } 

useEffect(()=>{
  async function fetchSales() {
    try{ 
       await client.get(`/display-equipment/${email}`)
      .then(result =>
        setItem(result.data)
        )
      .catch(error => console.log(error))
    }
    catch(error){
      console.log(error)
    }
    }
fetchSales();
},[])


  return (
    <View >
      <ScrollView
        contentContainerStyle={styles.container1}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
      { Item.map((item,index) => {
      
        return(
          
          <EqCard item={item} index={index}  handleDelete={deleteEq}/>
                  )
        })
        
      }
   </ScrollView>
    </View>
  );
}


export default Eqoutput;

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    // backgroundColor: GlobalStyles.colors.primary700
  }
});