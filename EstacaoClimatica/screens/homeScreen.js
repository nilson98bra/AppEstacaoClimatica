import React, { useState,useEffect } from 'react';
import {View, Text, StyleSheet,ImageBackground, TouchableOpacity,Image} from 'react-native'
const Influxdb = require('influxdb-v2');
const imagePath = '../assets/background.jpg'
import Moment from 'moment'




const Home = ({ navigation: { navigate }  }) => {
  const [Temperatura, setTemperatura] = useState(0);
  const [Pressao, setPressao] = useState(0);
  const [Pluviosidade, setPluviosidade] = useState(0);
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
      { query: 'from(bucket: "measurements") |> range(start: -1m) |> filter(fn: (r) => r._measurement == "mqtt_consumer" and r._field == "payload_fields_temperatura" )' }
      
  );
 
  const umidade = await influxdb.query(
    { orgID: '0f616107822aece2' },
    { query: 'from(bucket: "measurements") |> range(start: -1m) |> filter(fn: (r) => r._measurement == "mqtt_consumer" and r._field == "payload_fields_umidade" )' }
  )

  const pressao = await influxdb.query(
    { orgID: '0f616107822aece2' },
    { query: 'from(bucket: "measurements") |> range(start: -1m) |> filter(fn: (r) => r._measurement == "mqtt_consumer" and r._field == "payload_fields_pressao" )' }
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
  const MINUTE_MS = 6000;

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
        { query: 'from(bucket: "measurements") |> range(start: -1m) |> filter(fn: (r) => r._measurement == "mqtt_consumer" and r._field == "payload_fields_temperatura" )' }
        
    );
   
    const umidade = await influxdb.query(
      { orgID: '0f616107822aece2' },
      { query: 'from(bucket: "measurements") |> range(start: -1m) |> filter(fn: (r) => r._measurement == "mqtt_consumer" and r._field == "payload_fields_umidade" )' }
    )

    const pressao = await influxdb.query(
      { orgID: '0f616107822aece2' },
      { query: 'from(bucket: "measurements") |> range(start: -1m) |> filter(fn: (r) => r._measurement == "mqtt_consumer" and r._field == "payload_fields_pressao" )' }
    )

    console.log(temperatura[0][0]["_value"])
    setTemperatura(temperatura[0][0]["_value"])
    setUmidade(umidade[0][0]["_value"])
    setPressao(pressao[0][0]["_value"])
   
    setDateTemperatura(Moment(temperatura[0][0]["_time"]).format('DD/MM/YYYY HH:mm'))
    setDateUmidade(Moment(umidade[0][0]["_time"]).format('DD/MM/YYYY HH:mm'))
    setDatePressao(Moment(pressao[0][0]["_time"]).format('DD/MM/YYYY HH:mm'))
      
    
      let array = []
      // array.push(result)
      // console.log(array)
      
      })().catch(error => {
          console.error('\n🐞 An error occurred!', error);
          process.exit(1);
        });
  }, MINUTE_MS);

  return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
}, [])


    return (

        <ImageBackground source={require('../assets/background.jpg')} style={styles.backgroundImage}>
          <View style={styles.headerHome}>
              <Text style={styles.headerTitle}>Home</Text>
          </View>
          <View style={styles.container}>

              <View style={styles.containerParametro}>
                <Image source={require('../assets/temperatura.png')} style={styles.image}></Image>
                <View>
                  <Text style={styles.paramName}>Temperatura</Text>
                  <Text style={styles.value}>Ultimo dado:{Temperatura}°</Text>
                  <Text style={styles.value}>Data: {DateTemperatura}</Text>
                </View>
                <TouchableOpacity style={styles.buttonGraphic}  onPress={() =>
                       navigate('SettingGraph', { name: 'Temperatura' })} >
                
                  <Image source={require('../assets/graphic.png')} style={styles.imageGraphic}></Image>
                </TouchableOpacity>
               
              </View>
              <View style={styles.containerParametro}>
                <Image source={require('../assets/humidity.png')} style={styles.image}></Image>
                <View>
                  <Text style={styles.paramName}>Umidade do Ar</Text>
                  <Text style={styles.value}>Ultimo dado: {Umidade}%</Text>
                  <Text style={styles.value}>Data: {DateUmidade}</Text>
                </View>
                <TouchableOpacity style={styles.buttonGraphic}  onPress={() =>
                       navigate('SettingGraph', { name: 'Umidade do Ar' })} >
                  <Image source={require('../assets/graphic.png')} style={styles.imageGraphic}></Image>
                </TouchableOpacity>
               
              </View>
              <View style={styles.containerParametro}>
                <Image source={require('../assets/rain.png')} style={styles.image}></Image>
                <View>
                  <Text style={styles.paramName}>Pluviosidade</Text>
                  <Text style={styles.value}>Ultimo dado: {Pluviosidade} mm</Text>
                  <Text style={styles.value}>Data:</Text>
                </View>
                <TouchableOpacity style={styles.buttonGraphic}   onPress={() =>
                      navigate('SettingGraph', { name: 'Pluviosidade' })} >
                  <Image source={require('../assets/graphic.png')} style={styles.imageGraphic}></Image>
                </TouchableOpacity>
               
              </View>

              <View style={styles.containerParametro}>
                <Image source={require('../assets/preassure.png')} style={styles.image}></Image>
                <View>
                  <Text style={styles.paramName}>Pressão Atmosférica</Text>
                  <Text style={styles.value}>Ultima dado: {Pressao} hPa</Text>
                  <Text style={styles.value}>Data: {DatePressao}</Text>
                </View>
                <TouchableOpacity style={styles.buttonGraphic}   onPress={() =>
                       navigate('SettingGraph', { name: 'Pressão Atmosférica' })} >
                  <Image source={require('../assets/graphic.png')} style={styles.imageGraphic}></Image>
                </TouchableOpacity>
               
              </View>
          </View>          
        </ImageBackground>

    );
  }
  
  export default Home;

  const styles = StyleSheet.create({
    container: {
      flex:1,
      flexDirection: "column",
      alignItems: "center",
     
    },
    backgroundImage:{
      flex: 1,
      flexDirection: 'column',
      resizeMode: "cover",
      justifyContent: "center"
    },
    headerHome:{
      width: "100%",
      height: "8%",
      backgroundColor:'#fff',
      justifyContent: "center",
      alignItems: "center"
    },
    endereco:{
      fontSize: 23,
      fontWeight: "bold",
      color: "#00A9DE"
    },
    headerTitle:{
      fontSize: 20,
      color: "#00A9DE"
    },
    containerParametro:{
      width: "95%",
      height: "16%",
      marginTop: 18,
      backgroundColor:'rgba(255,255,255,0.68)',
      borderStyle: 'solid',
      borderWidth: 2,
      borderColor: "#fff",
      borderRadius: 10,
      alignItems: "center",
      padding: 8,
      flexDirection: "row"
    },
    image:{
      width:58,
      height: 58,
      marginRight: 10

    },
    imageGraphic:{
      width:35,
      height: 35,

    },
    buttonGraphic:{
      position: "absolute",
      right:0,
      marginRight: 8

    },
    paramName:{
      fontSize: 20,
      color: "#00465F",
      fontFamily: "Roboto",
      fontWeight: "bold"

    },
    value:{
      fontSize: 17,
      fontFamily: "Roboto",
      color: "#00465F",
      fontWeight: "bold"
    }
  })