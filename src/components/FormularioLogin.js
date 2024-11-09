import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FormularioLogin = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');

  const iniciarSesion = async () => {
    const usuario = {
      email: email,
      password: contrasena,
    };

    const urlBase = 'http://localhost:3000';

    try {
      const response = await fetch(`${urlBase}/api/Usuario/Login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario),
      });

      if (response.ok) {
        const data = await response.json();
        Alert.alert('Éxito', data.message);
        // Redirigir a la pantalla principal o dashboard
        await AsyncStorage.setItem('userEmail', email);
        navigation.navigate('Navigation');
      } else {
        const errorData = await response.json();
        Alert.alert('Error', errorData.message || 'Error al iniciar sesión');
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo conectar con el servidor');
    }
  };

  return (
    <View style={estilos.contenedor}>
      <View style={estilos.logoContainer}>
        <Image source={require('../img/logo.jpeg')} style={estilos.logo} />
      </View>
      <Text style={estilos.titulo}>¡Bienvenido de nuevo!</Text>
      <TextInput
        style={estilos.input}
        placeholder="Ingresa tu correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={estilos.input}
        placeholder="Contraseña"
        value={contrasena}
        onChangeText={setContrasena}
        secureTextEntry
      />
      <TouchableOpacity style={estilos.boton} onPress={iniciarSesion}>
        <Text style={estilos.textoBoton}>Iniciar sesión</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
        <Text style={estilos.textoEnlace}>¿No tienes una cuenta? Regístrate</Text>
      </TouchableOpacity>
    </View>
  );
};

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
  },
  boton: {
    backgroundColor: '#4A69FF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoBoton: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  textoEnlace: {
    color: '#4A69FF',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  botonDashboard: {
    marginTop: 20,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#4A69FF',
  },
  textoDashboard: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FormularioLogin;
