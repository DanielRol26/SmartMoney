import react from "react";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { TouchableOpacity, Text, View } from 'react-native';
export default function CerrarSesion() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

        <TouchableOpacity 
            style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }} 
            onPress={() => navigation.navigate("Login")}
        >
            <FontAwesomeIcon icon={faSignOutAlt} size={20} color="red" />
            <Text style={{ marginLeft: 5 }}>Cerrar sesión</Text>
        </TouchableOpacity>
    </View>
);
  }