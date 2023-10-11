import {Picker} from '@react-native-picker/picker';
import React, {useState} from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';

const Form = ({search, setSearch, setQuery}) => {
  const {city, country} = search;

  const [buttonAnimation] = useState(new Animated.Value(1));
  const animationStyle = {
    transform: [{scale: buttonAnimation}],
  };

  const getClimate = () => {
    if (city.trim() === '' || country.trim() === '') {
      showAlert();
      return;
    }
    setQuery(true);
  };

  const showAlert = () => {
    Alert.alert('Error', 'La ciudad y país son obligatorios', [
      {text: 'Entendido'},
    ]);
  };

  const animationEntry = () => {
    Animated.spring(buttonAnimation, {
      toValue: 0.8,
      //   duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const animationOut = () => {
    Animated.spring(buttonAnimation, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View>
      <View style={styles.form}>
        <View>
          <TextInput
            value={city}
            onChangeText={city => setSearch({...search, city})}
            placeholder="Ciudad"
            placeholderTextColor="#666"
            style={styles.input}
          />
        </View>
        <View style={styles.pickerContainer}>
          <Picker
            itemStyle={{height: 120, backgroundColor: '#fff'}}
            selectedValue={country}
            onValueChange={country => setSearch({...search, country})}>
            <Picker.Item label="--Selecciona un país" value=""></Picker.Item>
            <Picker.Item label="Estados unidos" value="US"></Picker.Item>
            <Picker.Item label="México" value="MX"></Picker.Item>
            <Picker.Item label="Argentina" value="AR"></Picker.Item>
            <Picker.Item label="Colombia" value="CO"></Picker.Item>
            <Picker.Item label="España" value="ES"></Picker.Item>
            <Picker.Item label="Perú" value="PE"></Picker.Item>
          </Picker>
        </View>

        <TouchableWithoutFeedback
          onPressIn={animationEntry}
          onPressOut={animationOut}
          onPress={getClimate}>
          <Animated.View style={[styles.btnSearch, animationStyle]}>
            <Text style={styles.btnSearchText}>Buscar Clima</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    // marginTop: 100,
  },
  pickerContainer: {backgroundColor: '#fff'},
  input: {
    padding: 10,
    height: 50,
    backgroundColor: '#fff',
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  btnSearch: {
    marginTop: 50,
    backgroundColor: '#000',
    padding: 10,
    justifyContent: 'center',
    borderRadius: 5,
  },
  btnSearchText: {
    color: '#a3aaae',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
    fontSize: 18,
  },
});

export default Form;
