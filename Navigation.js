import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Dashboard from './src/screens/Dashboard';
import Transacciones from './src/screens/Transacciones';
import Metas from './src/screens/Metas';
import CuentasBancarias from './src/screens/CuentasBancarias';
import CerrarSesion from './src/screens/CerrarSesion';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChartLine, faExchangeAlt, faBullseye, faUniversity, faTimes } from '@fortawesome/free-solid-svg-icons';

const TabNav = createBottomTabNavigator();

function RoutingTabs({ navigation }) {
  return (
    <TabNav.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        tabBarActiveTintColor: 'green',
      }}
    >
      <TabNav.Screen 
        name="Dashboard" 
        component={Dashboard}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: () => <FontAwesomeIcon icon={faChartLine} />,
          unmountOnBlur: true,
        }}
      />

      <TabNav.Screen 
        name="CuentasBancarias" 
        component={CuentasBancarias}
        options={{
          tabBarLabel: 'Cuentas Bancarias',
          tabBarIcon: () => <FontAwesomeIcon icon={faUniversity} />
        }}
      />

      <TabNav.Screen 
        name="Transacciones" 
        component={Transacciones}
        options={{
          tabBarLabel: 'Transacciones',
          tabBarIcon: () => <FontAwesomeIcon icon={faExchangeAlt} />
        }}
      />
      
      <TabNav.Screen 
        name="CerrarSesion" 
        component={CerrarSesion}
        options={{
          tabBarLabel: 'CerrarSesion',
          tabBarIcon: () => <FontAwesomeIcon icon={faTimes} />
        }}
      />
    </TabNav.Navigator>
  );
}

export default function Navigation() {
  return <RoutingTabs />;
}
