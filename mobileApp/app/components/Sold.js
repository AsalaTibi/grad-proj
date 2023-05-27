import React , {useState , useEffect} from 'react';
import { StyleSheet, View,Text,ScrollView,RefreshControl } from 'react-native';
import { GlobalStyles } from '../constants/style';
import client from '../api/client';
import axios from 'axios';
import { useLogin } from '../context/LoginProvider';


function SOutput() {

  const {profile} = useLogin();
  const email = profile.email;
  const [Item,setItem] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    async function fetchSales() {
      try{ 
         await client.get(`/fetch-Sales/${email}`)
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
useEffect(()=>{
  async function fetchSales() {
    try{ 
       await client.get(`/fetch-Sales/${email}`)
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
    console.log(Item)
  return (
    <View >
       <ScrollView
        contentContainerStyle={styles.container1}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
      { Item.map((item,index) => {
        return(
            <View style={styles.mainCardView}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={styles.subCardView}>
                {/* <Image
          // source={require('./d.png')}
          resizeMode="contain"
                  style={{
                    borderRadius: 25,
                    height: 50,
                    width: 50,
                  }}
                /> */}
              </View>
              <View style={{marginLeft: 12}}>
                <Text
                  style={{
                    fontSize: 16,
                    color: 'black',
                    fontWeight: 'bold',
                   // fontFamily: Fonts.nunitoBold,
                    textTransform: 'capitalize',
                  }}>
                  {item.name}
                </Text>
                <View
                  style={{
                    marginTop: 20,
                    borderWidth: 0,
                   flexDirection:'row'
                  }}>
                  <Text
                    style={{
                      color: 'gray',
                      fontSize: 12,
                    }}>
                    Box Size : Number({item.boxSize})
                  </Text>
                  <Text
                    style={{
                      color: 'gray',
                      fontSize: 12,
                      marginLeft:5
                    }}>
                     , Quality :{item.quality}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                height:35,
                backgroundColor: '#889b63',
                borderWidth: 0,
                width: 40,
                marginLeft: -26,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
              }}>
              <Text style={{color: 'white'}}>
              {item.price}
              </Text>
            </View>
          </View>
                  )
        })
      }
      </ScrollView>
    </View>
  );
}


export default SOutput;

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700
  }, container: {
    flex: 1,
    backgroundColor:'white',
  },
  mainCardView: {
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    
    elevation: 4,
 
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 14,
    marginTop: 6,
    marginBottom: 6,
    marginLeft: 16,
    marginRight: 16,
  },
  subCardView: {
    height: 50,
    width: 50,
    borderRadius: 25,
    //backgroundColor: Colors.history_back,
    borderColor: "#EEEEEE",
    borderWidth: 1,
    borderStyle: 'solid',
    alignItems: 'center',
    justifyContent: 'center',
  },
});