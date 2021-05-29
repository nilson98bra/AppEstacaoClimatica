import React from 'react';
import {View, Text, StyleSheet} from 'react-native'

const Home = () => {
    return (
      <View style={styles.container}>
        <Text>
          Settings
        </Text>
      </View>
    );
  }
  
  export default Home;

  const styles = StyleSheet.create({
    container: {
      flex:1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f0f'
    }
  })