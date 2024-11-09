import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';

const FormularioRegistro = ({ navigation }) => {
  const [cedula, setCedula] = useState('');
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [repetirContrasena, setRepetirContrasena] = useState('');

  const registrarUsuario = async () => {
    if (contrasena !== repetirContrasena) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    const usuario = {
      Cedula: cedula,
      NombreUsuario: nombre,
      CorreoElectronico: email,
      ContrasenaHash: contrasena,
    };

    console.log('Datos a enviar:', usuario); // Log para verificar los datos antes de enviarlos

    const urlBase = 'http://localhost:3000';

    try {
      const response = await fetch(`${urlBase}/api/Usuario/Register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario)
      });

      if (response.ok) {
        const data = await response.json();
        Alert.alert('Éxito', data.message);
        navigation.navigate('Login');
      } else {
        const errorData = await response.json();
        Alert.alert('Error', errorData.message || 'Error al registrar el usuario');
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
      <TouchableOpacity style={estilos.boton} onPress={registrarUsuario}>
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
});

export default FormularioRegistro;
