import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CuentasBancarias = () => {
  const [cuentas, setCuentas] = useState([]);
  const [nuevaCuenta, setNuevaCuenta] = useState({
    nombreBanco: '',
    numeroCuenta: '',
    saldo: '',
  });

 
    const fetchCuentas = async () => {
      const cedulaUsuario = await AsyncStorage.getItem('cedulaUsuario');
      if (cedulaUsuario) {
        try {
          const response = await fetch(`http://localhost:3000/api/CuentasBancarias/ObtenerCuentas?cedula=${cedulaUsuario}`);
          const data = await response.json();
          setCuentas(data);
        } catch (error) {
          console.error('Error fetching cuentas:', error);
        }
      }
    };
    useEffect(() => {
    fetchCuentas();
  }, []);

  const handleInputChange = (name, value) => {
    setNuevaCuenta({
      ...nuevaCuenta,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    const cedulaUsuario = await AsyncStorage.getItem('cedulaUsuario');
    const cuenta = {
      ...nuevaCuenta,
      cedula: cedulaUsuario,
    };

    try {
      const response = await fetch('http://localhost:3000/api/CuentasBancarias/Save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cuenta),
      });

      if (!response.ok) {
        throw new Error('Error al registrar la cuenta');
      }

      const data = await response.json();
      console.log('Cuenta registrada con éxito:', data);
      fetchCuentas(); // Actualizar las cuentas para recargar la lista
    } catch (error) {
      console.error('Error en el registro de la cuenta:', error);
    }
  };

  const formatSaldo = (saldo) => {
    return new Intl.NumberFormat('es-ES').format(saldo);
  };

  const handleDelete = async (CuentaID) => {
    console.log("entro a borrar cuenta", CuentaID);
   
            try {
              const response = await fetch(`http://localhost:3000/api/CuentasBancarias/Delete/${CuentaID}`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                },
              });

              if (response.ok) {
                setCuentas(cuentas.filter(cuenta => cuenta.CuentaID !== CuentaID));
              } else {
                console.error("Error al eliminar la cuenta");
              }
            } catch (error) {
              console.error('Error al eliminar cuenta:', error);
            }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Cuentas Bancarias</Text>

      {/* Formulario para registrar una nueva cuenta bancaria */}
      <View style={styles.form}>
        <Text style={styles.label}>Nombre del Banco</Text>
        <TextInput
          style={styles.input}
          value={nuevaCuenta.nombreBanco}
          onChangeText={(value) => handleInputChange('nombreBanco', value)}
          placeholder="Nombre del Banco"
        />
        <Text style={styles.label}>Número de Cuenta</Text>
        <TextInput
          style={styles.input}
          value={nuevaCuenta.numeroCuenta}
          onChangeText={(value) => handleInputChange('numeroCuenta', value)}
          placeholder="Número de Cuenta"
        />
        <Text style={styles.label}>Saldo</Text>
        <TextInput
          style={styles.input}
          value={nuevaCuenta.saldo}
          onChangeText={(value) => handleInputChange('saldo', value)}
          placeholder="Saldo"
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Registrar Cuenta</Text>
        </TouchableOpacity>
      </View>

      {/* Listado de cuentas bancarias en formato de tarjetas */}
      <View style={styles.cardsContainer}>
        {cuentas.map((cuenta, index) => (
          <View style={styles.card} key={index}>
            <Text style={styles.cardTitle}>{cuenta.NombreBanco}</Text>
            <Text style={styles.amount}>Saldo: ${formatSaldo(cuenta.Saldo)}</Text>
            <Text style={styles.cardSubtitle}>Nro: {cuenta.NumeroCuenta}</Text>
            <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(cuenta.CuentaID)}>
              <Text style={styles.deleteButtonText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  form: {
    marginBottom: 20,
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
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: '48%',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  amount: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  deleteButton: {
    marginTop: 10,
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CuentasBancarias;
