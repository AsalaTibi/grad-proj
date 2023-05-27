import React , {useState , useEffect} from 'react';
import { StyleSheet, TouchableOpacity, View ,Text,Alert} from 'react-native';
import client from '../api/client';
import Editequipment from '../Edit/EqEdit';
import { AntDesign } from '@expo/vector-icons';


export default function EqCard (props){
    var item= props.item;
    var index= props.index;

    const [modalVisible, setModalVisible] = useState(false);
    
      function updateEq(){
        setModalVisible(true);
       }
      function closePopup(){
        setModalVisible(false)
      }

    return (
        <>
          <View style={styles.mainCardView}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{marginLeft: 12,marginBottom:20}}>
              <Editequipment modalVisible={modalVisible} setModalVisible={setModalVisible} info={item} id={item._id} handleClose={closePopup}/>
                <Text
                  style={{
                    fontSize: 16,
                    color: 'black',
                    fontWeight: 'bold',
                   // fontFamily: Fonts.nunitoBold,
                    textTransform: 'capitalize',
                  }}>
                  {item.eqName}
                </Text>
                <View
                  style={{
                    marginTop: 4,
                    borderWidth: 0,
                   flexDirection:'row'
  
                  }}>
                  <Text
                    style={{
                      color: 'gray',
                      fontSize: 12,
                    }}>
                   Available : {item.amount}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                height:35,
               // backgroundColor: '#889b63',
                borderWidth: 0,
                width: 40,
                marginLeft: -26,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                flexDirection:'column'
              }}>
              <TouchableOpacity key={item._id} onPress={()=>updateEq(item)}>
              <Text style={{color: 'white' , marginBottom:5}}>
             <AntDesign name='edit' color='red' size={15}/>
              </Text>
              </TouchableOpacity>
              <TouchableOpacity  key={item._id} onPress={()=>props.handleDelete(item._id,index)}>
              <Text style={{color: 'white'}}>
             <AntDesign name="delete" color='red' size={15} />
              </Text>
              </TouchableOpacity>
            </View>
          </View>
          </>
    );

}
const styles = StyleSheet.create({
    container1: {
      flex: 1,
      paddingHorizontal: 24,
      paddingTop: 24,
      paddingBottom: 0,
      // backgroundColor: GlobalStyles.colors.primary700
    }, container: {
      flex: 1,
      backgroundColor:'white',
    },
    mainCardView: {
      height: 90,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
      borderRadius: 15,
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      
      elevation: 4,
   
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingLeft: 16,
      paddingRight: 14,
      marginTop: 6,
      marginBottom: 6,
      marginLeft: 16,
      marginRight: 16,
    },
    subCardView: {
      height: 50,
      width: 50,
      borderRadius: 25,
      //backgroundColor: Colors.history_back,
      borderColor: "#EEEEEE",
      borderWidth: 1,
      borderStyle: 'solid',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });