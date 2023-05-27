import { Feather } from '@expo/vector-icons';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
    Text, View, SafeAreaView, StyleSheet, StatusBar, Dimensions,
    ScrollView,
} from 'react-native';
import { LineChart, ContributionGraph, PieChart ,ProgressChart } from 'react-native-chart-kit';
import client from '../api/client';
import { useLogin } from '../context/LoginProvider';

export default function Dashboard() {
    const {profile} = useLogin();
    const email = profile.email;
    const [revenue,setRevenue] = useState([]);
    const [sales,setSales] = useState([]);
    const [expense,setExpense] = useState([]);
    const [count,setCount] = useState({});
    const [taskStatus,setTaskStatus] = useState({});
    const [status,setStatus] = useState({});
    let taskValue = [] ;
    let revValues = [] ;

    useEffect(()=>{
        async function fetchRev() {
            try{ 
               await axios.get(`http://172.19.142.24:8000/data/${email}`)
              .then(result =>
                setRevenue(result.data)
                )
              .catch(error => console.log(error))
            }
            catch(error){
              console.log(error)
            }
            }
    fetchRev();
        async function fetchExpense() {
            try{ 
            await axios.get(`http://172.19.142.24:8000/display-expenses-cat/${email}`)
            .then(result =>
                setExpense(result.data)
                )
            .catch(error => console.log(error))
            }
            catch(error){
            console.log(error)
            }
            }
    fetchExpense();
    async function fetchSales() {
        try{ 
        await axios.get(`http://172.19.142.24:8000/display-sales-cat/${email}`)
        .then(result =>
            setSales(result.data)
            )
        .catch(error => console.log(error))
        }
        catch(error){
        console.log(error)
        }
        }
    fetchSales();
    async function fetchCount() {
        try{ 
           await axios.get(`http://172.19.142.24:8000/get-count/${email}`)
          .then(result =>
            setCount(result.data)
            )
          .catch(error => console.log(error))
        }
        catch(error){
          console.log(error)
        }
        }
    fetchCount();
    async function fetchTask() {
        try{ 
           await axios.get(`http://172.19.142.24:8000/get-taskStatus/${email}`)
          .then(result =>
            setTaskStatus(result.data)
            )
          .catch(error => console.log(error))
        }
        catch(error){
          console.log(error)
        }
        }
    fetchTask();
    },[])
    // useEffect(()=>{
    //    status.push(10)
    // },[taskStatus])
   console.log("revenue",revenue)
   console.log("count",count)
   console.log(taskStatus)
   console.log(sales)
   console.log(expense)

    const p = 2500;
    const MyContributionGraph = () => {
        return (
            <>
                <Text style={styles.header}>Contribution Graph</Text>
                <ContributionGraph
                    values={[
                        { date: '2019-01-02', count: 1 },
                        { date: '2019-01-03', count: 2 },
                        { date: '2019-01-04', count: 3 },
                        { date: '2019-01-05', count: 4 },
                        { date: '2019-01-06', count: 5 },
                        { date: '2019-01-30', count: 2 },
                        { date: '2019-01-31', count: 3 },
                        { date: '2019-03-01', count: 2 },
                        { date: '2019-04-02', count: 4 },
                        { date: '2019-03-05', count: 2 },
                        { date: '2019-02-30', count: 4 },
                    ]}
                    endDate={new Date('2019-04-01')}
                    numDays={105}
                    width={Dimensions.get('window').width - 16}
                    height={220}
                    chartConfig={{
                        backgroundColor: '#1cc910',
                        backgroundGradientFrom: '#eff3ff',
                        backgroundGradientTo: '#efefef',
                        decimalPlaces: 2,
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        style: {
                            borderRadius: 16,
                        },
                    }}
                />
            </>
        );
    };

    const MyLineChart = () => {
        if(revenue){
            if(revenue.length){
        return (
            <>
                <Text style={styles.header}>Revenue Chart by season </Text>
                <LineChart
                    data={{
                        labels: revenue.map(item => {return(item.name)}),
                        datasets: [
                            {
                                data : revenue.map(item => {return(item.value)}),
                                strokeWidth: 4,
                            },
                        ],
                    }}
                    width={Dimensions.get('window').width - 16}
                    height={220}
                    chartConfig={{
                        backgroundColor: '#BE5122',
                        backgroundGradientFrom: '#487d45',
                        backgroundGradientTo: '#E4EEDF',
                        decimalPlaces: 2,
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        style: {
                            borderRadius: 16,
                        },
                    }}
                    style={{
                        marginVertical: 8,
                        borderRadius: 16,
                    }}
                    bezier
                />
            </>
        );
                }
            }
    };
    const SalesChart = () => {
        if(sales){
            if(sales.length){
           return (
            <>
                <Text style={styles.header}>Sales Chart by season</Text>
                <LineChart
                    data={{
                        labels: sales.map(item => {return(item.name)}),
                        datasets: [
                            {
                                data : sales.map(item => {return(item.value)}),
                                strokeWidth: 4,
                            },
                        ],
                    }}
                    width={Dimensions.get('window').width - 16}
                    height={220}
                    chartConfig={{
                        backgroundColor: '#BE5122',
                        backgroundGradientFrom: '#487d45',
                        backgroundGradientTo: '#E4EEDF',
                        decimalPlaces: 2,
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        style: {
                            borderRadius: 16,
                        },
                    }}
                    style={{
                        marginVertical: 8,
                        borderRadius: 16,
                    }}
                    bezier
                />
            </>
        );
                }
                }
    };
    const ExpenseChart = () => {
        if(expense){
            if(expense.length){
           return (
            <>
                <Text style={styles.header}>Expenses Chart by season</Text>
                <LineChart
                    data={{
                        labels: expense.map(item => {return(item.name)}),
                        datasets: [
                            {
                                data : expense.map(item => {return(item.value)}),
                                strokeWidth: 4,
                            },
                        ],
                    }}
                    width={Dimensions.get('window').width - 16}
                    height={220}
                    chartConfig={{
                        backgroundColor: '#BE5122',
                        backgroundGradientFrom: '#487d45',
                        backgroundGradientTo: '#E4EEDF',
                        decimalPlaces: 2,
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        style: {
                            borderRadius: 16,
                        },
                    }}
                    style={{
                        marginVertical: 8,
                        borderRadius: 16,
                    }}
                    bezier
                />
            </>
        );
                }
                }
    };
    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#ffff",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(128,0,0, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
      };
    const MyTaskPie = () => {
     if(taskStatus){
        if(Object.keys(taskStatus).length){
       let numberTask = [taskStatus.early/count.allTask,taskStatus.onTime/count.allTask,taskStatus.late/count.allTask]
        
             return(
                <>
                <Text style={styles.header}>Task Status </Text>
                <ProgressChart
                    data={{labels: ["Early", "On Time", "Late"], // optional
                    data:numberTask
                     }}
                    width={Dimensions.get('window').width - 16}
                    height={220}
                    strokeWidth={16}
                    radius={32}
                    chartConfig={chartConfig}
                    hideLegend={false}
                />
                </>
        )
    }}
    }
    const MyPieChart = () => {

        return (
            <>
                <Text style={styles.header}>Total of Available :</Text>
                <PieChart
                    data={[
                        {
                            name: 'Worker',
                            population: p,
                            color: 'rgba(131, 167, 234, 1)',
                            legendFontColor: '#7F7F7F',
                            legendFontSize: 15,
                        },
                        {
                            name: 'Toronto',
                            population: 2800,
                            color: '#F00',
                            legendFontColor: '#7F7F7F',
                            legendFontSize: 15,
                        },
                        {
                            name: 'New York',
                            population: 8538,
                            color: '#D1DABE',
                            legendFontColor: '#7F7F7F',
                            legendFontSize: 15,
                        },
                        {
                            name: 'Moscow',
                            population: 11920,
                            color: 'rgb(0, 0, 255)',
                            legendFontColor: '#7F7F7F',
                            legendFontSize: 15,
                        },
                    ]}
                    width={Dimensions.get('window').width - 16}
                    height={220}
                    chartConfig={{
                        backgroundColor: '#1cc910',
                        backgroundGradientFrom: '#eff3ff',
                        backgroundGradientTo: '#efefef',
                        decimalPlaces: 2,
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        style: {
                            borderRadius: 16,
                        },
                    }}
                    style={{
                        marginVertical: 8,
                        borderRadius: 16,
                    }}
                    accessor="population"
                    backgroundColor="transparent"
                    paddingLeft="10"
                    absolute //for the absolute number remove if you want percentage
                />
            </>
        );
    };

    return (
        <>
            <View>
        <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
        <ScrollView
            horizontal={true}
        >
            <View style={{ flexDirection: 'row' }}>
                <View style={[styles.shadowContainerStyle, { width: 160, marginTop: 20, marginLeft: 10, marginRight: 10, marginBottom: 20, height: 150, backgroundColor: '#487d45' }]}>
                    <Text style={{fontSize:17, marginTop: 5, marginLeft:40,padding: 20, fontWeight: 'bold' ,color:'white' }}>  <Feather name='users' size={25} />  </Text>
                    <Text style={{fontSize:17, paddingLeft: 20, fontWeight: 'bold' ,color:'white' }}> Total Workers </Text>
                {count ?< Text style={{fontSize:20, paddingLeft: 20,  marginLeft:45,fontWeight: 'bold' ,color:'white' }}>{count.worker}</Text>:null}
               
               </View>
                <View style={[styles.shadowContainerStyle, { width: 160, marginTop: 20, marginLeft: 10, marginRight: 10, marginBottom: 20, height: 150, backgroundColor: '#09736f' }]}>
                    <Text style={{ fontSize:17,marginTop: 10, padding: 20, fontWeight: 'bold',color:'white' }}>Total Fields </Text>
                {count ? < Text style={{fontSize:20, paddingLeft: 20,  marginLeft:45,fontWeight: 'bold' ,color:'white' }}>{count.field}</Text>: null}
               
                </View>
                <View style={[styles.shadowContainerStyle, { width: 160, marginTop: 20, marginLeft: 10, marginRight: 10, marginBottom: 20, height: 150, backgroundColor: '#1d4739' }]}>
                {count ? < Text style={{fontSize:17, paddingLeft: 20,fontWeight: 'bold' ,color:'white',marginTop:20 }}>All Task :{count.allTask}</Text> : null}
                 {count ? < Text style={{fontSize:17, paddingLeft: 20,fontWeight: 'bold' ,color:'white' ,marginTop:10}}>Completed: {count.completeTask}</Text> : null}
                 {count ? < Text style={{fontSize:17, paddingLeft: 20,fontWeight: 'bold' ,color:'white',marginTop:10 }}>Pending: {count.pendingTask}</Text> : null}
                </View>

            </View>
        </ScrollView>

    </View> 
    <ScrollView>

        <View>
            <ScrollView>
                <View style={styles.container}>
                    <View>
                    <MyLineChart />
                    </View>
                </View>
            </ScrollView>
        </View>
            <View style={styles.container}>
                <View>
                   <SalesChart />
                </View>
            </View>

            <View style={styles.container}>
                <View>
                   <ExpenseChart />
                </View>
            </View>

            {/* <ScrollView>
               <View style={[styles.container,]}>
                        <View>
                            < MyPieChart/>
                        </View>
                    </View>
            </ScrollView> */}

            <View style={styles.container}>
                <View>
                    < MyTaskPie/>
                </View>
            </View>

   </ScrollView>
                </>
    );
}

const styles = StyleSheet.create({
    shadowContainerStyle: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.9,
        shadowRadius: 3,
        elevation: 3,
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: 10,
    },
    header: {
        textAlign: 'center',
        fontSize: 18,
        padding: 16,
        marginTop: 16,
        fontWeight:'bold',
        color:'#064716'

    },
})