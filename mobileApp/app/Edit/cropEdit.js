import React ,{useState,useEffect} from "react";
import { StyleSheet,Modal,Pressable,  Alert, TextInput ,View, Button,TouchableWithoutFeedback,Text,ScrollView,SafeAreaView, TouchableOpacity} from "react-native";
import {Formik} from 'formik';
import * as yup from 'yup';
import {Picker} from '@react-native-picker/picker';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DropDownPicker from 'react-native-dropdown-picker';
import { FontAwesome } from '@expo/vector-icons';
//import client from '../api/client';
import {FontAwesome5, EvilIcons,AntDesign} from '@expo/vector-icons'
import FormSubmitButton from '../components/FormSubmitButton';
import axios from "axios";
import { SelectList, MultipleSelectList  } from 'react-native-dropdown-select-list';
import { MaterialCommunityIcons } from "@expo/vector-icons"
import DateTimePicker from '@react-native-community/datetimepicker';
import client from "../api/client";
import { useLogin } from "../context/LoginProvider";



export default function CropEdit({modalVisible, setModalVisible, info,id }){
    // const SD = new Date(info.startingDate);
    const [selected2, setSelected2] = useState([]);  
    const [date, setDate] = useState(new Date(Date.now()));
    const [show, setShow] = useState(false);
    const [date1, setDate1] = useState(new Date(Date.now()));
    const [show1, setShow1] = useState(false);
    const [value, setValue] = useState([]);
    const [field, setField] = useState([]);
    const [open, setOpen] = useState(false);
    const {profile} = useLogin();
    const email = profile.email ;

    console.log(info)
    const onChange = (event, selectedDate) => {
        setShow(false);
        if (selectedDate)
            setDate(selectedDate);
    };
    const onChange1 = (event, selectedDate) => {
        setShow1(false);
        if (selectedDate)
            setDate1(selectedDate);
    };
    
    useEffect(()=>{
        async function fetchFields() {
            try{ 
                await client.get(`/get-field/${email}`)
                .then(result =>
                  setField(result.data)
                )
                .catch(error => console.log(error))
            }
            catch(error){
                console.log(error)
            }
                }
        fetchFields();
     },[])

    DropDownPicker.setListMode("SCROLLVIEW");
    // const {  profile } = useLogin();
    const addCrop = async (values, formikActions) => {

        console.log({...values})

          const res = await client.put(`/updatecrop/${id}`, { email:email,cropName: values.CName, fieldName:selected2, startingDate:date,
             HarvestDate:date1,amount:values.amount ,price:values.price})
           if(res.data.success){
            console.log({...values})
            Alert.alert("updated successfully!")
           }
           else{
            console.log('error in axios')
          }
        formikActions.resetForm();
        formikActions.setSubmitting(false);
        setValue();
    }


    return(
      <SafeAreaView>
      <View style={styles.centeredView}>
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.')
          setModalVisible(!modalVisible)
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.closeIcon}>
              <Pressable
                style={[styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <FontAwesome5 name='times-circle' size={24} color='black' />
              </Pressable>
            </View>
  
     
        <Formik
        initialValues={{price:info.price.toString(),amount:info.amount.toString(),CName:info.cropName }}
        onSubmit={ addCrop }
        >
            {({
          values,
          errors,
          touched,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
        })=>{
            const {price, amount,CName} = values;
         return (
           
                <View>
                     <View style={{flexDirection:'row' ,   alignContent:'center' }}>
                    <Text style={{ fontWeight:'bold' , fontSize:15 , margin:13, marginHorizontal:20}}>CropType :</Text>
                    <TextInput value={CName}
                        onChangeText={handleChange('CName')}
                        placeholder={"Crops Name"}
                        style={{ width:'60%' ,borderColor:'gray',
                        borderWidth:1, borderRadius:25, padding:10,backgroundColor:"#f8f4f4", height:40 
                        }}/>

                 </View> 
                 <View style={{flexDirection:'row' ,   alignContent:'center' }}>
                    <Text style={{ fontWeight:'bold' , fontSize:15 , margin:13, marginHorizontal:20}}>Amount :   </Text>
                    <TextInput value={amount}
                        onChangeText={handleChange('amount')}
                        placeholder={"# of crops "}
                        style={{ width:'60%' ,borderColor:'gray',
                        borderWidth:1, borderRadius:25, padding:10,backgroundColor:"#f8f4f4", height:40
                        }}/>

                 </View>
                 <View style={{flexDirection:'row' ,   alignContent:'center' }}>

                    <Text style={{ fontWeight:'bold' , fontSize:15 , margin:13, marginHorizontal:20}}>Price :       </Text>
                    <TextInput value={price}
                        onChangeText={handleChange('price')}
                        placeholder={"price for each"}
                        style={{ width:'60%' ,borderColor:'gray',
                        borderWidth:1, borderRadius:25, padding:10,backgroundColor:"#f8f4f4", height:40 
                        }}/>

                 </View>
                   <Text style={{ fontWeight:'bold' , fontSize:15 , margin:5, marginHorizontal:20}}>Field to work on :</Text>
                   <SelectList 
                        onSelect={()=>selected2}
                        setSelected={setSelected2} 
                        //fontFamily='lato'
                        data={field}  
                        arrowicon={<FontAwesome name="chevron-down" size={12} color={'black'} />} 
                        searchicon={<FontAwesome name="search" size={12} color={'black'} />} 
                        search={false} 
                        placeholder="Choose a Field "
                        label="Choosen Equipment"                        
                        boxStyles={{borderRadius:25,width:'70%' ,margin:20, backgroundColor: "#f8f4f4" ,color:"#6e6969"}}
                        defaultOption={{ key:info.fieldName , value:info.fieldName }}   //default selected option
                        />
              <Text style={{ fontWeight:'bold' , fontSize:15 , margin:5, marginHorizontal:20}}> Starting Date: </Text>

             <TouchableWithoutFeedback onPress={() => {
                        setShow(true);
                    }}
                    >
                        <View style={styles.Datecontainer}>
                            <Text style={styles.placeholder}> {!date ? info.HarvestDate : date.toDateString()}</Text>
                            <MaterialCommunityIcons
                                name="chevron-down"
                                size={20}
                                color={'#6e6969'}
                            />
                          
                        </View>
            </TouchableWithoutFeedback>
            
                 <Text style={{ fontWeight:'bold' , fontSize:15 , margin:5, marginHorizontal:20}}> Harvest Date: </Text>

                 <TouchableWithoutFeedback onPress={() => {
                        setShow1(true);
                    }}
                    >
                        <View style={styles.Datecontainer}>
                            <Text style={styles.placeholder}>{!date1 ? info.HarvestDate : date1.toDateString()}</Text>
                            <MaterialCommunityIcons
                                name="chevron-down"
                                size={20}
                                color={'#6e6969'}
                            />
                          
                        </View>
            </TouchableWithoutFeedback>

                  
               
               <FormSubmitButton
                submitting={isSubmitting}
                onPress={handleSubmit}
                title='Update'
              />


                </View>
        )}}

        </Formik>
                {show && (
                            <DateTimePicker
                                testID="DeadlinePicker"
                                value={date}
                                mode={"date"}
                                is24Hour={true}
                                onChange={onChange}
                            />
                        )}
                          {show1 && (
                            <DateTimePicker
                                testID="DeadPicker"
                                value={date1}
                                mode={"date"}
                                is24Hour={true}
                                onChange={onChange1}
                            />
                        )}
                     
                     </View>
        </View>
      </Modal>
    </View>

     </SafeAreaView>
     
    );

}



const styles=StyleSheet.create({
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