/**
 * @format
 */

 import {AppState,AppRegistry} from 'react-native';
 import React, {useRef,useEffect } from 'react';
 import App from './App';
 import {name as appName} from './app.json';
 import PushNotification from "react-native-push-notification";
 import BackgroundFetch from 'react-native-background-fetch';
 import BackgroundTimer from 'react-native-background-timer';
 import AsyncStorage from '@react-native-async-storage/async-storage';
 import {Alert} from 'react-native'
 

 let data = new Date()
 let second = data.getSeconds();

 let countMsg = 0
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
 PushNotification.configure({
 
     onNotification: function (notification) {
         console.log("NOTIFICATION:", notification);
         notification.finish(PushNotificationIOS.FetchResult.NoData)       
     },
     requestPermissions: Platform.OS === 'ios'
 });

 
 let MyHeadlessTask = async (event) => {
  BackgroundTimer.stopBackgroundTimer()
  let taskId = event.taskId;
  BackgroundTimer.runBackgroundTimer(() => { 
    data = new Date()
    AsyncStorage.getItem('@UmidadeMinuto').then(async (value)=>{
      if(data.getMinutes() != value){
        handleNotification("AAAAAAAAAAAAAAAAAA","70","%",data.getDate().toString().padStart(2, "0"),(data.getMonth() + 1).toString().padStart(2, "0"),data.getFullYear(),data.getHours(),data.getMinutes(),data.getSeconds())
        AsyncStorage.setItem('@UmidadeMinuto', String(data.getMinutes())).then(()=>{
          console.log("FOI")
        })                     
      }
    })
    
      /*handleNotification("Temperatura","40","º")
      handleNotification("Pressão Atmosférica","900","hPa")*/
      }, 
     20000)

    /*AsyncStorage.getItem('@UmidadeMinuto').then(async (value)=>{
      console.log(value)
      if(data.getMinutes() != value){
        
        handleNotification("Umidade do Ar","70","%",data.getDate().toString().padStart(2, "0"),(data.getMonth() + 1).toString().padStart(2, "0"),data.getFullYear(),data.getHours(),data.getMinutes(),data.getSeconds())
        AsyncStorage.setItem('@UmidadeMinuto', String(data.getMinutes())).then(()=>[
          console.log("FOI")
        ])
      }
    })*/

    BackgroundFetch.finish(taskId);
}





  BackgroundFetch.configure({
    minimumFetchInterval: 1,
    forceAlarmManager: true,
    stopOnTerminate: false,
    enableHeadless: true,
    startOnBoot: true,
    requiresBatteryNotLow: false,
    requiresStorageNotLow: false
  },async (taskId) => {
  
    console.log('[BackgroundFetch HeadlessTask] start:', taskId);

  },async (taskId) => {
  
    BackgroundFetch.finish(taskId);

  })


createChannels()
BackgroundFetch.registerHeadlessTask(MyHeadlessTask);

AppRegistry.registerComponent(appName, () => App);
