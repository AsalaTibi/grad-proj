import React ,{useEffect, useState} from "react";
import { StyleSheet, TextInput ,View,Modal, Button,TouchableWithoutFeedback,Text,ScrollView,SafeAreaView, TouchableOpacity, ImageBackground    } from "react-native";
import {Formik} from 'formik';
import * as yup from 'yup';
import {Picker} from '@react-native-picker/picker';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { SelectList, MultipleSelectList  } from 'react-native-dropdown-select-list';
import { FontAwesome } from '@expo/vector-icons';
import client from '../api/client';
import axios from 'axios';
import { useLogin } from '../context/LoginProvider';
import Return from 'react-native-vector-icons/AntDesign';

export default function AddHarvest(props) {
    const [selectedField, setSelectedField] = useState("");
    const [selectedWorkers, setSelectedWorkers] = useState([]);
    const [selected2, setSelected2] = useState("");

   
    const [date, setDate] = useState(new Date(Date.now()));
    const [show, setShow] = useState(false);
    const [workers, setWorkers] = useState([]);
    const [field, setField] = useState([]);


    const {  profile } = useLogin();

     useEffect(()=>{
        async function fetchWorkers() {
            console.log(profile.email)
            const email = profile.email
            try{ 
               await client.get(`/get-worker/${email}`)
              .then(result =>
                setWorkers(result.data)
                )
              .catch(error => console.log(error))
            }
            catch(error){
              console.log(error)
            }
            }
        fetchWorkers();
        async function fetchFields() {
            const email = profile.email
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
    const onChange = (event, selectedDate) => {
        setShow(false);
        if (selectedDate)
            setDate(selectedDate);
    };


    DropDownPicker.setListMode("SCROLLVIEW");

    const addHarvest = async (values, formikActions) => {
           console.log("add harvest")
          const res = await client.post("/add-Task",{ adminEmail:profile.email,workersName: selectedWorkers,jopType:'Harvest',taskStatues:'not completed', fieldName: selectedField , deadline: date 
          ,isDone:false, ...values
               })
           if(res.data.success){
            console.log(res.data)
           }
           else{
            console.log('error in axios')
          }
        formikActions.resetForm();
        formikActions.setSubmitting(false);
        setDate(new Date());
    } 
    return(
        <Modal visible={props.visible} animationType="slide" >
        <SafeAreaView>
        <TouchableOpacity onPress={()=>{
              props.onclose()}}>
           <Return name="left" size={20} color='black' />
        </TouchableOpacity>
        <Formik
        initialValues={{duration:'',note:'', }}
        onSubmit={addHarvest}
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
            const {duration, note} = values;
         return (
           
            <View>
                <Text style={{ fontWeight:'bold' , fontSize:15 , margin:5, marginHorizontal:20}}>Field to work on</Text>
                <SelectList 
                        onSelect={()=>selectedField}
                        setSelected={setSelectedField} 
                        //fontFamily='lato'
                        data={field}  
                        arrowicon={<FontAwesome name="chevron-down" size={12} color={'black'} />} 
                        searchicon={<FontAwesome name="search" size={12} color={'black'} />} 
                        search={false} 
                        placeholder="Choose a Field "
                                               
                        boxStyles={{borderRadius:25,width:'90%' ,margin:10, backgroundColor: "#f8f4f4" ,color:"#6e6969"}}
                        defaultOption={{ key:'1', value:'' }}   //default selected option
                        />
              <Text style={{ fontWeight:'bold' , fontSize:15 , margin:5, marginHorizontal:20}}>Choose farmers</Text>

                < MultipleSelectList 
                        onSelect={() =>{selectedWorkers}}
                        setSelected={setSelectedWorkers} 
                        // fontFamily='lato'
                        data={workers}  
                        arrowicon={<FontAwesome name="chevron-down" size={12} color={'black'} />} 
                        searchicon={<FontAwesome name="search" size={12} color={'black'} />} 
                        search={false} 
                        placeholder="choose from your worker"
                        label="Choosen Worker"
                        
                        boxStyles={{borderRadius:25,width:'90%' ,margin:10, backgroundColor: "#f8f4f4" ,color:"#6e6969"}} //override default styles
                        defaultOption={{ key:'1', value:'Jammu & Kashmir' }}   //default selected option
                />
        
            <Text style={{ fontWeight:'bold' , fontSize:15 , margin:5, marginHorizontal:20}}> Date doing the task</Text>

             <TouchableWithoutFeedback onPress={() => {
                        setShow(true);
                    }}
                    >
                        <View style={styles.Datecontainer}>
                            <Text style={styles.placeholder}>{!date ? "Deadline" : date.toDateString()}</Text>
                            <MaterialCommunityIcons
                                name="chevron-down"
                                size={20}
                                color={'#6e6969'}
                            />
                        </View>
            </TouchableWithoutFeedback>
             <View style={{flexDirection:'row' ,   alignContent:'center' }}>
                    <Text style={{ fontWeight:'bold' , fontSize:15 , margin:15, marginHorizontal:20}}> Expected time :</Text>
                    <TextInput 
                        value={duration}
                        onChangeText={handleChange('duration')}
                        placeholder={"Hours needed"}
                        style={{ width:'35%' ,borderColor:'gray',
                        borderWidth:1, borderRadius:25, padding:15,backgroundColor:"#f8f4f4", height:50 
                        }}/>

                 </View>

                    <TextInput  placeholder="If there is a note ! "
                    style={styles.note}
                    value={note}
                    onChangeText={handleChange('note')}
                    multiline={true}
                    numberOfLines={4}
                    //autoFocus={true}
                    />   
               

                <Button color='#73914b' title="Submit"  onPress={!isSubmitting ? handleSubmit : null}  /> 
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
                        {/* </ScrollView> */}
     </SafeAreaView>
     </Modal>
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
        width:'90%',
        margin:20,
        borderColor:'gray',
        borderWidth:1,
    },
    placeholder: {
        color: "#6e6969",
        flex: 1,

    }
});