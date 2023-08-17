import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen'; 
import HomeScreen from './screens/HomeScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import RealTimeChart from './screens/RealTimeChart';
import UsuarioScreen from './screens/UsuarioScreen';
import RoutineScreen from './screens/RoutineScreen';
import AdminScreen from './screens/AdminScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="Registro" component={RegistrationScreen} />
        <Stack.Screen name="Graficas" component={RealTimeChart} />
        <Stack.Screen name="UsuarioScreen" component={UsuarioScreen} />
        <Stack.Screen name="Rutinas" component={RoutineScreen} />
        <Stack.Screen name="AdminScreen" component={AdminScreen} />
        {/* Agrega otras pantallas aquí */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;