import React, { useState } from 'react';
import {View, Text,StyleSheet,TouchableOpacity,ImageBackground,Alert, Image} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment'

import TimePicker from "react-native-24h-timepicker";
import AsyncStorage from '@react-native-async-storage/async-storage';
const imagePath = '../assets/background.jpg'
const Influxdb = require('influxdb-v2');


function generateValues(nNumbers){
  const values = Array.from(Array(nNumbers).keys()).map(()=>{
    return Math.floor(Math.random() * nNumbers)
})
return values
}




function getDates (startDate, nDays) {
  const dates = []
  for(let i=0; i<nDays; i++){
    let day = Moment(Moment(startDate, "DD-MM-YYYY").add(i, 'days')).format("YYYY-MM-DD")
    dates.push(day)
  }

  return dates
}

// Usage
const dates = getDates(new Date("2021-06-22"), 537)
const values = generateValues(537)





const SettingGraph = ({ navigation: { navigate }, route  }) => {
    const [dateInit, setDateInit] = useState(new Date());
    const [dateFinal, setDateFinal] = useState(new Date());
    const [hourInit, setHourInit] = useState(new Date());
    const [hourFinal, setHourFinal] = useState(new Date());
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [input, setInput] = useState(0);

    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate
      setShow(Platform.OS === 'ios');
      console.log(currentDate)
      if(currentDate != undefined){
        if(input == 1){
 
          setDateInit(currentDate)
       
        }else if(input == 2){
         
          setHourInit(currentDate)
        
        }else if(input == 3){
          
          setDateFinal(currentDate)
          
        }else{
       
          setHourFinal(currentDate)
         
        }
      }

    };
  

    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };
  
    const showDatepickerInit = () => {
      
      showMode('date');
      setInput(1)
    };

    const showTimepickerInit = () => {
      
      showMode('time');
      setInput(2)
    };
    const showDatepickerFinal = () => {
      
      showMode('date');
      setInput(3)
    };
    const showTimepickerFinal = () => {
      
      showMode('time');
      setInput(4)
    };
    function dateComparation(dateInit, hourInit, dateFinal, hourFinal){
      let dtInit = Moment(dateInit).format('YYYY-MM-DD')
      let hrInit = Moment(hourInit).format('HH:mm:ss')
      let dtFinal = Moment(dateFinal).format('YYYY-MM-DD')
      let hrFinal = Moment(hourFinal).format('HH:mm:ss')
      let init = `${dtInit}T${hrInit}.000Z`
      let final = `${dtFinal}T${hrFinal}.000Z`

      init = Moment(Date.parse(init)).add(3, 'hours').format('YYYY-MM-DDTHH:mm:ss')
      final = Moment(Date.parse(final)).add(3, 'hours').format('YYYY-MM-DDTHH:mm:ss')
      if(init <= final){
        return true
      }
      else{
        return false
      }
      
    }


    return (
      <View style={styles.container}>
        
        <View style={styles.dateContainer}>
        <Text style={styles.title}>Selecione o período de Analise:</Text>
          <TouchableOpacity style={styles.btnDateHour} onPress={showDatepickerInit}>
            <View style={styles.dateHour}>
                <Text style={styles.labelDate}>Data Inicial: {Moment(dateInit.toString()).format('DD/MM/YYYY')}</Text>
                <Image source={require('../assets/calendar.png')} style={styles.image}></Image>       
            </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnDateHour} onPress={showTimepickerInit}>
            <View style={styles.dateHour}>
                <Text style={styles.labelDate}>Hora Inicial: {Moment(hourInit.toString()).format('HH:mm:ss')}</Text>             
                  <Image source={require('../assets/clock.png')} style={styles.image}></Image>          
            </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.btnDateHour} onPress={showDatepickerFinal}>
            <View style={styles.dateHour}>
                <Text style={styles.labelDate}>Data Final: {Moment(dateFinal.toString()).format('DD/MM/YYYY')}</Text>     
                <Image source={require('../assets/calendar.png')} style={styles.image}></Image> 
            </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnDateHour} onPress={showTimepickerFinal}>
              <View style={styles.dateHour}>
                  <Text style={styles.labelDate}>Hora Final: {Moment(hourFinal.toString()).format('HH:mm:ss')}</Text>
                  <Image source={require('../assets/clock.png')} style={styles.image}></Image>          
              </View>
            </TouchableOpacity>
  
              {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            )}
            <TouchableOpacity style={styles.btnDate} 
                onPress={() => dateComparation(dateInit, hourInit,dateFinal, hourFinal)===true? navigate('Graphic',{ 
                  dateInit: dateInit,
                  dateFinal: dateFinal,
                  parametro: route.params.name,
                  values: values,
                  dates: dates
                }):Alert.alert(
                  "ERRO",
                  "Data de inicio não pode ser maior ou igual que a data final",
                )}>
                <Text style={styles.textBtnDate}>Pesquisar</Text>
            </TouchableOpacity>
        </View>
      

      </View>
    );
  }
  
  export default SettingGraph;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor:'rgba(255,255,255,0.80)',
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: "#fff",
    },

    dateComponent:{
       width: "100%",
       marginBottom: 10,
       shadowColor: '#000',
       shadowOffset: {width: 0, height: 1},
       shadowOpacity: 0.4,
       elevation: 4
    },

    title:{
      fontSize: 20,
      marginBottom: 15,
      fontFamily: "Roboto",
      color: "#000",
      fontWeight: "bold"
    },
    labelDate:{
      fontSize: 18,
      marginBottom: 3,
      fontFamily: "Roboto",
      color: "#000"
    },
    btnDateHour:{
      width: "100%",
      alignItems: "center",
      shadowColor: 'rgba(0,0,0, .6)',
      shadowOffset: { height: 10, width: 0 }, 
      backgroundColor: '#fff',
      elevation: 12, 
      padding: 8,
      borderRadius: 10,
      marginBottom: 15
    },
    dateHour:{
      width: "100%",
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: "row",
      

      
    },

    image:{
      width:38,
      height: 38,
     
    },
    btnDate:{
      borderRadius: 10,
      width: "100%",
      height:50,
      backgroundColor: "#3EBCE0",
      justifyContent: "center",
      alignItems: 'center'
    },
    textBtnDate:{
      fontSize: 15,
      color: "#fff",
      fontFamily: "Roboto",
    }
  })