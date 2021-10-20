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
          await AsyncStorage.setItem('@umidade',"90")
        }

      } catch (error) {
      }
}





const App = ()=>{
  useEffect(() => {
    createChannels()
    setTimeout(()=>{
      data = new Date()
    
        console.log("BackgroundTimer - VAMOOO: ",value)
          handleNotification("Umidade do Ar","70","%",data.getDate().toString().padStart(2, "0"),(data.getMonth() + 1).toString().padStart(2, "0"),data.getFullYear(),data.getHours(),data.getMinutes(),data.getSeconds())
          /*handleNotification("Temperatura","40","º")
          handleNotification("Pressão Atmosférica","900","hPa")*/
          BackgroundTimer.runBackgroundTimer(() => { 
            data = new Date()
        
            console.log("BackgroundTimer - VAMOOO: ")
              handleNotification("Umidade do Ar","70","%",data.getDate().toString().padStart(2, "0"),(data.getMonth() + 1).toString().padStart(2, "0"),data.getFullYear(),data.getHours(),data.getMinutes(),data.getSeconds())
              /*handleNotification("Temperatura","40","º")
              handleNotification("Pressão Atmosférica","900","hPa")*/
              }, 
             60000);
    },value)



   /*BackgroundTimer.runBackgroundTimer(() => { 

      handleNotification("Umidade do Ar","70","%")
      handleNotification("Temperatura","40","º")
      handleNotification("Pressão Atmosférica","900","hPa")
      }, 
      60000);*/
 

  })
 
  

  console.disableYellowBox = true
    getPluviosidade()
    getTemperatura()
    getPressao()
    getUmidade()
 
    return(
      
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Tabs" headerMode="screen">
                <Stack.Screen name="Tabs" component={Tabs} options={{headerShown:false}}/>
                <Stack.Screen name="SettingGraph" component={SettingGraph} options={({ route }) => ({ title: route.params.name})}/>
                <Stack.Screen name="Graphic" component={Graphic} options={{ title: 'Gráfico' }}/>           
            </Stack.Navigator>
           
        </NavigationContainer>
    );
}

export default App;