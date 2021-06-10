import React, { useState } from 'react';
import {View, Text,StyleSheet,TouchableOpacity,ImageBackground,Alert} from 'react-native'
import DatePicker from 'react-native-datepicker'
import Moment from 'moment'
import AsyncStorage from '@react-native-async-storage/async-storage';
const imagePath = '../assets/background.jpg'
const SettingGraph = ({ navigation: { navigate }  }) => {
    const [dateInit, setDateInit] = useState(new Date());
    const [dateFinal, setDateFinal] = useState(new Date());


    function dateComparation(inicio, fim){
      let init = Moment(inicio).format('DD/MM/YYYY')
      let final = Moment(fim).format('DD/MM/YYYY')
      if(init <= final){
        return true
      }
      else{
        return false
      }

    }
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../assets/background.jpg')} style={styles.image}>
        <View style={styles.dateContainer}>
            <Text style={styles.labelDate}>Data Inicial</Text>
            <DatePicker date={dateInit} onDateChange={setDateInit} style={styles.dateComponent}/>
            <Text style={styles.labelDate}>Data Final</Text>
            <DatePicker date={dateFinal} onDateChange={setDateFinal} style={styles.dateComponent}/>

            <TouchableOpacity style={styles.btnDate} 
                onPress={() => dateComparation(dateInit, dateFinal)===true? navigate('Graphic'):Alert.alert(
                  "ERRO",
                  "Data de inicio não pode ser maior que a data final",
                )}>
                <Text style={styles.textBtnDate}>Mostrar Gráfico</Text>
            </TouchableOpacity>
     
 
        </View>
        </ImageBackground>

      </View>
    );
  }
  
  export default SettingGraph;

  const styles = StyleSheet.create({
    container: {
      flex:1,
      flexDirection: "column",
      backgroundColor: '#fff'
    },
    image:{
      flex: 1,

      resizeMode: "cover",
      justifyContent: "center"
    },
    dateContainer:{
      padding: 20,
      backgroundColor:'rgba(255,255,255,0.80)',
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: "#fff",
       
        justifyContent: "center"
    },
    dateComponent:{
       width: "100%",
       marginBottom: 10,
    },
    labelDate:{
      fontSize: 20,
      marginBottom: 3
    },
    btnDate:{
      
      width: "97%",
      padding: 8,
      backgroundColor: "#3EBCE0",
      justifyContent: "center",
      alignItems: 'center'
    },
    textBtnDate:{
      fontSize: 15,
      color: "#fff"
    }
  })