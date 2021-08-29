import React, { useState,useEffect } from 'react';
import {View, Text, StyleSheet,ImageBackground, TouchableOpacity,Image} from 'react-native'
const Influxdb = require('influxdb-v2');
const imagePath = '../assets/background.jpg'
import Moment from 'moment'
import PushNotification from "react-native-push-notification";



const Home = ({ navigation: { navigate }  }) => {
  const [Temperatura, setTemperatura] = useState(0);
  const [Pressao, setPressao] = useState(0);
  const [Umidade, setUmidade] = useState(0);
  const [DateTemperatura, setDateTemperatura] = useState("00:00");
  const [DateUmidade, setDateUmidade] = useState("00:00");
  const [DatePressao, setDatePressao] = useState("00:00");



  
  (async () => {
 
    const influxdb = new Influxdb({
        host: '52.191.8.121',
        port: 8086,
        protocol: 'http',
        token: 'cVyV1G8DxT1jGK6wS--Ibvbe1TNPsYtgOOeON1Rv07gVc4_0wGn0U9I3SseENzi-IT1XmqPnm6ubugQ_8Hh6qw=='
    });
 
    const temperatura = await influxdb.query(
      { orgID: '0f616107822aece2' },
      { query: 'from(bucket: "measurements") |> range(start: -2m) |> filter(fn: (r) => r._measurement == "mqtt_consumer" and r._field == "uplink_message_decoded_payload_temperatura" )' }
      
  );
 
  const umidade = await influxdb.query(
    { orgID: '0f616107822aece2' },
    { query: 'from(bucket: "measurements") |> range(start: -2m) |> filter(fn: (r) => r._measurement == "mqtt_consumer" and r._field == "uplink_message_decoded_payload_umidade" )' }
  )

  const pressao = await influxdb.query(
    { orgID: '0f616107822aece2' },
    { query: 'from(bucket: "measurements") |> range(start: -2m) |> filter(fn: (r) => r._measurement == "mqtt_consumer" and r._field == "uplink_message_decoded_payload_pressao" )' }
  )

    setTemperatura(temperatura[0][0]["_value"])
    setUmidade(umidade[0][0]["_value"])
    setDateTemperatura(Moment(temperatura[0][0]["_time"]).format('DD/MM/YYYY HH:mm'))
    setDateUmidade(Moment(umidade[0][0]["_time"]).format('DD/MM/YYYY HH:mm'))
    setDatePressao(Moment(pressao[0][0]["_time"]).format('DD/MM/YYYY HH:mm'))
    setPressao(pressao[0][0]["_value"])
  
    let array = []
    // array.push(result)
    // console.log(array)
    
    })().catch(error => {
        console.error('\n🐞 An error occurred!', error);
        process.exit(1);
      });
  const MINUTE_MS = 60000;


useEffect(() => {
 

  const interval = setInterval(() => {
    (async () => {
 
      const influxdb = new Influxdb({
          host: '52.191.8.121',
          port: 8086,
          protocol: 'http',
          token: 'cVyV1G8DxT1jGK6wS--Ibvbe1TNPsYtgOOeON1Rv07gVc4_0wGn0U9I3SseENzi-IT1XmqPnm6ubugQ_8Hh6qw=='
      });
      
      const temperatura = await influxdb.query(
        { orgID: '0f616107822aece2' },
        //{ query: 'from(bucket: "climate_station") |> range(start: -10s) |> filter(fn: (r) => r._measurement == "sensores")' }
        //{ query: 'from(bucket: "climate_station") |> range(start: -1h) |> filter(fn: (r) => r._field == "temperature")' },
        { query: 'from(bucket: "measurements") |> range(start: -2m) |> filter(fn: (r) => r._measurement == "mqtt_consumer" and r._field == "uplink_message_decoded_payload_temperatura" )' }
        
    );
   
    const umidade = await influxdb.query(
      { orgID: '0f616107822aece2' },
      { query: 'from(bucket: "measurements") |> range(start: -2m) |> filter(fn: (r) => r._measurement == "mqtt_consumer" and r._field == "uplink_message_decoded_payload_umidade" )' }
    )

    const pressao = await influxdb.query(
      { orgID: '0f616107822aece2' },
      { query: 'from(bucket: "measurements") |> range(start: -2m) |> filter(fn: (r) => r._measurement == "mqtt_consumer" and r._field == "uplink_message_decoded_payload_pressao" )' }
    )

   
    setTemperatura(temperatura[0][0]["_value"])
    setUmidade(umidade[0][0]["_value"])
    setPressao(pressao[0][0]["_value"])
   
    setDateTemperatura(Moment(temperatura[0][0]["_time"]).format('DD/MM/YYYY HH:mm'))
    setDateUmidade(Moment(umidade[0][0]["_time"]).format('DD/MM/YYYY HH:mm'))
    setDatePressao(Moment(pressao[0][0]["_time"]).format('DD/MM/YYYY HH:mm'))
      
    
  
      
      })().catch(error => {
          console.error('\n🐞 An error occurred!', error);
          process.exit(1);
        });
  }, MINUTE_MS);

  return () => clearInterval(interval);
  
  
}, [])


    return (

  
      <View style={styles.container}>
                <View style={styles.header}>
                <Text style={styles.textHeader}>Home</Text>
                <View style={styles.lineHeader}></View> 
              </View>
                     <TouchableOpacity style={styles.buttonGraphic}  onPress={() =>
                       navigate('SettingGraph', { name: 'Temperatura' })} >
              <View style={styles.containerParametro}>
                <Image source={require('../assets/temperatura.png')} style={styles.image}></Image>
                <View>
                  <Text style={styles.paramName}>Temperatura</Text>
                  <Text style={styles.value}>Último Dado: {Temperatura}°</Text>
                  <Text style={styles.value}>Atualizado em: {DateTemperatura}</Text>
                </View>
   
                </View>

                </TouchableOpacity>
               
             
              <TouchableOpacity style={styles.buttonGraphic}  onPress={() =>
                       navigate('SettingGraph', { name: 'Umidade do Ar' })} >
              <View style={styles.containerParametro}>
                <Image source={require('../assets/humidity.png')} style={styles.image}></Image>
                <View>
                  <Text style={styles.paramName}>Umidade do Ar</Text>
                  <Text style={styles.value}>Último Dado: {Umidade}%</Text>
                  <Text style={styles.value}>Atualizado em: {DateUmidade}</Text>
                </View>

                </View>
                </TouchableOpacity>
               
           

              <TouchableOpacity style={styles.buttonGraphic}   onPress={() =>
                       navigate('SettingGraph', { name: 'Pressão Atmosférica' })} >
              <View style={styles.containerParametro}>
                <Image source={require('../assets/preassure.png')} style={styles.image}></Image>
                <View>
                  <Text style={styles.paramName}>Pressão Atmosférica</Text>
                  <Text style={styles.value}>Último Dado: {Pressao} hPa</Text>
                  <Text style={styles.value}>Atualizado em: {DatePressao}</Text>
                </View> 
                </View>  
              </TouchableOpacity>
               
            
          </View>

    );
  }
  
  export default Home;

  const styles = StyleSheet.create({
    container: {
      flex:1,
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: "#fff",
      padding: 10,
     
    },
    header: {
      width: "100%",
      minHeight: 45,
      backgroundColor: "#fff",
      alignItems: "flex-start",
      justifyContent: "flex-start"
    },
    lineHeader:{
      width: "100%",
      minHeight: 10,
      backgroundColor: "#447EF2",
      
    },
    textHeader:{
      fontSize: 19,
      fontWeight: "bold",
      color: "#447EF2",
      fontFamily: "Roboto",
     
    },
    buttonGraphic:{
      width: "100%",
      height: "16%",
      marginTop: 18,
      shadowColor: 'rgba(0,0,0, .6)', // IOS
      shadowOffset: { height: 10, width: 0 }, // IOS
      backgroundColor: '#fff',
      elevation: 12, // Android
      padding: 8
 
    },
    containerParametro:{
      width: "100%",
      height: "100%",   
      alignItems: "center",
    
      
      flexDirection: "row",
      
      
    },
    image:{
      width:58,
      height: 58,
      marginRight: 10

    },


    paramName:{
      fontSize: 20,
      color: "#000",
      fontFamily: "Roboto",
      fontWeight: "bold"

    },
    value:{
      fontSize: 17,
      fontFamily: "Roboto",
      color: "#000",
  
    }
  })