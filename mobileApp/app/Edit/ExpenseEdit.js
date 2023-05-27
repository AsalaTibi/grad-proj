import React ,{useState,useEffect} from "react";
import { StyleSheet,Modal,Pressable,  Alert, TextInput, View, Button,TouchableWithoutFeedback,Text,ScrollView,SafeAreaView, TouchableOpacity,KeyboardAvoidingView} from "react-native";
import {Formik} from 'formik';
import * as yup from 'yup';
import {Picker} from '@react-native-picker/picker';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DropDownPicker from 'react-native-dropdown-picker';
import { FontAwesome } from '@expo/vector-icons';
import format from 'date-fns/format'
//import client from '../api/client';
import {FontAwesome5, EvilIcons,AntDesign} from '@expo/vector-icons'
import {StatusBar} from 'expo-status-bar'
import FormSubmitButton from '../components/FormSubmitButton';
import axios from "axios";
import { SelectList, MultipleSelectList  } from 'react-native-dropdown-select-list';
import { MaterialCommunityIcons } from "@expo/vector-icons"
import DateTimePicker from '@react-native-community/datetimepicker';
import client from "../api/client";
import { useLogin } from "../context/LoginProvider";



export default function ExpenseEdit({modalVisible, setModalVisible, info }){
    // const SD = new Date(info.startingDate);
    console.log(info)
    const [selectedType, setSelectedType] = useState(info.typeExpense);  
    const [date, setDate] = useState(new Date(Date.now()));
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const [value, setValue] = useState([]);
    const [field, setField] = useState([]);
    const [open, setOpen] = useState(false);
    const [selDate, setSelDate] = useState(new Date())
    const [mode, setMode] = useState('date')
    const {profile} = useLogin();
    const [submitLoading, setSubmitLoading] = useState(false)
    const [input, setInput] = useState('')
    const email = profile.email ;
    const Name=info.Name;
    const amount=info.price.toString();
    const typeExpense=info.typeExpense;
    const HDate = new Date (info.HDate);


    const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date
    setShow(Platform.OS === 'ios')
    setSelDate(currentDate)
  } 
  const showDatepicker = () => {
    showMode('date')
  }
  const showMode = (currentMode) => {
    setShow(true)
    setMode(currentMode)
  }
  const result = format(selDate, 'dd/MM/yyyy')
    // useEffect(()=>{
    //     async function fetchFields() {
    //         try{ 
    //             await client.get(`/get-field/${email}`)
    //             .then(result =>
    //               setField(result.data)
    //             )
    //             .catch(error => console.log(error))
    //         }
    //         catch(error){
    //             console.log(error)
    //         }
    //             }
    //     fetchFields();
    //  },[])

    DropDownPicker.setListMode("SCROLLVIEW");
    // const {  profile } = useLogin();
    const updateExpense = async (values) => {

        console.log({...values})

          // const res = await client.put(`/updatecrop/${id}`, { email:email,cropName: values.CName, fieldName:selected2, startingDate:date,
          //    HarvestDate:date1,amount:values.amount ,price:values.price})
          //  if(res.data.success){
          //   console.log({...values})
          //   Alert.alert("updated successfully!")
          //  }
          //  else{
          //   console.log('error in axios')
          // }
        
    }


    return(
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
        setModalVisible(!modalVisible)
        }}
      >
      <KeyboardAvoidingView style={styles.container}>
      <StatusBar style='dark' />
      <Text style={{ fontSize:20, fontWeight:'bold',marginBottom:20}}>Edit Transactions</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder='Transaction Name'
          value={Name}
          onChangeText={(text) => setInput(text)}
        />

        {show && (
          <DateTimePicker
            testID='dateTimePicker'
            value={HDate}
            mode={mode}
            is24Hour={true}
            display='default'
            onChange={onChange}
          />
        )}

        <TextInput
          style={styles.input}
          keyboardType='numeric'
          placeholder='Add Amount'
          value={amount}
          onChangeText={(text) => setAmount(text)}
        />

        <Text
          style={styles.input}
          placeholder='Select Date'
          value={selDate}
          onPress={showDatepicker}
          // editable={false}
        >
          {result ? result : new Date()}
        </Text>
        <Picker
          selectedValue={selectedType}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedType(itemValue)
          }
        >
          <Picker.Item label='Expense' value='expense' />
          <Picker.Item label='Income' value='income' />
        </Picker>

        <TouchableOpacity  style={styles.button}   onPress={updateExpense}
          loading={submitLoading}>
            <Text style={{color:'white' , fontSize:20, fontWeight:'bold'}}>Add</Text>
          </TouchableOpacity>  
      </View>
    </KeyboardAvoidingView>
      </Modal>
    );

}



const styles=StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  inputContainer: {
    width: 250,
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  button: {
    alignItems: "center",
    backgroundColor: '#889b63',
    padding: 10,
    width:'70%',
    marginTop:20,
    height: 45,
    borderRadius: 8,
    justifyContent: 'center',
    
  },
    note:{
        height:120,
        margin:20,
        padding:10,
        borderColor:'gray',
        borderWidth:1,
        borderRadius:25,
        backgroundColor: "#f8f4f4",

     },
  
      header:{
        
        fontSize: 13,
        fontWeight: "bold",
        margin:10

      },
      Datecontainer: {
        backgroundColor: "#f8f4f4",
        borderRadius: 25,
        flexDirection: "row",
        padding: 15,
        marginVertical: 10,
        width:'70%',
        margin:20,
        borderColor:'gray',
        borderWidth:1,
    },
    placeholder: {
        color: "#6e6969",
        flex: 1,

    },
    handleIcons: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      width: '100%',
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    closeIcon: {
      position: 'absolute',
      top: 0,
      right: 0,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      // backgroundColor: '#2196F3',
      marginHorizontal: 5,
      marginVertical: 5,
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
});