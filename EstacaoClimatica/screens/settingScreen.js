import React, { useState,useEffect } from 'react';
const screenWidth = Dimensions.get("window").width;
import {View, Text,TextInput, StyleSheet,ImageBackground,Dimensions, TouchableOpacity,Alert} from 'react-native'
const imagePath = '../assets/background.jpg'
import AsyncStorage from '@react-native-async-storage/async-storage';

const pluviosidade = async (value) => {
  try {
    await AsyncStorage.setItem('@pluviosidade', value)
  } catch (e) {
    console.log(e)
  }
}

const temperatura = async (value) => {
  try {
    await AsyncStorage.setItem('@temperatura', value)
  } catch (e) {
    console.log(e)
  }
}

const pressao = async (value) => {
  try {
    await AsyncStorage.setItem('@pressao', value)
  } catch (e) {
    console.log(e)
  }
}

const umidade = async (value) => {
  try {
    await AsyncStorage.setItem('@umidade', value)
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
     /* Alert.alert("Salvo", "Informação Salva com sucesso")*/
    }

    useEffect(() => {
      AsyncStorage.getItem('@pluviosidade').then((value)=>{
        setTextPluviosidade(value)
        console.log(value)
        AsyncStorage.getItem('@temperatura').then((value)=>{
          setTextTemperatura(value)
          console.log(value)
          AsyncStorage.getItem('@pressao').then((value)=>{    
            setTextPressao(value)
            console.log(value)
            AsyncStorage.getItem('@umidade').then((value)=>{ 
              console.log(value)
              setTextUmidade(value)

            })
          })
        })
      })

    },[]);




    return (

        <ImageBackground source={require('../assets/background.jpg')} style={styles.image}>
          <View style={styles.header}>
            <Text style={styles.textHeader} >
              Configurações de Eventos Extremos
            </Text>
          </View>
          <View style={styles.container}>
            <Text style={styles.labelInput}>Temperatura</Text>
            <TextInput placeholder="Temperatura" onChangeText={setTextTemperatura}  value={String(TextTemperatura)} style={styles.input}></TextInput>
            <Text style={styles.labelInput}>Pluviosidade</Text>
            <TextInput placeholder="Pluviosidade"  onChangeText={setTextPluviosidade}   value={String(TextPluviosidade)} style={styles.input}></TextInput>
            <Text style={styles.labelInput}>Umidade do Ar</Text>
            <TextInput placeholder="Umidade do Ar"  onChangeText={setTextUmidade}  value={String(TextUmidade)} style={styles.input}></TextInput>
            <Text style={styles.labelInput}>Pressão Atmosférica</Text>
            <TextInput placeholder="Pressão Atmosférica"  onChangeText={setTextPressao}   value = {String(TextPressao)} style={styles.input}></TextInput>
            <TouchableOpacity style={styles.btn} onPress={saveInformation()}>
             
              <Text style={styles.btnText}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>

    );
  }
  
  export default Setting;

  const styles = StyleSheet.create({
    container: {
      backgroundColor:'rgba(243,243,243,0.69)',
      width: "95%",
      padding: 10,
      borderRadius: 10,
      borderStyle: 'solid',
      borderColor: "#fff",
      borderWidth: 2,
    },
    image:{
      flex: 1,
      resizeMode: "cover",
      alignItems: "center"
    },
    input:{
      backgroundColor: "#fff",
      marginTop: 5,
      width: "100%",
      borderRadius: 10
    },
    labelInput:{
      fontSize: 20,
      color: "#00465F",
      fontFamily: "Roboto",
      fontWeight: "bold"
    },
    header:{
      backgroundColor: "#fff",
      width: "100%",
      height: "8%",
      fontSize: 18,
      marginBottom: 10,
      justifyContent: "center",
      alignItems: "center"
    },
    textHeader:{
      fontSize: 20,
      fontWeight: "bold",
      color: "#00A9DE"
    },
    btn:{
      width: "100%",
      height:50,
      backgroundColor: "#00A9DE",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 15,
      borderRadius: 10
    },

    btnText:{
      color:"#fff",
      fontWeight:"bold",
      fontSize:17
    }

  })