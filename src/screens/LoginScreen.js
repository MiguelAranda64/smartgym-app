import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet } from 'react-native';
import axios from "axios"
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState(''); // Agrega estado para username
  const [password, setPassword] = useState(''); // Agrega estado para password

  async function submit() {
    try {
      const res = await axios.post("http://192.168.0.13:9000/", {
        username,
        password,
      });
  
      if (res.data === "exist") {
        navigation.navigate('HomeScreen', { state: { id: username } });
      } else if (res.data === "incorrectPassword") {
        alert("Contraseña incorrecta");
      } else if (res.data === "notexist") {
        alert("El usuario no se ha registrado");
      }
    } catch (error) {
      alert("Error al procesar la solicitud");
      console.log(error);
    }
  }
  
  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/logosin.png')} style={styles.logo} />
      <Text style={styles.title}>LOGIN</Text>
      <View style={styles.section}>
        <Text style={styles.fieldTitle}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={text => setUsername(text)} // Actualiza el estado de username
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.fieldTitle}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={text => setPassword(text)} // Actualiza el estado de password
        />
      </View>
      <View style={styles.loginsection}>
        <Button title="Login" onPress={submit} />
      </View>
      <View style={styles.registerSection}>
        <Button title="Registrarse" onPress={() => navigation.navigate('Registro')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#20409a',
  },
  logo: {
    width: 380,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  section: {
    marginVertical: 10,
  },
  registerSection: {
    marginVertical: 40,
    marginTop: 10,
    width: 150,
    height: 50,
  },
  loginsection: {
    marginVertical: 0,
    marginTop: 10,
    width: 150,
    height: 50,
  },
  fieldTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 3,
    fontSize: 18,
    padding: 10,
    width: 300,
  },
});

export default LoginScreen;
