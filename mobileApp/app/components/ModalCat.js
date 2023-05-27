import React, { useState, useEffect } from 'react'
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView
} from 'react-native'
import { FontAwesome5, EvilIcons, AntDesign } from '@expo/vector-icons'
import { Button } from 'react-native-elements'
import client from '../api/client'
//import AddScreen from '../screens/AddScreen'
import { FontAwesome } from '@expo/vector-icons';
import { SelectList } from 'react-native-dropdown-select-list';
import { useLogin } from '../context/LoginProvider'


const ModalActions = ({ modalVisible, setModalVisible }) => {

   const {profile} = useLogin();
   const email = profile.email;
  //const data=navigation;
  const [Name, setName] = useState('')
  const [field, setField] = useState('')
  const [selected2, setSelected2] = useState("");
 

  useEffect(() => {
    
    async function fetchFields() {

      try {
        await client.get(`/get-field/${email}`)
          .then(result =>
            setField(result.data)
          )
          .catch(error => console.log(error))
      }
      catch (error) {
        console.log(error)
      }
    }
    fetchFields();
  }, [])

  const addCat = async () => {
    const res = await client.post('/add-catExp', { email: email, name: Name, field:selected2 })
    if (res.data.success) {
      console.log(res.data)
    }
    else {
      console.log('error in axios')
    }

    setModalVisible(!modalVisible)
  }
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
              style={styles.container1}
            >
              <View style={{ flexDirection: 'column' }}>
                <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>
                  Expense Category Name:
                </Text>
                <TextInput value={Name}
                  onChangeText={txt => setName(txt)}
                  placeholder={"ex: S#-Year"}
                  style={styles.input} />
                <Text style={{ fontWeight: 'bold' }}>
                  Choose Field:
                </Text>
                <SelectList
                  onSelect={() => selected2}
                  setSelected={setSelected2}
                  //fontFamily='lato'
                  data={field}
                  arrowicon={<FontAwesome name="chevron-down" size={12} color={'black'} />}
                  searchicon={<FontAwesome name="search" size={12} color={'black'} />}
                  search={false}
                  placeholder="Choose a Field "

                  boxStyles={{
                    borderRadius: 8, width: '100%', marginTop: 10, marginBottom: 10, backgroundColor: "#f8f4f4", color: "#6e6969", borderColor: '#1b1b33',
                  }}
                  defaultOption={{ key: '1', value: '' }}   //default selected option
                />

              </View>



              <TouchableOpacity onPress={()=>addCat()} style={[styles.container]}>
                <Text style={{ fontSize: 15, color: '#fff' }}>
                  Add New Category
                </Text>
              </TouchableOpacity>

            </KeyboardAvoidingView>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default ModalActions

const styles = StyleSheet.create({
  container1: {
    width: 250,
    paddingHorizontal: 20,
  },
  container: {
    backgroundColor: '#889b63',
    height: 35,
    padding: 5,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pencil: {
    backgroundColor: 'aliceblue',
    borderRadius: 10,
    padding: 8,
  },
  trash: {
    backgroundColor: 'aliceblue',
    borderRadius: 10,
    // padding: 8,
    paddingVertical: 8,
    paddingHorizontal: 15
  },
  closeIcon: {
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
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
  }, input: {
    backgroundColor: "#f8f4f4",
    borderWidth: 1,
    borderColor: '#1b1b33',
    height: 35,
    borderRadius: 8,
    fontSize: 16,
    paddingLeft: 10,
    marginBottom: 20,
  },
})