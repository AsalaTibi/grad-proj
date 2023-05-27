import React, { useState,useEffect } from "react";
import { StyleSheet, TextInput, View, Button, TouchableWithoutFeedback, Text, ScrollView, SafeAreaView, TouchableOpacity } from "react-native";
import { Formik } from 'formik';
import DropDownPicker from 'react-native-dropdown-picker';
import FormSubmitButton from '../components/FormSubmitButton';
import axios from "axios";
import { SelectList, MultipleSelectList } from 'react-native-dropdown-select-list';
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons"
import DateTimePicker from '@react-native-community/datetimepicker';
import client from '../api/client';
import { useLogin } from "../context/LoginProvider";

export default function WorkerExpens() {

    const [selected2, setSelected2] = useState([]);
    const [items, seItems] = useState([]);
    const {profile} = useLogin();
    useEffect(()=>{
        async function fetchEq() {
            const email = "asala@gmail.com" ;
            try{ 
                await client.get(`/geteqName/${email}`)
                .then(result =>{
                    seItems(result.data);
                }
                )
                .catch(error => console.log(error))
            }
            catch(error){
                console.log(error)
            }
                }
        fetchEq();
     },[])

    const [date, setDate] = useState(new Date(Date.now()));
    const [show, setShow] = useState(false);    
    const onChange = (event, selectedDate) => {
        setShow(false);
        if (selectedDate)
            setDate(selectedDate);
    };

    DropDownPicker.setListMode("SCROLLVIEW");

    const addUsed = async (values, formikActions) => {

        console.log({ ...values })
        try{ 
            await client.post('/add-expense',{})
            .then(result =>
              setField(result.data)
            )
            .catch(error => console.log(error))
        }
        catch(error){
            console.log(error)
        }
        if (res.data.success) {
            console.log({ ...values })
        }
        else {
            console.log('error in axios')
        }
        formikActions.resetForm();
        formikActions.setSubmitting(false);
        setDate(new Date());
    }

    return (
        <SafeAreaView>

            <Formik
                initialValues={{ amount:'', }}

                onSubmit={addUsed}
            >
                {({
                    values,
                    errors,
                    touched,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                }) => {
                    const { amount } = values;
                    return (

                        <View>
                            <Text style={{ fontWeight: 'bold', fontSize: 15, margin: 5, marginHorizontal: 20 }}> Equipment</Text>
                            <SelectList
                                onSelect={() => selected2}
                                setSelected={setSelected2}
                                data={items}
                                arrowicon={<FontAwesome name="chevron-down" size={12} color={'black'} />}
                                searchicon={<FontAwesome name="search" size={12} color={'black'} />}
                                search={false}
                                placeholder="Choose an equipment "
                                label="Choosen Equipment"
                                boxStyles={{ borderRadius: 25, width: '90%', margin: 20, backgroundColor: "#f8f4f4", color: "#6e6969" }}
                                defaultOption={{ key: '1', value: '' }}   //default selected option
                            />
                            <Text style={{ fontWeight: 'bold', fontSize: 15, margin: 5, marginHorizontal: 20 }}> Amount have been used:</Text>
                            <TextInput placeholder='amount' style={styles.input} value={amount}

                                onChangeText={handleChange('amount')} />
          
                            <Text style={{ fontWeight: 'bold', fontSize: 15, margin: 5, marginHorizontal: 20 }}> Date doing the task</Text>


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


                            <FormSubmitButton
                                submitting={isSubmitting}
                                onPress={handleSubmit}
                                title='ADD'
                            />


                        </View>
                    )
                }}

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
    );
}

const styles = StyleSheet.create({

   
    Datecontainer: {
        backgroundColor: "#f8f4f4",
        borderRadius: 25,
        flexDirection: "row",
        padding: 15,
        marginVertical: 10,
        width: '90%',
        margin: 20,
        borderColor: 'gray',
        borderWidth: 1,
    },
    placeholder: {
        color: "#6e6969",
        flex: 1,

    },
    input: {
        borderWidth: 1,
        borderColor: '#1b1b33',
        height: 40,
        width: '90%',
        borderRadius: 25,
        fontSize: 16,
        paddingLeft: 10,
        marginBottom: 20,
        borderColor: 'gray',
        borderWidth: 1,
        marginVertical: 10,
        margin: 20,
        backgroundColor: "#f8f4f4",

    },
});