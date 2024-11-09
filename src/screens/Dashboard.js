import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PieChart } from 'react-native-chart-kit';

const Dashboard = () => {
  const [cedulaUsuario, setCedulaUsuario] = useState(null);
  const [cuentas, setCuentas] = useState([]);
  const [monthlyData, setMonthlyData] = useState({ ingresos: 0, gastos: 0 });
  const [loading, setLoading] = useState(true);
  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    const obtenerCedula = async () => {
      const emailUsuario = await AsyncStorage.getItem('userEmail');
      if (emailUsuario) {
        try {
          const response = await fetch(`http://localhost:3000/api/Usuario/ObtenerCedulaPorEmail?email=${emailUsuario}`);
          if (response.ok) {
            const data = await response.json();
            setCedulaUsuario(data.Cedula);
            await AsyncStorage.setItem('cedulaUsuario', data.Cedula);
          }
        } catch (error) {
          console.error('Error al obtener la cédula:', error);
        }
      }
    };

    const fetchCuentas = async () => {
      const cedulaUsuario = await AsyncStorage.getItem('cedulaUsuario');
      if (cedulaUsuario) {
        try {
          const response = await fetch(`http://localhost:3000/api/CuentasBancarias/ObtenerCuentas?cedula=${cedulaUsuario}`);
          const data = await response.json();
          setCuentas(data);
        } catch (error) {
          console.error('Error al obtener las cuentas:', error);
        }
      }
    };

    obtenerCedula();
    fetchCuentas();
  }, []);

  useEffect(() => {
    const fetchTransacciones = async () => {
      try {
        const cedulaUsuario = await AsyncStorage.getItem('cedulaUsuario');
        const response = await fetch(`http://localhost:3000/api/Transaccion/mensuales?cedula=${cedulaUsuario}`);
        if (!response.ok) throw new Error("Error al obtener las transacciones");
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          const lastTransaction = data[data.length - 1];
          const totalIngresos = Number(lastTransaction.ingresos) || 0;
          const totalGastos = Number(lastTransaction.gastos) || 0;
          setMonthlyData({ ingresos: totalIngresos, gastos: totalGastos });
        } else {
          setMonthlyData({ ingresos: 0, gastos: 0 });
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data", error);
        setLoading(false);
      }
    };

    fetchTransacciones();
  }, []);

  const generatePDF = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/Transaccion/exportarPDF?cedula=${cedulaUsuario}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/pdf' },
      });
      if (!response.ok) throw new Error('Error al generar el PDF');

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Reporte_Transacciones.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error al exportar a PDF:', error);
    }
  };
  if (loading) return <Text>Cargando datos...</Text>;

  const formatSaldo = (saldo) => new Intl.NumberFormat('es-ES').format(saldo);

  const pieData = [
    {
      name: "Ingresos",
      amount: Number(monthlyData.ingresos) || 0,
      color: "#4CAF50",
      legendFontColor: "#333",
      legendFontSize: 15,
    },
    {
      name: "Gastos",
      amount: Number(monthlyData.gastos) || 0,
      color: "#FF6384",
      legendFontColor: "#333",
      legendFontSize: 15,
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Dashboard</Text>
      <Text style={styles.subHeader}>Mis Cuentas Bancarias</Text>
      <View style={styles.cardsContainer}>
        {cuentas.map((cuenta, index) => (
          <View style={styles.card} key={index}>
            <Text style={styles.cardTitle}>{cuenta.NombreBanco}</Text>
            <Text style={styles.amount}>Saldo: ${formatSaldo(cuenta.Saldo)}</Text>
            <Text style={styles.cardSubtitle}>Nro: {cuenta.NumeroCuenta}</Text>
          </View>
        ))}
      </View>
      <View style={styles.cardsContainer}>
        <View style={[styles.card, { backgroundColor: '#4CAF50' }]}>
          <Text style={styles.cardTitle}>Ingresos (Mensual)</Text>
          <Text style={styles.amount}>${formatSaldo(monthlyData.ingresos)}</Text>
        </View>
        <View style={[styles.card, { backgroundColor: '#FF6384' }]}>
          <Text style={styles.cardTitle}>Gastos (Mensual)</Text>
          <Text style={styles.amount}>${formatSaldo(monthlyData.gastos)}</Text>
        </View>
      </View>
      <View style={styles.overviewContainer}>
        <Text style={styles.overviewTitle}>Resumen de Ingresos y Gastos</Text>
        <PieChart
          data={pieData}
          width={screenWidth - 32}
          height={220}
          chartConfig={{
            backgroundColor: "#ffffff",
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor="amount"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      </View>
      <TouchableOpacity style={styles.pdfButton} onPress={generatePDF}>
        <Text style={styles.pdfButtonText}>Exportar a PDF</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff'
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333'
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333'
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  card: {
    width: '45%',
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333'
  },
  amount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333'
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666'
  },
  overviewContainer: {
    paddingTop: 16,
    alignItems: 'center',
  },
  overviewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  pdfButton: { backgroundColor: '#4A69FF', padding: 10, borderRadius: 5, marginTop: 20, alignItems: 'center' },
  pdfButtonText: { color: '#fff', fontWeight: 'bold' }
});

export default Dashboard;
