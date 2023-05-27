import React, { useState } from 'react';
import { View, StyleSheet, Text, Modal,TouchableOpacity } from 'react-native';
import { isValidEmail, isValidObjField, updateError } from '../utils/methods';
import FormContainer from './FormContainer';
import FormInput from './FormInput';
import FormSubmitButton from './FormSubmitButton';
import { StackActions } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import client from '../api/client';
import Home from './Home'
import { SafeAreaView } from 'react-native-safe-area-context';
import Return from 'react-native-vector-icons/AntDesign';
import { useLogin } from '../context/LoginProvider';

const AddWorker = (props) => {

const validationSchema = Yup.object({
  adminEmail: Yup.string().email('Invalid email!').required('Email is required!'),
  workerName: Yup.string()
    .trim()
    .min(3, 'Invalid name!')
    .required('Name is required!'),
  workerEmail: Yup.string().email('Invalid email!').required('Email is required!'),
  password: Yup.string()
    .trim()
    .min(8, 'Password is too short!')
    .required('Password is required!'),
  confirmPassword: Yup.string().equals(
    [Yup.ref('password'), null],
    'Password does not match!'
  ),
  phoneNumber:Yup.string()
    .trim()
    .min(10, 'Invalid Number!')
    .required('phone Number is required!'),
  address:Yup.string()
  .trim()
  .required('address is required'),
  salary:Yup.string()
  .trim()
  // .min(10,'Salary is too small')
});
  const { profile } = useLogin();

  const userInfo = {
    adminEmail: profile.email,
    workerName: '',
    workerEmail: '',
    password:'',
    confirmPassword: '',
    phoneNumber:'',
    address:'',
    salary:''
  };

  const [error, setError] = useState('');

  const { adminEmail,workerName,workerEmail,password,confirmPassword,phoneNumber,
         address,salary } = userInfo;

  const handleOnChangeText = (value, fieldName) => {
    setUserInfo({ ...userInfo, [fieldName]: value });
  };

  const isValidForm = () => {
    // we will accept only if all of the fields have value
    if (!isValidObjField(userInfo))
      return updateError('Required all fields!', setError);
    // if valid name with 3 or more characters
    if (!workerName.trim() || workerName.length < 3)
      return updateError('Invalid name!', setError);
    // only valid email id is allowed
    if (!isValidEmail(workerEmail)) return updateError('Invalid email!', setError);
    // password must have 8 or more characters
    if (!password.trim() || password.length < 8)
      return updateError('Password is less then 8 characters!', setError);
    // password and confirm password must be the same
    if (password !== confirmPassword)
      return updateError('Password does not match!', setError);

    return true;
  };

  const submitForm = () => {
    if (isValidForm()) {
      // submit form
      console.log(userInfo);
    }
    else{
      console.log("error from submit")
    }
  };

  const addWorker = async (values, formikActions) => {

    const res = await client.post('/add-worker', {
      ...values,
    })
    
    if (res.data.success) {
      const addRes = await client.post('/create-user', {
        fullname:values.workerName,
        email: values.workerEmail,
        password: values.password,
        confirmPassword :values.confirmPassword,
        isAdmin:false
      });
    }
    else{
      console.log('error in axios')
    }
    formikActions.resetForm();
    formikActions.setSubmitting(false);
  };

  return (
    <Modal visible={props.visible} animationType="slide">
      <TouchableOpacity onPress={()=>{
              props.onclose()}}>
        <Return name="left" size={20} color='black' />
      </TouchableOpacity>
    <SafeAreaView>
    <FormContainer >
      <Formik
        initialValues={userInfo}
        validationSchema={validationSchema}
        onSubmit={addWorker}
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
              {/* <FormInput
                value={adminEmail}
                error={touched.adminEmail && errors.adminEmail}
                onChangeText={handleChange('adminEmail')}
                onBlur={handleBlur('adminEmail')}
                label='Admin Email'
                placeholder='example@email.com'
              /> */}
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
                value={workerEmail}
                error={touched.workerEmail && errors.workerEmail}
                onChangeText={handleChange('workerEmail')}
                onBlur={handleBlur('workerEmail')}
                autoCapitalize='none'
                label='Worker Email'
                placeholder='example@email.com'
              />
              <FormInput
                value={password}
                error={touched.password && errors.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                autoCapitalize='none'
                secureTextEntry
                label='Password'
                placeholder='********'
              />
              <FormInput
                value={confirmPassword}
                error={touched.confirmPassword && errors.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                autoCapitalize='none'
                secureTextEntry
                label='Confirm Password'
                placeholder='********'
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
                title='ADD'
              />

            </>
          );
        }}
      </Formik>
    </FormContainer>
    </SafeAreaView>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container:{
    marginTop:40,
  }
});

export default AddWorker;
