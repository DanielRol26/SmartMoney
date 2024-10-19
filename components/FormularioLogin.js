import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const FormularioLogin = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');

  return (
    <View style={estilos.contenedor}>
      <View style={estilos.logoContainer}>
        <Image source={require('./logo.jpeg')} style={estilos.logo} />
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
      <TouchableOpacity style={estilos.boton} onPress={() => navigation.navigate('Dashboard')}>
        <Text style={estilos.textoBoton}>Iniciar sesión</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[estilos.boton, estilos.botonGoogle]}>
        <Text style={estilos.textoBoton}>Iniciar sesión con Google</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[estilos.boton, estilos.botonFacebook]}>
        <Text style={estilos.textoBoton}>Iniciar sesión con Facebook</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={estilos.textoEnlace}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
        <Text style={estilos.textoEnlace}>¿No tienes una cuenta? Regístrate</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={estilos.botonDashboard} 
        onPress={() => navigation.navigate('Dashboard')}
      >
        <Text style={estilos.textoDashboard}>Ir al Dashboard</Text>
      </TouchableOpacity>
    </View>
  );
};

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  logoContainer: {
    marginBottom: 30,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  boton: {
    width: '100%',
    height: 40,
    backgroundColor: '#85dce4',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  botonGoogle: {
    backgroundColor: '#f7c02d',
  },
  botonFacebook: {
    backgroundColor: '#d7b1ae',
  },
  textoBoton: {
    color: '#fff',
    fontWeight: 'bold',
  },
  textoEnlace: {
    color: '#85dce4',
    marginTop: 10,
  },
  botonDashboard: {
    position: 'absolute',
    left: 20,
    bottom: 20,
    padding: 10,
    backgroundColor: '#4A69FF',
    borderRadius: 5,
  },
  textoDashboard: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default FormularioLogin;