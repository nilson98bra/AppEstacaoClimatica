import React from 'react';
import {View, Text, StyleSheet,ImageBackground, ScrollView,Dimensions,TouchableOpacity,Image} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;
const imagePath = '../assets/background.jpg'
const Graphic = () => {
    
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, 
        strokeWidth: 2 
      }
    ],
    legend: ["Rainy Days"] 
  };

  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#fff",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };


    return (
        <ImageBackground source={require('../assets/background.jpg')} style={styles.backgroundImage}>
          <ScrollView  style={styles.container} horizontal={true}> 
          <LineChart
                  
                  data={data}
                  width={700}
                  height={600}
                  chartConfig={chartConfig}
                  />
          </ScrollView>
        </ImageBackground>

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