import React, { useState ,useEffect} from 'react';
import { View, StyleSheet, Text,Modal,Pressable,KeyboardAvoidingView, Alert} from 'react-native';
import {FontAwesome5} from '@expo/vector-icons'
import FormInput from './FormInput';
import FormSubmitButton from './FormSubmitButton';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { FontAwesome } from '@expo/vector-icons';
import { SelectList } from 'react-native-dropdown-select-list';
import client from '../api/client';
import { useLogin } from '../context/LoginProvider';

const validationSchema = Yup.object({
  

  price:Yup.string()
  .trim().required('Price is Required')
  // .min(10,'Salary is too small')
});

const AddSales = ({modalVisible, setModalVisible,data}) => {
  const {profile} = useLogin();  
  const email = profile.email;
  const Info = {
   customer:'',
    price: '',
  };

  const [error, setError] = useState('');

  const Addsale = async (values, formikActions) => {

    const res =  await client.post('/sellHarvest',{adminEmail:email,harvestName:data.cropName,boxSize:data.boxSize,amount:data.amount ,quality:data.quality,...values,category:selected})
    if(res.data.success){
      console.log(res.data)
     }
     else{
      console.log('error in axios')
    }
    const del = await client.delete(`/deleteHarvest/${data._id}`)
    if(del.data.success){
      alert("sold successfully") ;
     }

    formikActions.resetForm();
    formikActions.setSubmitting(false);
    Alert("Successfully ,Sold")
    setModalVisible(!modalVisible)
  };
  const [selected, setSelected] = useState("");
  const [category, setCategory] = useState('')
  useEffect(() => {

    async function fetchCat() {

      try {
        await client.get(`/catNames/${email}`)
          .then(result =>
            setCategory(result.data)
          )
          .catch(error => console.log(error))
      }
      catch (error) {
        console.log(error)
      }
    }
    fetchCat();
  }, [])
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
        onSubmit={Addsale}
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
          const {customer, price  } = values;
          return (
            <>
        
              
              <FormInput
                value={customer}
                error={touched.amount && errors.amount}
                onChangeText={handleChange('customer')}
                onBlur={handleBlur('customer')}
                autoCapitalize='none'
                label='Customer Name:'
                placeholder='Salah ahmad'
              />
                  
              <FormInput
                value={price}
                error={touched.price && errors.price}
                onChangeText={handleChange('price')}
                onBlur={handleBlur('price')}
                autoCapitalize='none'
                label='Current Price:'
                placeholder='price/kg'
              />
            
            <SelectList
                  onSelect={() => selected}
                  setSelected={setSelected}
                  //fontFamily='lato'
                  data={category}
                  arrowicon={<FontAwesome name="chevron-down" size={12} color={'black'} />}
                  searchicon={<FontAwesome name="search" size={12} color={'black'} />}
                  search={false}
                  placeholder="Choose Expense Categorey "

                  boxStyles={{
                    borderRadius: 8, width: '100%', marginTop: 10, marginBottom: 10, backgroundColor: "#f8f4f4", color: "#6e6969", borderColor: '#1b1b33',
                  }}
                  defaultOption={{ key: '1', value: '' }}   //default selected option
                />
              <FormSubmitButton
                submitting={isSubmitting}
                onPress={handleSubmit}
                title='Sale it!'
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
export default AddSales; 