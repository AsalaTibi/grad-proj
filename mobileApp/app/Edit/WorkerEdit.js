import React, { useState } from 'react';
import { View, StyleSheet, Text, Modal,KeyboardAvoidingView ,Pressable, Alert} from 'react-native';
import {FontAwesome5, EvilIcons,AntDesign} from '@expo/vector-icons'

import FormInput from '../components/FormInput';
import FormSubmitButton from '../components/FormSubmitButton';
import { StackActions } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import client from '../api/client';

//import { useLogin } from '../context/LoginProvider';

const EditWorker = ({modalVisible,setModalVisible,info,id}) => {

const validationSchema = Yup.object({

});
console.log(info)
const name=info.workerName;
const phone=info.phoneNumber.toString();
const address=info.address;
const salary=info.salary.toString();
  const userInfo = {
    workerName: name,
    phoneNumber:phone,
    address:address,
    salary:salary,
  };

  const UpdateWorker = async (values, formikActions) => {

    const res = await client.put(`/update-Worker/${id}`, {
      ...values,
    })
    
    formikActions.resetForm();
    formikActions.setSubmitting(false);
    Alert.alert("Successfully Updated !")
    setModalVisible(!modalVisible)
  };

  return (
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
    
          <KeyboardAvoidingView
      enabled
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={styles.container}
    >
      <Formik
        initialValues={userInfo}
        validationSchema={validationSchema}
        onSubmit={UpdateWorker}
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
          const { adminEmail,workerName, workerEmail, 
                 password, confirmPassword ,
                 phoneNumber,address ,salary} = values;
          return (
           
            <>
              
              <FormInput
                value={workerName}
                error={touched.workerName && errors.workerName}
                onChangeText={handleChange('workerName')}
                onBlur={handleBlur('workerName')}
                autoCapitalize='none'
                label='workerName'
                placeholder='John Smith'
              />
          
              <FormInput
                value={phoneNumber}
                error={touched.phoneNumber && errors.phoneNumber}
                onChangeText={handleChange('phoneNumber')}
                onBlur={handleBlur('phoneNumber')}
                autoCapitalize='none'
                label='Phone Number'
                placeholder='05********'
              />
              <FormInput
                value={address}
                error={touched.address && errors.address}
                onChangeText={handleChange('address')}
                onBlur={handleBlur('address')}
                autoCapitalize='none'
                label='Address'
                placeholder='city'
              />
              <FormInput
                value={salary}
                error={touched.salary && errors.salary}
                onChangeText={handleChange('salary')}
                onBlur={handleBlur('salary')}
                autoCapitalize='none'
                label='Salary'
                placeholder='500'
              />
              <FormSubmitButton
                submitting={isSubmitting}
                onPress={handleSubmit}
                title='Update'
              />

            </>
          );
        }}
      </Formik>
      </KeyboardAvoidingView>
    </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: 250,
    paddingHorizontal: 20,
  }, modalClose: {
    marginTop: 20,
    marginBottom: 0,
  },closeIcon: {
   position: 'absolute',
   top: 0,
   right: 0,
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
 // button: {
 //   borderRadius: 20,
 //   padding: 10,
 //   elevation: 2,
 // },
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

export default EditWorker;