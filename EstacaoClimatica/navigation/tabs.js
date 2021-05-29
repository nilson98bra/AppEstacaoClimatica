import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/homeScreen'
import SettingScreen from '../screens/settingScreen'
import {View, Text, StyleSheet, Image} from 'react-native'
const Tab = createBottomTabNavigator();


function MyTabs() {
  return (
    <Tab.Navigator
    tabBarOptions={{
      showLabel:false
    }}>
      <Tab.Screen name="Home" component={HomeScreen} options={{
        tabBarIcon: ({focused}) =>(
          <View style={styles.boxItemTabNavigator}>
            <Image 
            source={require('../assets/home.png')}
            resizeMode='contain'
            style={{
              width:24,
              height:24,
              tintColor: focused ? '#cef2fB' : '#748c94'
            }}
            />
            <Text style={{
              fontSize: 12,
              color: focused ? '#00A9DE' : '#748c94',
              fontWeight: focused ? 'bold' : 'normal'
            }}>HOME</Text>
          </View>
        )      
      }}/>
      <Tab.Screen name="Configuração" component={SettingScreen} options={{
        tabBarIcon: ({focused}) =>(
          <View style={styles.boxItemTabNavigator}>
            <Image 
            source={require('../assets/settings.png')}
            resizeMode='contain'
            style={{
              width:24,
              height:24,
              tintColor: focused ? '#cef2fB' : '#748c94'
            }}
            />
            <Text style={{
              fontSize: 12,
              color: focused ? '#00A9DE' : '#748c94',
              fontWeight: focused ? 'bold' : 'normal'
            }}>CONFIGURAÇÕES</Text>
          </View>
        )      
      }}/>
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  boxItemTabNavigator: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10
  },
  icon:{
    
  }
})
export default MyTabs;