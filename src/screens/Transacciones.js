import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, Picker } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Transacciones = () => {
  const [cuentas, setCuentas] = useState([]);
  const [transacciones, setTransacciones] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [nuevaTransaccion, setNuevaTransaccion] = useState({
    cuentaId: '',
    monto: '',
    descripcion: '',
    categoriaId: '',
    tipoTransaccion: '',
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

    const fetchCategorias = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/Categoria/ObtenerCategorias');
        const data = await response.json();
        setCategorias(data);
      } catch (error) {
        console.error('Error fetching categorias:', error);
      }
    };

    const fetchTransacciones = async () => {
      const cedulaUsuario = await AsyncStorage.getItem('cedulaUsuario');
      if (cedulaUsuario) {
        try {
          const response = await fetch(`http://localhost:3000/api/Transaccion/listar?cedula=${cedulaUsuario}`);
          const data = await response.json();
          setTransacciones(data);
        } catch (error) {
          console.error('Error fetching transacciones:', error);
        }
      }
    };
    useEffect(() => {
    fetchCuentas();
    fetchCategorias();
    fetchTransacciones();
  }, []);

  const handleInputChange = (name, value) => {
    setNuevaTransaccion({
      ...nuevaTransaccion,
      [name]: value,
    });
  };

  const handleCategoriaChange = (value) => {
    const selectedCategoria = categorias.find((categoria) => categoria.CategoriaID === parseInt(value));
    setNuevaTransaccion({
      ...nuevaTransaccion,
      categoriaId: value,
      tipoTransaccion: selectedCategoria.TipoCategoria,
    });
  };

  const handleSubmit = async () => {
    const cedulaUsuario = await AsyncStorage.getItem('cedulaUsuario');
    const transaccion = {
      ...nuevaTransaccion,
      cedula: cedulaUsuario,
    };

    if (!transaccion.cuentaId || !transaccion.monto || !transaccion.categoriaId || !transaccion.descripcion) {
      Alert.alert('Error', 'Por favor complete todos los campos');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/Transaccion/guardar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transaccion),
      });

      if (!response.ok) {
        throw new Error('Error al registrar la transacción');
      }

      const data = await response.json();
      console.log('Transacción registrada:', data);
      Alert.alert('Éxito', 'Transacción registrada con éxito');
      fetchTransacciones(); // Actualizar las transacciones para recargar la lista
    } catch (error) {
      console.error('Error saving transaccion:', error);
    }
  };

  const obtenerNombreBanco = (CuentaID) => {
    const cuenta = cuentas.find(c => c.CuentaID === CuentaID);
    return cuenta ? cuenta.NombreBanco : "Cuenta no encontrada";
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Crear Transacción</Text>

      {/* Formulario para registrar una nueva transacción */}
      <View style={styles.form}>
        <Text style={styles.label}>Cuenta Bancaria</Text>
        <Picker
          selectedValue={nuevaTransaccion.cuenta}
          onValueChange={(value) => handleInputChange('cuentaId', value)}
          style={styles.input}
        >
          <Picker.Item label="Seleccione una cuenta" value="" />
          {cuentas.map((cuenta) => (
            <Picker.Item key={cuenta.CuentaID} label={`${cuenta.NombreBanco} - Saldo: $${cuenta.Saldo}`} value={cuenta.CuentaID} />
          ))}
        </Picker>

        <Text style={styles.label}>Monto</Text>
        <TextInput
          style={styles.input}
          value={nuevaTransaccion.monto}
          onChangeText={(value) => handleInputChange('monto', value)}
          placeholder="Ingrese el monto"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Categoría</Text>
        <Picker
          selectedValue={nuevaTransaccion.CategoriaID}
          onValueChange={handleCategoriaChange}
          style={styles.input}
        >
          <Picker.Item label="Seleccione una categoría" value="" />
          {categorias.map((categoria) => (
            <Picker.Item key={categoria.CategoriaID} label={categoria.NombreCategoria} value={categoria.CategoriaID} />
          ))}
        </Picker>

        <Text style={styles.label}>Descripción</Text>
        <TextInput
          style={styles.input}
          value={nuevaTransaccion.descripcion}
          onChangeText={(value) => handleInputChange('descripcion', value)}
          placeholder="Ingrese una descripción"
        />
           <Text style={styles.label}>Tipo de Transacción</Text>
        <TextInput
          style={styles.input}
          value={nuevaTransaccion.tipoTransaccion}
          editable={false}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Registrar Transacción</Text>
        </TouchableOpacity>
      </View>

      {/* Listado de transacciones */}
      <View style={styles.cardsContainer}>
        {transacciones.map((transaccion, index) => (
          <View style={styles.card} key={index}>
            <Text style={styles.cardTitle}>{obtenerNombreBanco(transaccion.CuentaID)}</Text>
            <Text style={styles.amount}>Monto: ${transaccion.Monto}</Text>
            <Text style={styles.cardSubtitle}>Categoría: {transaccion.CategoriaID}</Text>
            <Text style={styles.cardSubtitle}>Descripción: {transaccion.Descripcion}</Text>
            <Text style={styles.cardSubtitle}>Tipo: {transaccion.TipoTransaccion}</Text>
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
});

export default Transacciones;
