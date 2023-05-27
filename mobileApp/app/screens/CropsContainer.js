import React ,{useState,useEffect} from "react";
import { StyleSheet, TextInput ,View, Button,TouchableWithoutFeedback,Text,ScrollView,SafeAreaView,TouchableOpacity,Modal} from "react-native";
import {Formik} from 'formik';
import * as yup from 'yup';
import {Picker} from '@react-native-picker/picker';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DropDownPicker from 'react-native-dropdown-picker';
import { FontAwesome } from '@expo/vector-icons';
import FormSubmitButton from '../components/FormSubmitButton';
import { EvilIcons } from '@expo/vector-icons';
import axios from "axios";
import { SelectList, MultipleSelectList  } from 'react-native-dropdown-select-list';
import { MaterialCommunityIcons } from "@expo/vector-icons"
import DateTimePicker from '@react-native-community/datetimepicker';
import client from "../api/client";
import { useLogin } from "../context/LoginProvider";
import Return from 'react-native-vector-icons/AntDesign';

export default function CropForm(props){
   
    const {profile}=useLogin();
    const email = profile.email;
    const [selected2, setSelected2] = useState([]);

    const [date, setDate] = useState(new Date(Date.now()));
    const [show, setShow] = useState(false);
    const [date1, setDate1] = useState(new Date(Date.now()));
    const [show1, setShow1] = useState(false);
    const [value, setValue] = useState([]);
    const [field, setField] = useState([]);

    const [open, setOpen] = useState(false);

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
                await client.get(`/getfield/${email}`)
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

    const addCrop = async (values, formikActions) => {

        console.log({...values})

          const res = await client.post("/addCrops", { email:email,cropName: values.CName, fieldName:selected2, startingDate:date,
             HarvestDate:date1,amount:values.amount ,price:values.price
           })
           if(res.data.success){
            console.log({...values})
           }
           else{
            console.log('error in axios')
          }
          const res2 = await client.put(`/updateFieldCrop/${selected2}/${email}`)
        formikActions.resetForm();
        formikActions.setSubmitting(false);
        setDate(new Date());
        setValue();
    } 
    return(
        <Modal visible={props.visible} animationType="slide">
          <TouchableOpacity onPress={()=>{
               props.onclose()}}>
            <Return name="left" size={20} color='black' />
          </TouchableOpacity>
        <SafeAreaView>
        <Formik
        initialValues={{price:'',amount:'',CName:'' }}
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
                    <TextInput 
                        value={amount}
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
                        boxStyles={{borderRadius:25,width:'90%' ,margin:20, backgroundColor: "#f8f4f4" ,color:"#6e6969"}}
                        defaultOption={{ key:'1', value:'' }}   //default selected option
                        />
                  
                        
                    
         
              <Text style={{ fontWeight:'bold' , fontSize:15 , margin:5, marginHorizontal:20}}> Starting Date: </Text>

             <TouchableWithoutFeedback onPress={() => {
                        setShow(true);
                    }}
                    >
                        <View style={styles.Datecontainer}>
                            <Text style={styles.placeholder}> {!date ? "Deadline" : date.toDateString()}</Text>
                            <MaterialCommunityIcons
                                name="chevron-down"
                                size={20}
                                color={'#6e6969'}
                            />
                          
                        </View>
            </TouchableWithoutFeedback>
            
                 <Text style={{ fontWeight:'bold' , fontSize:15 , margin:5, marginHorizontal:20}}>Expected Harvest Date: </Text>

                 <TouchableWithoutFeedback onPress={() => {
                        setShow1(true);
                    }}
                    >
                        <View style={styles.Datecontainer}>
                            <Text style={styles.placeholder}> {!date1 ? "Deadline" : date1.toDateString()}</Text>
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
                title='ADD'
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