import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';



const RegistrationScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [gender, setGender] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    // Perform registration logic here
    // You can use the state variables (username, birthdate, etc.) to send data to your server or perform actions
    navigation.navigate('Login');
  };
  const handleBack = () => {
    // Navigate back to the previous screen (e.g., LoginScreen)
    navigation.navigate('Graficas');
  };
  return (
      <ScrollView contentContainerStyle={styles.container}>
    <View style={styles.container}>
      <Text style={styles.title}>REGISTRARSE</Text>

      {/* Datos personales */}
      <View style={styles.section}>
        <Text style={styles.subtitle}>Nombre de usuario</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Nombre de usuario"
        />
      </View>
      {/* ... (Repeat similar sections for other input fields) ... */}
      <View style={styles.section}>
        <Text style={styles.subtitle}>Fecha de Nacimiento</Text>
        <TextInput
          style={styles.input}
          value={birthdate}
          onChangeText={setBirthdate}
          placeholder="DD/MM/AAAA"
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.subtitle}>Genero</Text>
        <TextInput
          style={styles.input}
          value={gender}
          onChangeText={setGender}
          placeholder="Genero"
        />
      </View>
     
      <View style={styles.section}>
        <Text style={styles.subtitle}>Peso</Text>
        <TextInput
          style={styles.input}
          value={weight}
          onChangeText={setWeight}
          placeholder="Peso en KG"
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.subtitle}>Altura</Text>
        <TextInput
          style={styles.input}
          value={height}
          onChangeText={setHeight}
          placeholder="Altura en CM"
        />
      </View>
      {/* Datos de registro */}
      <View style={styles.section}>
        <Text style={styles.subtitle}>Correo Electronico</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Correo Electronico"
          keyboardType="email-address"
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.subtitle}>Contraseña</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Contraseña"
          secureTextEntry
        />
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Volver</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleBack}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>
      </View>
    </View>
    </ScrollView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // Para que ScrollView ocupe todo el espacio disponible
    backgroundColor: '#f5f5f5',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 4,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
  },
});

export default RegistrationScreen;
