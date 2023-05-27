import React, {useEffect, useLayoutEffect, useState} from 'react'
import {StyleSheet, View, TouchableOpacity,ScrollView,RefreshControl} from 'react-native'
import {Text, Avatar, ListItem} from 'react-native-elements'
import {StatusBar} from 'expo-status-bar'
import {AntDesign, Feather, FontAwesome5} from '@expo/vector-icons'
import CustomListItem from '../components/CustomListItem'
// import ModalActions from '../Edit/WorkerEdit'
import ModalActions from '../components/ModalActions'
import client from '../api/client'

export default function Expense({route,navigation}){
  const id=route.params.id;
  // console.log("id",id)
  const [totalIncome, setTotalIncome] = useState([])
  const [result , setResult]= useState([])
  const [totalExpense, setTotalExpense] = useState([])
  const [expense, setExpense] = useState(0)
  const [totalBalance, setTotalBalance] = useState(0)
  const [transactions, setTransactions] = useState([])
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    async function fetchExpense() {
      try{ 
        await client.get(`/display-expense/${id}`)
        .then(result =>{
          console.log(result.data)
          setResult(result.data.exps);
          setTotalExpense(result.data.totalExpense);
          setTotalIncome(result.data.totalIncome)})
        .catch(error => console.log(error))
      }
      catch(error){
        console.log(error)
      }
      }
  fetchExpense();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(()=>{
    async function fetchExpense() {
        console.log("idu",id)
        try{ 
            await client.get(`/display-expense/${id}`)
            .then(result =>{
              console.log(result.data)
              setResult(result.data.exps);
              setTotalExpense(result.data.totalExpense);
              setTotalIncome(result.data.totalIncome)
            }
            )
            .catch(error => console.log(error))
        }
        catch(error){
            console.log(error)
        }
            }
    fetchExpense();
 },[])
    const [modalVisible, setModalVisible] = useState(false)
return(
    <>
    <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
    <View style={{ marginTop:10  , flexDirection:"row"}}>
       <Text h4 style={{color: '#4A2D5D' ,paddingLeft:5}}>Expense Overview:</Text>
        <TouchableOpacity
          style={styles.plusButton}
          onPress={() => setModalVisible(true)}
          activeOpacity={0.5}
        >
          <AntDesign name='plus' size={20} color='white' />
        </TouchableOpacity>
    </View>
    <View style={styles.card}>
            <View style={styles.cardTop}>
                <Text style={{ textAlign: 'center', color: 'aliceblue' }}>
                    Total Balance
                </Text>
                <Text h3 style={{ textAlign: 'center', color: 'aliceblue' }}>
                { Number(totalIncome)-Number(totalExpense)}
                </Text>
            </View>
            <View style={styles.cardBottom}>
                <View>
                    <View style={styles.cardBottomSame}>
                        <Feather name='arrow-down' size={18} color='green' />
                        <Text
                            style={{
                                textAlign: 'center',
                                marginLeft: 5,
                            }}
                        >
                            Income
                        </Text>
                    </View>
                    <Text h4 style={{ textAlign: 'center' }}>
                      {totalIncome}
                    </Text>
                </View>
                <View>
                    <View style={styles.cardBottomSame}>
                        <Feather name='arrow-up' size={18} color='red' />
                        <Text style={{ textAlign: 'center', marginLeft: 5 }}>
                            Expense
                        </Text>
                    </View>
                    <Text h4 style={{ textAlign: 'center' }}>
                      {totalExpense}
                    </Text>
                </View>
            </View>
        </View><View style={styles.recentTitle}>
            <Text h4 style={{ color: '#4A2D5D' }}>
                Recent Transactions
            </Text>
        </View>
        <View style={styles.recentTransactions}>
          <ScrollView>
            {result.map((info) => (
              <View key={info.id}>
                <CustomListItem
                  info={info}
                  id={info.key}
                />
              </View>
            ))}
            </ScrollView>
          </View>
          <ModalActions modalVisible={modalVisible} setModalVisible={setModalVisible}  id={id}/>
     </ScrollView>
     </>
);
}

const styles = StyleSheet.create({
    container: {
      // backgroundColor: 'white',
      flex: 1,
      // alignItems: 'flex-start',
      // justifyContent: 'flex-start',
      // padding: 10,
    },
    fullName: {
      flexDirection: 'row',
    },
    card: {
      backgroundColor: '#535F93',
      alignItems: 'center',
      width: '98%',
      padding: 10,
      marginLeft:5,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
      marginVertical: 20,
    },
    cardTop: {
      // backgroundColor: 'blue',
      marginBottom: 20,
    },
    cardBottom: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      width: '100%',
      margin: 'auto',
      backgroundColor: '#E0D1EA',
      borderRadius: 5,
    },
    cardBottomSame: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    recentTitle: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
    },
    recentTransactions: {
      backgroundColor: 'white',
      width: '100%',
    },
    seeAll: {
      fontWeight: 'bold',
      color: 'green',
      fontSize: 16,
    },
    addButton: {
      position: 'absolute',
      bottom: 0,
      padding: 10,
      backgroundColor: 'white',
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 12,
      },
      shadowOpacity: 0.58,
      shadowRadius: 16.0,
  
      elevation: 24,
    },
    plusButton: {
      backgroundColor: '#535F93',
      marginLeft:110,
      padding: 10,
      borderRadius: 50,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 12,
        
      },
      shadowOpacity: 0.58,
      shadowRadius: 16.0,
      elevation: 24,
    },
    containerNull: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      width: '100%',
    },
  });