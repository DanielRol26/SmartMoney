import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const Metas = () => {
  const [descripcionMeta, setDescripcionMeta] = useState('');
  const [montoObjetivo, setMontoObjetivo] = useState('');
  const [cuentaBancaria, setCuentaBancaria] = useState('');
  const [montoActual, setMontoActual] = useState('');
  const [fechaObjetivo, setFechaObjetivo] = useState('');

  return (
    <>
      <Text style={styles.header}>Crear Meta</Text>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Descripción Meta</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese la descripción de la meta"
          value={descripcionMeta}
          onChangeText={setDescripcionMeta}
          multiline
        />
        <Text style={styles.label}>Monto Objetivo</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese el monto objetivo"
          value={montoObjetivo}
          onChangeText={setMontoObjetivo}
          keyboardType="numeric"
        />
        <Text style={styles.label}>Cuenta Bancaria</Text>
        <TextInput
          style={styles.input}
          placeholder="Seleccione una cuenta"
          value={cuentaBancaria}
          onChangeText={setCuentaBancaria}
        />
        <Text style={styles.label}>Monto Actual</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese el monto actual"
          value={montoActual}
          onChangeText={setMontoActual}
          keyboardType="numeric"
        />
        <Text style={styles.label}>Fecha Objetivo (Opcional)</Text>
        <TextInput
          style={styles.input}
          placeholder="dd/mm/aaaa"
          value={fechaObjetivo}
          onChangeText={setFechaObjetivo}
        />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Registrar Meta</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: '#f5f5f5',
    },
    sidebar: {
      width: 200,
      backgroundColor: '#4A69FF',
      padding: 20,
    },
    sidebarTitle: {
      color: '#FFFFFF',
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 30,
      textAlign: 'center',
    },
    menuHeader: {
      color: '#FFFFFF',
      fontSize: 14,
      marginTop: 20,
      marginBottom: 10,
      opacity: 0.8,
    },
    menuItem: {
      marginBottom: 15,
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 5,
    },
    activeMenuItem: {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    menuItemText: {
      color: '#FFFFFF',
      fontSize: 16,
    },
    content: {
      flex: 1,
      padding: 20,
    },
    header: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#333',
    },
    cardsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    card: {
      padding: 20,
      borderRadius: 12,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      width: '30%',
    },
    cardTitle: {
      fontSize: 14,
      color: '#333',
      marginBottom: 10,
      fontWeight: '600',
    },
    amount: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#333',
    },
    overviewContainer: {
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 12,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    overviewTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 15,
      color: '#333',
    },
    formContainer: {
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 12,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    label: {
      fontSize: 16,
      marginBottom: 8,
      color: '#333',
    },
    input: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      padding: 12,
      marginBottom: 20,
      fontSize: 16,
    },
    button: {
      backgroundColor: '#4A69FF',
      padding: 15,
      borderRadius: 8,
      alignItems: 'center',
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });

export default Metas;
