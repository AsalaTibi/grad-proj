
import React, { useState } from 'react';
import { View, StyleSheet, Text, Modal, TouchableWithoutFeedback, Keyboard,TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import  CropForm from '../screens/CropsContainer'
import Return from 'react-native-vector-icons/AntDesign';

const AddCrop = (props) => {
  
    return (
        <Modal visible={props.visible} animationType="slide">
          <TouchableOpacity onPress={()=>{
               props.onclose()}}>
            <Return name="left" size={20} color='black' />
          </TouchableOpacity>
            <ScrollView>
                <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 25 }}>
                        <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
                        <View>
                            <Text style={{ width: 250, textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>NEW SEASON : </Text>
                        </View>
                        <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
                    </View>

                    <View style={{ marginTop: 40, flexDirection: 'column' }}>
                        <TouchableWithoutFeedback>

                        < CropForm/>

                        </TouchableWithoutFeedback>

                    </View>


                </View>
            </ScrollView>
        </Modal>


    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
    },

    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10,
        width: '30%',
        margin: 10

    },
    container2: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 10,
        alignItems: 'center',

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
export default AddCrop;