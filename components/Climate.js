import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';

const Climate = ({result}) => {
  const {name, main} = result;
  const kelvin = 273.15;
  if (!name) return null;
  return (
    <View style={styles.climate}>
      <Text style={[styles.text, styles.now]}>
        {parseInt(main.temp - kelvin)}
        <Text style={styles.temp}>&#x2103;</Text>
        <Image
          style={{width: 66, height: 58}}
          source={{
            uri: `http://openweathermap.org/img/w/${result.weather[0].icon}.png`,
          }}
        />
      </Text>

      <View style={styles.temperaturesContainer}>
        <Text style={styles.text}>
          Min{' '}
          <Text style={styles.temp}>
            {parseInt(main.temp_min - kelvin)}&#x2103;
          </Text>
        </Text>
        <Text style={styles.text}>
          Max{' '}
          <Text style={styles.temp}>
            {parseInt(main.temp_max - kelvin)}&#x2103;
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  climate: {
    marginBottom: 20,
  },
  text: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    marginRight: 20,
  },
  now: {
    fontSize: 80,
    marginRight: 0,
    fontWeight: 'bold',
  },
  temp: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  temperaturesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default Climate;
