import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const FormularioRegistro = ({ navigation }) => {
  const [cedula, setCedula] = useState('');
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [repetirContrasena, setRepetirContrasena] = useState('');

  return (
    <View style={estilos.contenedor}>
      <View style={estilos.logoContainer}>
        <Image source={require('./logo.jpeg')} style={estilos.logo} />
      </View>
      <Text style={estilos.titulo}>¡Crea una cuenta!</Text>
      <TextInput
        style={estilos.input}
        placeholder="Cédula"
        value={cedula}
        onChangeText={setCedula}
      />
      <TextInput
        style={estilos.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={estilos.input}
        placeholder="Correo electrónico"
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
      <TextInput
        style={estilos.input}
        placeholder="Repetir contraseña"
        value={repetirContrasena}
        onChangeText={setRepetirContrasena}
        secureTextEntry
      />
      <TouchableOpacity style={estilos.boton} onPress={() => navigation.navigate('Dashboard')}>
        <Text style={estilos.textoBoton}>Registrar cuenta</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={estilos.textoEnlace}>¿Ya tienes una cuenta? Inicia sesión</Text>
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
  textoBoton: {
    color: '#fff',
    fontWeight: 'bold',
  },
  textoEnlace: {
    color: '#85dce4',
    marginTop: 10,
  },
});

export default FormularioRegistro;