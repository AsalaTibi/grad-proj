import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View ,Image,RefreshControl,ScrollView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackActions } from '@react-navigation/native';
import AddWorker from './addWorker';
import AddField from './addField';
import ReviewJobForm from './Tasks';
import React,{useState} from 'react';
import AddCrop from './AddCrops';
import AddHarvest from './AddHarvest' 
import CropForm from '../screens/CropsContainer';
import Addequipment from './AddEq';

export default function AddPage() {
  const[ModalIsVisible , setModalIsVisible]=useState(false);
    const[WorkerIsVisible , setWorkerIsVisible]=useState(false);
    const[EquIsVisible , setEquIsVisible]=useState(false);
    const[JobIsVisible , setJobIsVisible]=useState(false);
    const[HarvestIsVisible , setHarvestIsVisible]=useState(false);
    const[CropIsVisible , setCropIsVisible]=useState(false);
    const [refreshing, setRefreshing] = useState(false);

    function showModal() {setModalIsVisible(true); }
    function endModalShow(){setModalIsVisible(false);}

    function showModal1() {setWorkerIsVisible(true);}
    function endModalShow1(){setWorkerIsVisible(false);}

    function showModal2() {setEquIsVisible(true); }
    function endModalShow2(){setEquIsVisible(false);}

    function showModal3() {setJobIsVisible(true); }
    function endModalShow3(){setJobIsVisible(false);}

    function showModal4() {setHarvestIsVisible(true); }
    function endModalShow4(){setHarvestIsVisible(false);}

    function showModal5() {setCropIsVisible(true); }
    function endModalShow5(){setCropIsVisible(false);}

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
    }, []);

  return (
    <View >
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
      
      <TouchableOpacity style={styles.btn_style} onPress={showModal}>
        <Text style={styles.text_btn}>Add Field</Text>
      </TouchableOpacity>
      <AddField  visible={ModalIsVisible} onclose={endModalShow}/>

      <TouchableOpacity style={styles.btn_style} onPress={showModal1}>
        <Text style={styles.text_btn}>Add Worker</Text>
      </TouchableOpacity>
      <AddWorker visible={WorkerIsVisible} onclose={endModalShow1} />

      <TouchableOpacity style={styles.btn_style} onPress={showModal3} >
        <Text style={styles.text_btn}>Add Task</Text>
      </TouchableOpacity>
      <ReviewJobForm  visible={JobIsVisible} onclose={endModalShow3}/>

      <TouchableOpacity style={styles.btn_style} onPress={showModal5}>
        <Text style={styles.text_btn}>Add Crops</Text>
      </TouchableOpacity>
      <CropForm  visible={CropIsVisible} onclose={endModalShow5}/>

      <TouchableOpacity style={styles.btn_style} onPress={showModal4}>
        <Text style={styles.text_btn}>Add Harvest</Text>
      </TouchableOpacity>
      <AddHarvest visible={HarvestIsVisible} onclose={endModalShow4}/>

      <TouchableOpacity style={styles.btn_style} onPress={showModal2}>
        <Text style={styles.text_btn}>Add Equipment</Text>
      </TouchableOpacity>
      <Addequipment visible={EquIsVisible} onclose={endModalShow2}/>

      <View>
        <Image 
        source={require('../images/adding.jpg')}
        // source={require('../images/harvest.jpg')}
        ></Image>
      </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // marginTop:60
    justifyContent: 'center',
    
  },
  btn_style: {
    // backgroundColor: '#fff',
    margin: 10,
    height: 55,
    width: 180,
    padding:10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:20,
  },
  text_btn: {
    fontWeight: 'bold',
    fontSize: 18,
    justifyContent:'center'
  },
  x_btn:{
    borderRadius:30,
    backgroundColor: '#73914b',
    height:60,
    width:60,
    padding:10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom:20,
    marginTop:20
  },
  text_x: {
    fontWeight: 'bold',
    fontSize: 25,
    justifyContent:'center'
  },
});
