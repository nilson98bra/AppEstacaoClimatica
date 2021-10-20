/**
 * @format
 */

 import {AppRegistry} from 'react-native';
 import React, {useEffect } from 'react';
 import App from './App';
 import {name as appName} from './app.json';
 import PushNotification from "react-native-push-notification";
 import BackgroundFetch from 'react-native-background-fetch';
 import BackgroundTimer from 'react-native-background-timer';
 import AsyncStorage from '@react-native-async-storage/async-storage';
 

 let data = new Date()
 let second = data.getSeconds();
 let value=60000-(second*1000)

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
  let taskId = event.taskId;
  console.log('[BackgroundFetch HeadlessTask] start: headless');
  
  data = new Date()
  second = data.getSeconds();
  value=60000-(second*1000)
  console.log("BackgroundTimer - VAMOOO: ", value)
  handleNotification("Umidade do Ar","70","%",data.getDate().toString().padStart(2, "0"),(data.getMonth() + 1).toString().padStart(2, "0"),data.getFullYear(),data.getHours(),data.getMinutes(),data.getSeconds())

}




  BackgroundFetch.configure({
    minimumFetchInterval: 1,
    forceAlarmManager: true,
    stopOnTerminate: false,
    enableHeadless: true,
    startOnBoot: true,
  }, async (taskId) => {
  
    console.log('[BackgroundFetch HeadlessTask] start:', taskId);

  })


createChannels()
BackgroundFetch.registerHeadlessTask(MyHeadlessTask);

AppRegistry.registerComponent(appName, () => App);
