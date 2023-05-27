import React, { useState } from 'react';
import { View, StyleSheet, Text,Modal,Pressable,KeyboardAvoidingView, Alert} from 'react-native';
import {FontAwesome5} from '@expo/vector-icons'
import FormInput from '../components/FormInput';
import FormSubmitButton from '../components/FormSubmitButton';
import { Formik } from 'formik';
import * as Yup from 'yup';
import client from '../api/client';

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

const Editequipment = ({modalVisible, setModalVisible,info,id,handleClose}) => {
    const n=info.eqName;
    const a=info.amount;
    const p=info.price;
  const Info = {
    eqName: n.toString(),
    amount:a.toString() ,
    price: p.toString(),
   
  };

  const [error, setError] = useState('');

  const UpdateEquipment = async (values, formikActions) => {

    const res = await client.put(`/Edit-eq/${id}`, {
      ...values,
    }).then(res => console.log(res.data))
    .catch(err => console.log(err))

    formikActions.resetForm();
    formikActions.setSubmitting(false);
    Alert.alert("Updated Successfully")
    handleClose()
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
        initialValues={Info}
        validationSchema={validationSchema}
        onSubmit={UpdateEquipment}
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
export default Editequipment; 