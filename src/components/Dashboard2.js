import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';

const Dashboard = ({ navigation }) => {
  const [activeSection, setActiveSection] = useState('Dashboard');
  const [categoria, setCategoria] = useState('');
  const [monto, setMonto] = useState('');
  const [fechaLimite, setFechaLimite] = useState('');
  const [cuentaBancaria, setCuentaBancaria] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [tipoTransaccion, setTipoTransaccion] = useState('');
  const [mensajeAlerta, setMensajeAlerta] = useState('');
  const [descripcionMeta, setDescripcionMeta] = useState('');
  const [montoObjetivo, setMontoObjetivo] = useState('');
  const [montoActual, setMontoActual] = useState('');
  const [fechaObjetivo, setFechaObjetivo] = useState('');
  const [nombreBanco, setNombreBanco] = useState('');
  const [numeroCuenta, setNumeroCuenta] = useState('');
  const [saldo, setSaldo] = useState('');

  const renderContent = () => {
    switch (activeSection) {
      case 'Dashboard':
        return (
          <>
            <Text style={styles.header}>Dashboard</Text>
            <View style={styles.cardsContainer}>
              <View style={[styles.card, { backgroundColor: '#d7b1ae' }]}>
                <Text style={styles.cardTitle}>GANANCIAS (MENSUALES)</Text>
                <Text style={styles.amount}>$40,000</Text>
              </View>
              <View style={[styles.card, { backgroundColor: '#85dce4' }]}>
                <Text style={styles.cardTitle}>GANANCIAS (ANUALES)</Text>
                <Text style={styles.amount}>$215,000</Text>
              </View>
              <View style={[styles.card, { backgroundColor: '#f7c02d' }]}>
                <Text style={styles.cardTitle}>TAREAS</Text>
                <Text style={styles.amount}>50%</Text>
              </View>
            </View>
            <View style={styles.overviewContainer}>
              <Text style={styles.overviewTitle}>Resumen de Ganancias</Text>
              {/* Aquí puedes agregar un gráfico o más detalles */}
            </View>
          </>
        );
      case 'Presupuesto':
        return (
          <>
            <Text style={styles.header}>Crear Presupuesto</Text>
            <View style={styles.formContainer}>
              <Text style={styles.label}>Categoría</Text>
              <TextInput
                style={styles.input}
                placeholder="Seleccione una categoría"
                value={categoria}
                onChangeText={setCategoria}
              />
              <Text style={styles.label}>Monto</Text>
              <TextInput
                style={styles.input}
                placeholder="Ingrese el monto"
                value={monto}
                onChangeText={setMonto}
                keyboardType="numeric"
              />
              <Text style={styles.label}>Fecha Límite (opcional)</Text>
              <TextInput
                style={styles.input}
                placeholder="dd/mm/aaaa"
                value={fechaLimite}
                onChangeText={setFechaLimite}
              />
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Crear Presupuesto</Text>
              </TouchableOpacity>
            </View>
          </>
        );
      case 'Transacciones':
        return (
          <>
            <Text style={styles.header}>Crear Transacción</Text>
            <View style={styles.formContainer}>
              <Text style={styles.label}>Cuenta Bancaria</Text>
              <TextInput
                style={styles.input}
                placeholder="Seleccione una cuenta"
                value={cuentaBancaria}
                onChangeText={setCuentaBancaria}
              />
              <Text style={styles.label}>Monto</Text>
              <TextInput
                style={styles.input}
                placeholder="Ingrese el monto"
                value={monto}
                onChangeText={setMonto}
                keyboardType="numeric"
              />
              <Text style={styles.label}>Categoría</Text>
              <TextInput
                style={styles.input}
                placeholder="Seleccione una categoría"
                value={categoria}
                onChangeText={setCategoria}
              />
              <Text style={styles.label}>Descripción</Text>
              <TextInput
                style={styles.input}
                placeholder="Ingrese una descripción"
                value={descripcion}
                onChangeText={setDescripcion}
                multiline
              />
              <Text style={styles.label}>Tipo de Transacción</Text>
              <TextInput
                style={styles.input}
                placeholder="Seleccione el tipo de transacción"
                value={tipoTransaccion}
                onChangeText={setTipoTransaccion}
              />
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Registrar Transacción</Text>
              </TouchableOpacity>
            </View>
          </>
        );
      case 'Alertas':
        return (
          <>
            <Text style={styles.header}>Crear Alerta</Text>
            <View style={styles.formContainer}>
              <Text style={styles.label}>Mensaje de Alerta</Text>
              <TextInput
                style={styles.input}
                placeholder="Ingresa el mensaje de la alerta"
                value={mensajeAlerta}
                onChangeText={setMensajeAlerta}
                multiline
              />
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Crear Alerta</Text>
              </TouchableOpacity>
            </View>
          </>
        );
      case 'Metas':
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
      case 'CuentasBancarias':
        return (
          <>
            <Text style={styles.header}>Cuentas Bancarias</Text>
            <View style={styles.formContainer}>
              <Text style={styles.label}>Nombre del Banco</Text>
              <TextInput
                style={styles.input}
                placeholder="Ingrese el nombre del banco"
                value={nombreBanco}
                onChangeText={setNombreBanco}
              />
              <Text style={styles.label}>Número de Cuenta</Text>
              <TextInput
                style={styles.input}
                placeholder="Ingrese el número de cuenta"
                value={numeroCuenta}
                onChangeText={setNumeroCuenta}
              />
              <Text style={styles.label}>Saldo</Text>
              <TextInput
                style={styles.input}
                placeholder="Ingrese el saldo"
                value={saldo}
                onChangeText={setSaldo}
                keyboardType="numeric"
              />
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Registrar Cuenta</Text>
              </TouchableOpacity>
            </View>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.sidebar}>
        <Text style={styles.sidebarTitle}>SMARTMONEY²</Text>
        <TouchableOpacity
          style={[styles.menuItem, activeSection === 'Dashboard' && styles.activeMenuItem]}
          onPress={() => setActiveSection('Dashboard')}
        >
          <Text style={styles.menuItemText}>Dashboard</Text>
        </TouchableOpacity>
        <Text style={styles.menuHeader}>INTERFAZ</Text>
        {['CuentasBancarias', 'Metas', 'Alertas', 'Transacciones', 'Presupuesto'].map((item) => (
          <TouchableOpacity
            key={item}
            style={[styles.menuItem, activeSection === item && styles.activeMenuItem]}
            onPress={() => setActiveSection(item)}
          >
            <Text style={styles.menuItemText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView style={styles.content}>
        {renderContent()}
      </ScrollView>
    </View>
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

export default Dashboard;