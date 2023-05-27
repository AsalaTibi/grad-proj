import React, { useState } from 'react';
import { View, StyleSheet, Text,Modal, TouchableWithoutFeedback, Keyboard ,ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import FormContainer from '../components/FormContainer';
import FormInput from '../components/FormInput';
import FormSubmitButton from '../components/FormSubmitButton';
import { Formik } from 'formik';
import * as Yup from 'yup';
import client from '../api/client';
import { useLogin } from '../context/LoginProvider';

const validationSchema = Yup.object({
  
  eqName: Yup.string()
    .trim()
    .min(3, 'Invalid name!')
    .required('Name is required!'),
    amount:Yup.string()
    .trim().required('Amount is Required'),
  price:Yup.string()
  .trim().required('Price is Required')
  // .min(10,'Salary is too small')
});

const Addequipment = (props) => {

  const {profile} = useLogin();
  const email = profile.email;
  const Info = {
    eqName: '',
    amount: '',
    price: '',
   
  };

  const [error, setError] = useState('');

  const { eqName, amount , price } = Info;

  const handleOnChangeText = (value, fieldName) => {
    setInfo({ ...Info, [fieldName]: value });
  };


  const add = async (values, formikActions) => {

    const res = await client.post('/add-equipment', {
      email:email,eqName:values.eqName,amount:values.amount, price:values.price})

    formikActions.resetForm();
    formikActions.setSubmitting(false);
  };

  return (
    <Modal visible={props.visible} animationType="slide">
    <ScrollView>

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View >
        <MaterialIcons 
          name='close'
          size={24} 
          style={{...styles.modalToggle, ...styles.modalClose}} 
          onPress={props.onclose}
        /></View>
        </TouchableWithoutFeedback>
         <View>
        <View style={{flexDirection: 'row', alignItems: 'center' , marginTop:25}}>
        <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
        <View>
        <Text style={{width: 250, textAlign: 'center' ,fontWeight:'bold' , fontSize:20}}>Adding a New Equipment:</Text>
        </View>
        <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
        </View>
       
        <View style={{marginTop:40 , flexDirection:'column'}}>
          <TouchableWithoutFeedback>
    
    <FormContainer >
      <Formik
        initialValues={Info}
        validationSchema={validationSchema}
        onSubmit={add}
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
          const {eqName, amount , price  } = values;
          return (
            <>
              {/* <FormInput
                value={adminEmail}
                error={touched.adminEmail && errors.adminEmail}
                onChangeText={handleChange('adminEmail')}
                onBlur={handleBlur('adminEmail')}
                label='Admin Email'
                placeholder='example@email.com'
              /> */}
              <FormInput
                value={eqName}
                error={touched.eqName && errors.eqName}
                onChangeText={handleChange('eqName')}
                onBlur={handleBlur('eqName')}
                autoCapitalize='none'
                label='Material / Equipment Name'
                placeholder='EcoVenger'
              />
              <FormInput
                value={amount}
                error={touched.amount && errors.amount}
                onChangeText={handleChange('amount')}
                onBlur={handleBlur('amount')}
                autoCapitalize='none'
                label='Amount'
                placeholder='100 piece'
              />
                  
              <FormInput
                value={price}
                error={touched.price && errors.price}
                onChangeText={handleChange('price')}
                onBlur={handleBlur('price')}
                autoCapitalize='none'
                label='Price for each:'
                placeholder='in dollar'
              />
            
              <FormSubmitButton
                submitting={isSubmitting}
                onPress={handleSubmit}
                title='ADD'
              />

            </>
          );
        }}
      </Formik>
    </FormContainer>
 
              </TouchableWithoutFeedback>
             
            </View>
        
                       
            </View>
            </ScrollView>
        </Modal>
  

  );
};

const styles = StyleSheet.create({
  container:{
    marginTop:40,
  },
    
  button: {
     alignItems: "center",
     backgroundColor: "#DDDDDD",
     padding: 10,
     width:'30%',
     margin:10
     
   },
   container2:{
     flexDirection: 'row',
     justifyContent: 'center',
     paddingHorizontal:10,
     alignItems:'center',

    },
    modalToggle: {
     justifyContent: 'center',
     alignItems: 'center',
     marginBottom: 10,
     borderWidth: 1,
     borderColor: '#f2f2f2',
     padding: 10,
     borderRadius: 10,
     alignSelf: 'center',
   },
   modalClose: {
     marginTop: 20,
     marginBottom: 0,
   },
   
});
export default Addequipment; 