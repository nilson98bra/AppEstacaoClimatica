import React, { useState,useEffect } from 'react';
const screenWidth = Dimensions.get("window").width;
import {View, Text,TextInput, StyleSheet,ImageBackground,Dimensions, TouchableOpacity,Alert} from 'react-native'
const imagePath = '../assets/background.jpg'
import AsyncStorage from '@react-native-async-storage/async-storage';

const pluviosidade = async (value) => {
  try {
    if(value != ""){
      await AsyncStorage.setItem('@pluviosidade',value)
    }
    
  } catch (e) {
    console.log(e)
  }
}

const temperatura = async (value) => {
  try {
    if(value != ""){
      await AsyncStorage.setItem('@temperatura', value)
    }
    
  } catch (e) {
    console.log(e)
  }
}

const pressao = async (value) => {
  try {
    if(value != ""){
      await AsyncStorage.setItem('@pressao',value)
    }
   
  } catch (e) {
    console.log(e)
  }
}

const umidade = async (value) => {
  try {
    if(value != ""){
      await AsyncStorage.setItem('@umidade',value)
    }
    
  } catch (e) {
    console.log(e)
  }
}

getPluviosidade = async () => {
  try {
    const value = await AsyncStorage.getItem('@pluviosidade');
    if (value !== null) {

      return value;
    }
  } catch (error) {
    // Error retrieving data
  }
};

getTemperatura = async () => {
  try {
    const value = await AsyncStorage.getItem('@temperatura');
    if (value !== null) {

      return value
    }
  } catch (error) {
    // Error retrieving data
  }
};

getPressao = async () => {
  try {
    const value = await AsyncStorage.getItem('@pressao');
    if (value !== null) {
      return value
    }
  } catch (error) {
    // Error retrieving data
  }
};

getUmidade = async () => {
  try {
    const value = await AsyncStorage.getItem('@umidade');
    if (value !== null) {
      return value
    }
  } catch (error) {
    // Error retrieving data
  }
};


/*const [Pluviosidade, setPluviosidade] = useState(getPluviosidade);
const [Temperatura, setTemperatura] = useState(getTemperatura);
const [Pressao, setPressao] = useState(getPressa);
const [Umidade, setUmidade] = useState(getUmidade);*/


const Setting = () => {



    const [TextPluviosidade, setTextPluviosidade] = useState([]);
    const [TextTemperatura, setTextTemperatura] = useState([]);
    const [TextPressao, setTextPressao] =  useState([]);
    const [TextUmidade, setTextUmidade] = useState([]);
  
    
    function saveInformation(){
      pluviosidade(TextPluviosidade)
      temperatura(TextTemperatura)
      pressao(TextPressao)
      umidade(TextUmidade)
     Alert.alert("Aviso", "Dados alterados com sucesso!")
    }

    useEffect(() => {
      AsyncStorage.getItem('@pluviosidade').then((value)=>{
        setTextPluviosidade(value)
      })
      AsyncStorage.getItem('@temperatura').then((value)=>{
        setTextTemperatura(value)
      })
      AsyncStorage.getItem('@pressao').then((value)=>{
        setTextPressao(value)
      })
      AsyncStorage.getItem('@umidade').then((value)=>{ 
        setTextUmidade(value)
      })
    },[]);




    return (

        <View style={styles.container}>
          <View style={styles.header}>
                <Text style={styles.textHeader}>Configurações de Eventos Extremos</Text>
                <View style={styles.lineHeader}></View> 
              </View>
              <Text style={styles.labelInput}>Temperatura (°)</Text>
              <TextInput placeholder="Temperatura" onChangeText={setTextTemperatura}  value={String(TextTemperatura)} style={styles.input} maxLength={4} keyboardType='numeric'></TextInput>
              <Text style={styles.labelInput}>Pluviosidade (mm)</Text>
              <TextInput placeholder="Pluviosidade"  onChangeText={setTextPluviosidade}   value={String(TextPluviosidade)} style={styles.input} maxLength={4} keyboardType='numeric'></TextInput>
              <Text style={styles.labelInput}>Umidade do Ar (%)</Text>
              <TextInput placeholder="Umidade do Ar"  onChangeText={setTextUmidade}  value={String(TextUmidade)} style={styles.input} maxLength={4} keyboardType='numeric'></TextInput>
              <Text style={styles.labelInput}>Pressão Atmosférica (hPa)</Text>
              <TextInput placeholder="Pressão Atmosférica"  onChangeText={setTextPressao}   value = {String(TextPressao)} style={styles.input} maxLength={4} keyboardType='numeric'></TextInput>
              <TouchableOpacity style={styles.btn} onPress={()=>saveInformation()}>
            <Text style={styles.btnText}>Confirmar</Text>
            </TouchableOpacity>
            
            </View>
      

    );
  }
  
  export default Setting;

  const styles = StyleSheet.create({
    container: {
      width: "100%",
      padding: 10,
     
      flex: 1,
      backgroundColor:"#fff"
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
    input:{
      backgroundColor: "#f7f7f7",
      marginTop: 5,
      width: "100%",
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.4,
      elevation: 4
    },
    labelInput:{
      fontSize: 16,
      color: "#000",
      fontFamily: "Roboto",
      marginTop: 5,
      fontFamily: "Roboto",
    
    },

    btn:{
      width: "100%",
      height:50,
      backgroundColor: "#00A9DE",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 15,
      borderRadius: 10,
      
    },

    btnText:{
      color:"#fff",
      fontWeight:"bold",
      fontSize:17,
      fontFamily: "Roboto",
    }

  })