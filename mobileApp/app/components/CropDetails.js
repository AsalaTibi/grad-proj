import { View, Text,StyleSheet,Image, Modal,TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import client from '../api/client'
import Return from 'react-native-vector-icons/AntDesign';
import { BackgroundImage } from 'react-native-elements/dist/config';
const sprayEq = require("../images/moisture.png");
const seed = require("../images/seed.png");
const water = require("../images/drop.png");
const weeding = require("../images/leaf.png")

const RequirementDetail = ({ icon, label }) => {
    return (
        <View style={{ flexDirection: 'row',margin:20}}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <Image
                    source={icon}
                    resizeMode="cover"
                    style={{
                        tintColor: "#606d87",
                        width: 30,
                        height: 30
                    }}
                />
                <Text style={{ marginLeft:8, color:"#606d87", 
                            //    fontFamily: "Roboto-Bold",
                                fontSize:22, lineHeight: 30}}>{label}</Text>
            </View>
            {/* <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <Text style={{ marginLeft:8, color: "#BEC1D2", fontFamily: "Roboto-Bold", fontSize:22, lineHeight: 30 }}>{detail}</Text>
            </View> */}
        </View>
    )}
    function renderDetails(job) {
        // const spray = job.find({jobType:'spray'})
        // console.log("spray",spray)
        // const Fertilize = job.find(element=>element === 'Fertilize')
        // const irrigation = job.find(element=>element === 'Irrigation')
      return (
          <View style={{ flex: 2.5, marginTop:24, paddingHorizontal:24, justifyContent: 'space-around'}}>
                   {
                   job.map((item)=>{
                    
                    if(item.jobType === 'spray'){
                        return (
                        <View style={{marginTop:20}}>
                          <RequirementDetail
                          icon={sprayEq}
                          label={item.jobType}
                          />
                        </View>
                        )}

                    if(item.jobType === 'Fertilize'){
                        return (
                          <View style={{marginTop:20}}>
                            <RequirementDetail
                            icon={seed}
                            label={item.jobType}/>
                        </View>
                        )}

                    if(item.jobType === 'Irrigation'){
                        return (
                          <View style={{marginTop:20}}>
                            <RequirementDetail
                            icon={water}
                            label={item.jobType}/>
                          </View>
                            )}
                    
                    if(item.jobType === 'hand weeding'){
                        return (
                          <View style={{marginTop:20}}>
                            <RequirementDetail
                            icon={weeding}
                            label='Hand Weeding'/>
                          </View>
                        )}
                
                  
                  })}
            
              
          </View>
      )
  }

const CropDetails = (props) => {
  
    const cropItem = props.item;
    const field = cropItem.fieldName;
    const [job,setJob] = useState([]);
    const sprayEq = require("../images/moisture.png");

    useEffect(()=>{
        async function fetchDetails() {
            try{
                await client.get(`/fetch-details/${field}`)
                .then(result =>{
                    setJob(result.data);
                    console.log("res",result.data)
                  }
                  )
                .catch(error => console.log(error))
            }
            catch(err){
            console.log(err)
        }}
        fetchDetails();
    },[])

    
  return (
   <Modal visible={props.visible} animationType="slide" >
    <View style={StyleSheet.container}>
      <View style={{height:"50%"}}>
        <BackgroundImage style={{
            width:'100%',
            height:'100%'
           }}>
         <Image 
           source={require('../images/malfof.jpg')}
           resizeMode="cover"
           style={{
            width:'100%',
            height:'100%'
           }}
         />
         </BackgroundImage>
      </View>
      <View
        style={{
         flex:1,
         marginTop:-40,
         backgroundColor:"white",
         borderTopLeftRadius:40,
         borderTopRightRadius:40,
         paddingVertical:24
        }}
      >

        <Text style={{ paddingHorizontal:24,
                     color:"#606d87", //gray
                    //  fontFamily: "Roboto-Black",
                     fontSize: 30,
                     lineHeight: 36}}>
          Crop Details
        </Text>
      {renderDetails(job)}
      </View>
    </View>
      <TouchableOpacity onPress={()=>{props.onclose()}} style={{justifyContent:"flex-end",marginLeft:10}}>
         <Return name="left" size={20} color='black' />
      </TouchableOpacity>
    </Modal>
  )
}
export default CropDetails
const styles = StyleSheet.create({
   container:{
      flex:1,
   }
})