import React, {Component,useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import Tabs from './navigation/tabs';
import SettingGraph from './screens/settingGraphScreen';
import Graphic from './screens/graphicScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from "react-native-push-notification";

const Stack = createStackNavigator();


const createChannels = () =>{
  PushNotification.createChannel({
    channelId: "channel",
    channelName: "Channel"
  })
}

const handleNotification = (parametro,valor,unidade) =>{
  PushNotification.localNotification({
    channelId: "channel",
    title: `Evento Extremo - ${parametro}`,
    message: `Valor - ${valor}${unidade}`
  })
}



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
    const MINUTE_MS = 60000;

    const interval = setInterval(() => {
      handleNotification("Umidade do Ar","70","%")
      handleNotification("Temperatura","40","º")
      handleNotification("Pressão Atmosférica","900","hPa")
    }, MINUTE_MS);
  
    return () => clearInterval(interval);
  })
  console.disableYellowBox = true
    getPluviosidade()
    getTemperatura()
    getPressao()
    getUmidade()
 


    handleNotification("Umidade do Ar","70","%")
    handleNotification("Temperatura","40","º")
    handleNotification("Pressão Atmosférica","900","hPa")
    return(
      
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Tabs" headerMode="screen">
                <Stack.Screen name="Tabs" component={Tabs} options={{headerShown:false}}/>
                <Stack.Screen name="SettingGraph" component={SettingGraph} options={({ route }) => ({ title: route.params.name,  headerTintColor: '#447EF2',})}/>
                <Stack.Screen name="Graphic" component={Graphic} options={{ title: 'Gráfico' }}/>           
            </Stack.Navigator>
           
        </NavigationContainer>
    );
}

export default App;