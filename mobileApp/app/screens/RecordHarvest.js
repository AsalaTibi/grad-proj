import React ,{useEffect, useState} from "react";
import { StyleSheet, TextInput ,View,Modal, Button,TouchableWithoutFeedback,Text,ScrollView,SafeAreaView, TouchableOpacity    } from "react-native";
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

const RecordHarvest = (props) => {
   const [selectedTeam, setSelectedTeam] = useState([]);
   const [selectedBox, setSelectedBox] = useState();
   const [selectedField, setSelectedField] = useState("");
   const [selectedQuality, setSelectedQuality] = useState("");

   const [boxSize, setBoxSize] = useState([
       { label: "12 kg", value: 12 },
       { label: '50 Kg', value: 50},
       { label: '100 Kg', value:100},
       { label: '500 Kg', value:500},
   ]);
   const [date, setDate] = useState(new Date(Date.now()));
   const [show, setShow] = useState(false);
   const [team, setTeam] = useState([]);
   const [quality, setQuality] = useState([
    {label:"low",value:"Low"},
    {label:"low",value:"Moderate"},
    {label:"low",value:"High"},
   ]);
   const [field, setField] = useState('');
   const [open, setOpen] = useState(false);
//    const [amount,setAmount] = useState('');
//    const [note,setNote] = useState('');

   const {  profile ,adminEmail} = useLogin();

    useEffect(()=>{
       const email = adminEmail;
       async function fetchWorkers() {
           try{ 
              await client.get(`/get-worker/${email}`)
               .then(result =>
               setTeam(result.data)
               )
             .catch(error => console.log(error))
           }
           catch(error){
             console.log(error)
           }
           }
       fetchWorkers();
       async function fetchFields() {
        try{ 
            await client.get(`/get-fieldCrop/${email}`)
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
   console.log("team",team)
   DropDownPicker.setListMode("SCROLLVIEW");

   const addHarvest = async (values,formikActions) => {

         const res =  await client.post('/add-harvest',{adminEmail:adminEmail,workersName:selectedTeam,fieldName:selectedField,submitDate:date,boxSize:selectedBox,amount:values.amount,quality:selectedQuality,note:values.note})
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
       initialValues={{amount:'',note:'', }}
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
         const {amount, note} = values;
        return (
          
           <View>
               {/* <Text style={{ fontWeight:'bold' , fontSize:15 , margin:5, marginHorizontal:20}}> Date </Text>
               <TouchableWithoutFeedback onPress={() => {setShow(true); }} >
                   <View style={styles.Datecontainer}>
                        <Text style={styles.placeholder}>{!date ? "Deadline" : date.toDateString()}</Text>
                        <MaterialCommunityIcons
                            name="chevron-down"
                            size={20}
                            color={'#6e6969'}
                        />
                    </View>
                </TouchableWithoutFeedback> */}
               {/* <Text style={{ fontWeight:'bold' , fontSize:15 , margin:5, marginHorizontal:20}}>Field</Text> */}
               {/* <SelectList 
                       onSelect={()=>selectedField}
                       setSelected={setSelectedField} 
                       data={field}  
                       arrowicon={<FontAwesome name="chevron-down" size={12} color={'black'} />} 
                       searchicon={<FontAwesome name="search" size={12} color={'black'} />} 
                       search={false} 
                       placeholder="Choose a Field "                
                       boxStyles={{borderRadius:25,width:'90%' ,margin:10, backgroundColor: "#f8f4f4" ,color:"#6e6969"}}
                       defaultOption={{ key:'1', value:'' }}   //default selected option
                       />   */}
                    <Text style={{ fontWeight:'bold' , fontSize:15 , margin:5, marginHorizontal:20}}>Box size</Text>
                    <View style={{flexDirection:'row'}}> 
                    <SelectList 
                            onSelect={()=>selectedBox}
                            setSelected={setSelectedBox} 
                            data={boxSize}  
                            arrowicon={<FontAwesome name="chevron-down" size={12} color={'black'} />} 
                            searchicon={<FontAwesome name="search" size={12} color={'black'} />} 
                            search={false} 
                            placeholder="Box size in Kg "                    
                            boxStyles={{borderRadius:25,margin:10, backgroundColor: "#f8f4f4" ,color:"#6e6969"}}
                            defaultOption={{ key:'1', value:'' }}   //default selected option
                            />
                     <TextInput 
                      value={amount}
                      onChangeText={handleChange('amount')}
                       placeholder={"Amount"}
                       style={{width:'35%' ,borderColor:'gray',
                       borderWidth:1, borderRadius:25, padding:15,backgroundColor:"#f8f4f4", height:45 ,margin:10
                       }}/>
                </View>
                <Text style={{ fontWeight:'bold' , fontSize:15 , margin:5, marginHorizontal:20}}>Quality</Text>
                    <SelectList 
                            onSelect={()=>selectedQuality}
                            setSelected={setSelectedQuality} 
                            data={quality}  
                            arrowicon={<FontAwesome name="chevron-down" size={12} color={'black'} />} 
                            searchicon={<FontAwesome name="search" size={12} color={'black'} />} 
                            search={false} 
                                                
                            boxStyles={{borderRadius:25,width:'80%' ,margin:10, backgroundColor: "#f8f4f4" ,color:"#6e6969"}}
                            defaultOption={{ key:'1', value:'' }}   //default selected option
                            />
             <Text style={{ fontWeight:'bold' , fontSize:15 , margin:5, marginHorizontal:20}}>Team</Text>
               < MultipleSelectList 
                       onSelect={() =>{selectedTeam}}
                       setSelected={setSelectedTeam} 
                       // fontFamily='lato'
                       data={team}  
                       arrowicon={<FontAwesome name="chevron-down" size={12} color={'black'} />} 
                       searchicon={<FontAwesome name="search" size={12} color={'black'} />} 
                       search={false} 
                       placeholder="Select Worker Team"
                       boxStyles={{borderRadius:25,width:'90%' ,margin:10, backgroundColor: "#f8f4f4" ,color:"#6e6969"}} //override default styles
                       defaultOption={{ key:'1', value:'Jammu & Kashmir' }}   //default selected option
               />
                <TextInput  placeholder="Add a comment (optional) "
                style={styles.note}
                value={note}
                onChangeText={handleChange('note')}
                multiline={true}
                numberOfLines={4}
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
export default RecordHarvest;

const styles=StyleSheet.create({
   note:{
       height:80,
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