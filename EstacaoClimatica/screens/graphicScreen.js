import React from 'react';
import {View, Text, StyleSheet,ImageBackground, ScrollView,Dimensions,TouchableOpacity,Image} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {WebView} from 'react-native-webview'
import {
  LineChart,

} from "react-native-chart-kit";


const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const imagePath = '../assets/background.jpg'
const Graphic = ({ navigation: { navigate }, route  }) => {
    
  const values = route.params.values;
  const dates = route.params.dates;
  const dtInit = route.params.dateInit
  const dtFinal = route.params.dateInit
  const params = route.params.parametro
  console.log(params)
  console.log(dtInit)
  console.log(dtFinal)
  const variableWidth = dates.length >= 1000?(2000*4)/1000:1

  
  const chartConfig = {
    backgroundGradientFrom: "#FFF",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#fff",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };
  const data = {
    labels: dates,
    datasets: [
      {
        data: values,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // optional
        strokeWidth: 2 // optional
      }
    ],
    legend: ["Rainy Days"] // optional
  };

    return (

     /* <ScrollView
  horizontal={true}
  >
         <LineChart
         verticalLabelRotation={110}
            data={data}
            width={screenWidth*variableWidth}
            height={screenHeight-170}
            chartConfig={chartConfig}
          />
  </ScrollView>*/
     <WebView
     source={{uri: `http://10.0.0.194:3000/${params}/${dtInit}/${dtFinal}/`}}
   />

    );
  }

  export default Graphic;

  const styles = StyleSheet.create({
    container: {

      backgroundColor: '#fff'
    },
    backgroundImage:{
        flex: 1,
        flexDirection: 'column',
        resizeMode: "cover",
        justifyContent: "center"
      },
  })