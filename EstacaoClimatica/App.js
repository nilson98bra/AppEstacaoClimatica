import React, {useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import Tabs from './navigation/tabs';
import SettingGraph from './screens/settingGraphScreen';
import Graphic from './screens/graphicScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from "react-native-push-notification";
import BackgroundFetch from 'react-native-background-fetch';
import BackgroundTimer from 'react-native-background-timer';
import BackgroundService from 'react-native-background-actions';



let data = new Date()
let checkFirstTime 
let second = data.getSeconds();
let value=60000-(second*1000)
let firstTime = true
const createChannels = () =>{
  PushNotification.createChannel({
    channelId: "channel",
    channelName: "Channel"
  })
}



const handleNotification = (parametro,valor,unidade,dia,mes,ano,hora,minuto,segundo) =>{
  PushNotification.localNotification({
    channelId: "channel",
    title: `${parametro} - ${dia}/${mes}/${ano} ${hora}:${minuto}:${segundo}`,
    message: `Valor - ${valor}${unidade}`,
    priority: "high"
  })
}

const Stack = createStackNavigator();

async function getPluviosidade(){
    try {
        const value = await AsyncStorage.getItem('@pluviosidade');
        if (value === null) {
          // We have data!!
          await AsyncStorage.setItem('@pluviosidade', "170")
        }
        else{
         
        }
      } catch (error) {
    }
}

async function getTemperatura(){
    try {
        const value = await AsyncStorage.getItem('@temperatura');
        if (value === null) {
          // We have data!!
          await AsyncStorage.setItem('@temperatura',"35")
        }

      } catch (error) {
}
}

async function getPressao(){
    try {
        const value = await AsyncStorage.getItem('@pressao');
        if (value === null) {
          // We have data!!
         
          await AsyncStorage.setItem('@pressao',"100")
        }

      } catch (error) {
}
}

async function getUmidade(){
  try {
      const value = await AsyncStorage.getItem('@umidade');
      if (value === null) {
        // We have data!!
       
        await AsyncStorage.setItem('@umidade',"50")
      }

    } catch (error) {
}
}


async function createMinuteUmidade(){
  try {
      const value = await AsyncStorage.getItem('@UmidadeMinuto');
      if (value === null) {
        // We have data!!
        await AsyncStorage.setItem('@UmidadeMinuto',"")
      }

    } catch (error) {
    }
}

async function createMinuteTemperatura(){
  try {
      const value = await AsyncStorage.getItem('@TemperaturaMinuto');
      if (value === null) {
        // We have data!!
        await AsyncStorage.setItem('@TemperaturaMinuto',"")
      }

    } catch (error) {
    }
}

async function createMinutePressao(){
  try {
      const value = await AsyncStorage.getItem('@PressaoeMinuto');
      if (value === null) {
        // We have data!!
        await AsyncStorage.setItem('@PressaoMinuto',"")
      }

    } catch (error) {
    }
}

async function stateActive(){
  try {
    const value = await AsyncStorage.getItem('@firstTime');
    if (value === null) {
      // We have data!!
      await AsyncStorage.setItem('@firstTime',"false")
    }

  } catch (error) {
  }
}

async function activeRadioButton(){
  try {
    const value = await AsyncStorage.getItem('@radiobutton');
    if (value === null) {
      console.log("aqui ficou 0 o radiobutton")
      await AsyncStorage.setItem('@radiobutton',"0")
    }

  } catch (error) {
  }
}





const App = ()=>{
  useEffect(() => {
    createChannels()
    stateActive()
    activeRadioButton()
    setTimeout(()=>{
      data = new Date()

         /* handleNotification("Umidade do Ar","70","%",data.getDate().toString().padStart(2, "0"),(data.getMonth() + 1).toString().padStart(2, "0"),data.getFullYear(),data.getHours(),data.getMinutes(),data.getSeconds())
          handleNotification("Temperatura","40","??")
          handleNotification("Press??o Atmosf??rica","900","hPa")*/
          
          AsyncStorage.getItem('@firstTime').then(async (valueFirst)=>{
            console.log("olaa: ",valueFirst)
            if(valueFirst == "false"){
              AsyncStorage.setItem('@firstTime', "true").then(()=>{
                console.log("aqui ficou true")
                checkFirstTime = true
              })  
              BackgroundTimer.runBackgroundTimer(() => { 
                data = new Date()
                if(checkFirstTime == true){
                  AsyncStorage.getItem('@UmidadeMinuto').then(async (value)=>{
                    console.log(value)
                    if(data.getMinutes() != value){
                      AsyncStorage.getItem('@radiobutton').then(async (value)=>{

                        if(value==="0"){
                          handleNotification("Umidade do Ar","70","%",data.getDate().toString().padStart(2, "0"),(data.getMonth() + 1).toString().padStart(2, "0"),data.getFullYear(),data.getHours(),data.getMinutes(),data.getSeconds())
                          AsyncStorage.setItem('@UmidadeMinuto', String(data.getMinutes())).then(()=>{
                            console.log("FOI")
                          }) 
                        }
                    })
                                                           
                    }
                  })
                }

                
                  /*handleNotification("Temperatura","40","??")
                  handleNotification("Press??o Atmosf??rica","900","hPa")*/
                  }, 
                 20000)                   
            }
          })
;
    },value)

 

  })
 
  

  console.disableYellowBox = true
    getPluviosidade()
    getTemperatura()
    getPressao()
    getUmidade()
    createMinutePressao()
    createMinuteTemperatura()
    createMinuteUmidade()
   
   
    return(
      
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Tabs" headerMode="screen">
                <Stack.Screen name="Tabs" component={Tabs} options={{headerShown:false}}/>
                <Stack.Screen name="SettingGraph" component={SettingGraph} options={({ route }) => ({ title: route.params.name, headerTintColor: '#447EF2',})}/>
                <Stack.Screen name="Graphic" component={Graphic} options={{ title: 'Gr??fico',headerTintColor: '#447EF2', }}/>           
            </Stack.Navigator>
           
        </NavigationContainer>
    );
}

export default App;