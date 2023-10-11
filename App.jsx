import React, {useState, useEffect} from 'react';
import {
  Alert,
  Keyboard,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Form from './components/Form';
import Climate from './components/Climate';

const App = () => {
  const [backgroundColor, setBackgroundColor] = useState('rgb(71,149,212)');

  const [search, setSearch] = useState({
    city: '',
    country: '',
  });

  const {city, country} = search;

  const [query, setQuery] = useState(false);
  const [resultApi, setResultApi] = useState({});

  const bgColorApp = {
    backgroundColor: backgroundColor,
  };

  useEffect(() => {
    const consulting = async () => {
      if (query) {
        let appId = 'e33114245b6c956a71f28dd882f7fce2';
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${city.trim()},${country}&appid=${appId}`;
        try {
          const response = await fetch(url);
          const result = await response.json();
          setResultApi(result);
          setQuery();
          let kelvin = 273.15;
          let {main} = result;
          let current = main.temp - kelvin;
          //The next can be enhanced with an object
          if (current < 10) {
            setBackgroundColor('rgb(105,108,149)');
          } else if (current >= 10 && current < 25) {
            setBackgroundColor('rgb(71,149,212)');
          } else {
            setBackgroundColor('rgb(178,28,61)');
          }
        } catch (error) {
          showAlert();
        }
      }
    };
    consulting();
  }, [query]);

  const showAlert = () => {
    Alert.alert('Error', 'No hay resultados con estos datos', [{text: 'Ok'}]);
  };

  const hideKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={() => hideKeyboard()}>
      <SafeAreaView style={[styles.app, bgColorApp]}>
        <StatusBar backgroundColor={backgroundColor} />
        <View style={styles.content}>
          <Climate result={resultApi} />
          <Form search={search} setSearch={setSearch} setQuery={setQuery} />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    marginHorizontal: '2.5%',
  },
});

export default App;
