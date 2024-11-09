import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';
import Navigation from './Navigation';
import FormularioLogin from './src/components/FormularioLogin';
import FormularioRegistro from './src/components/FormularioRegistro';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#4A69FF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Login" 
          component={FormularioLogin} 
          options={{ title: 'Iniciar Sesión' }}
        />
        <Stack.Screen 
          name="Registro" 
          component={FormularioRegistro}
          options={{ title: 'Registrarse' }}
        />
        <Stack.Screen 
          name="Navigation"
          component={Navigation} 
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}