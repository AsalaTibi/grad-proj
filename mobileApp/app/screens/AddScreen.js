import {StatusBar} from 'expo-status-bar'
import React, {useLayoutEffect, useState} from 'react'
import {StyleSheet, View, KeyboardAvoidingView, TextInput, TouchableOpacity} from 'react-native'
import {Text, Button} from 'react-native-elements'
import DateTimePicker from '@react-native-community/datetimepicker'
import format from 'date-fns/format'
import {Picker} from '@react-native-picker/picker'
import client from '../api/client'
import { useLogin } from '../context/LoginProvider'

const AddScreen = ({id}) => {
  const [submitLoading, setSubmitLoading] = useState(false)
  const [input, setInput] = useState('')
  const [amount, setAmount] = useState('')
  const [selDate, setSelDate] = useState(new Date())
  const [show, setShow] = useState(false)
  const [mode, setMode] = useState('date')
  const [selectedLanguage, setSelectedLanguage] = useState('expense')
  const {  profile } = useLogin();
  const email = profile.email
  const createExpense = async () => {
    const res = await client.post("/add-expense",{email:email,categoryId:id,Name : input, HDate :selDate,amount:amount , typeExpense:selectedLanguage
       })
   if(res.data.success){
    console.log(res.data)
   }
   else{
    console.log('error in axios')
  }
  clearInputFields();
  }


  const clearInputFields = () => {
    alert('Created Successfully')
    setInput('')
    setAmount('')
    setSelDate(new Date())
    setSelectedLanguage('expense')
    setSubmitLoading(false)
  }
  
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date
    setShow(Platform.OS === 'ios')
    setSelDate(currentDate)
  }
  const showMode = (currentMode) => {
    setShow(true)
    setMode(currentMode)
  }
  const showDatepicker = () => {
    showMode('date')
  }
  const result = format(selDate, 'dd/MM/yyyy')

  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar style='dark' />
      <Text style={{ fontSize:20, fontWeight:'bold',marginBottom:20}}>Add New Transactions</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder='Add Text'
          value={input}
          onChangeText={(text) => setInput(text)}
        />

        {show && (
          <DateTimePicker
            testID='dateTimePicker'
            value={selDate}
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
          value={result}
          onPress={showDatepicker}
          // editable={false}
        >
          {result ? result : new Date()}
        </Text>
        <Picker
          selectedValue={selectedLanguage}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedLanguage(itemValue)
          }
        >
          <Picker.Item label='Expense' value='expense' />
          <Picker.Item label='Income' value='income' />
        </Picker>

        <TouchableOpacity  style={styles.button}   onPress={createExpense}
          loading={submitLoading}>
            <Text style={{color:'white' , fontSize:20, fontWeight:'bold'}}>Add</Text>
          </TouchableOpacity>  
      </View>
    </KeyboardAvoidingView>
  )
}

export default AddScreen

const styles = StyleSheet.create({
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
})