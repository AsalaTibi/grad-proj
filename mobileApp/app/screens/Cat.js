import React , {useState,useEffect} from "react";
import { StyleSheet ,TouchableOpacity, Text ,View} from "react-native";
import {AntDesign} from '@expo/vector-icons'
import { useLogin } from "../context/LoginProvider";
import client from "../api/client";
import ModalActions from "../components/ModalCat";

export default function Cat({navigation}){
    const [cat, setCat]=useState([]);
    const [modalVisible, setModalVisible] = useState(false)
    const {profile} = useLogin();
    const email = profile.email ; 

    useEffect(()=>{

        async function fetchCat() {
            try{ 
                await client.get(`/get-catExp/${email}`)
                .then(result =>{
                  console.log(result.data)
                  setCat(result.data);
                }
                )
                .catch(error => console.log(error))
            }
            catch(error){
                console.log(error)
            }
                }
        fetchCat();
     },[])
    
    return( 

      <View style={{marginTop:35}}>
        
        <View style={{ marginTop:10  , flexDirection:"row"}}>
       <Text  style={{color: '#39904F' ,paddingLeft:5 , fontWeight:'bold',fontSize:25}}>Expense Category:</Text> 
        <TouchableOpacity
          style={styles.plusButton}
          onPress={() => setModalVisible(true)}
          activeOpacity={0.5}
        >
          <AntDesign name='plus' size={20} color='white' />
        </TouchableOpacity>
    </View>
        {cat.map(key => {
        
          return (
            <TouchableOpacity
              style={styles.item}
              key={key.id}
              onPress={() => navigation.navigate('Exp',{id:key._id})}
            >   
              <Text style={{ fontSize: 20 ,color:'#064716',fontWeight:'bold' }}>{key.name}</Text>
              
            <Text style={{ fontSize: 16 }}>{key.field}</Text>
                {/* : (<Text style={{ fontSize: 16, color: gray }}>Tap to add cards</Text>) */}
                
            </TouchableOpacity>
          )
        })}
        <ModalActions modalVisible={modalVisible} setModalVisible={setModalVisible}/>
      </View>
      )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#96E899',
        borderRadius: 10,
        padding: 20,
        height:65,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 17,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        
        elevation: 11,
      },
      plusButton: {
        backgroundColor: '#064716',
        marginLeft:98,
        padding: 10,
        borderRadius: 50,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 12,
          
        } }
})