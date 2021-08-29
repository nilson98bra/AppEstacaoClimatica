import React from 'react';
import {View, Text, StyleSheet,ImageBackground, ScrollView,Dimensions,TouchableOpacity,Image} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {WebView} from 'react-native-webview'
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const imagePath = '../assets/background.jpg'
const Graphic = ({route}) => {
    

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
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // optional
        strokeWidth: 2 // optional
      }
    ],
    legend: ["Rainy Days"] // optional
  };

    return (

      <ScrollView
  horizontal={true}
  >
         <LineChart
            data={data}
            width={screenWidth*5}
            height={screenHeight-100}
            chartConfig={chartConfig}
          />
  </ScrollView>


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