import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const CustomDrawerContent = () => {


  const handleGoToValues = () => {
    navigation.navigate('Crud');
  }

  const handleGoToRegistro = () => {
    navigation.navigate('Registro');
  }

  const handleGoToGraficas = () => {
    navigation.navigate('Graficas');
  }
 /* Creo que esto sonlas ventanas, pero no ocupamos tantas
  const handleGoToDoctor = () => {
    navigation.navigate('DoctorScreen');
  }

 
  const handleGoToEnfermera = () => {
    navigation.navigate('EnfermeraScreen');
  }

  const handleGoToHospital = () => {
    navigation.navigate('HospitalScreen');
  }

  const handleGoToUsuario = () => {
    navigation.navigate('CrudUsuario');
  }
*/
  return (
    <View style={styles.drawerContent}>
      {/* Logo o título de la aplicación */}
      <Text style={styles.appTitle}>SmartGym</Text>
      <View style={styles.menuItems}>
        <TouchableOpacity style={styles.menuItem} onPress={handleGoToRegistro}>
          <View style={styles.itemWithIcon}>
            <Icon name="Registro" size={24} color="#fff" style={styles.icon} />
            <Text style={styles.drawerItemText}>Registro</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={handleGoToGraficas}>
          <View style={styles.itemWithIcon}>
            <Icon name="Graficas" size={24} color="#fff" style={styles.icon} />
            <Text style={styles.drawerItemText}>Graficas</Text>
          </View>
        </TouchableOpacity>
 {/* Como lo anterior, ya que solo tenemos tres pantallas solo mostrar esas 
        <TouchableOpacity style={styles.menuItem} onPress={handleGoToDoctor}>
          <View style={styles.itemWithIcon}>
            <Icon name="user-md" size={24} color="#fff" style={styles.icon} />
            <Text style={styles.drawerItemText}>Doctor</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={handleGoToEnfermera}>
          <View style={styles.itemWithIcon}>
            <Icon name="user-nurse" size={24} color="#fff" style={styles.icon} />
            <Text style={styles.drawerItemText}>Enfermera</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={handleGoToHospital}>
          <View style={styles.itemWithIcon}>
            <Icon name="user-nurse" size={24} color="#fff" style={styles.icon} />
            <Text style={styles.drawerItemText}>Hospital</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={handleGoToUsuario}>
          <View style={styles.itemWithIcon}>
            <Icon name="user-nurse" size={24} color="#fff" style={styles.icon} />
            <Text style={styles.drawerItemText}>Usuario</Text>
          </View>
        </TouchableOpacity>
        */}
        <TouchableOpacity style={styles.menuItem} onPress={handleGoToValues}>
          <View style={styles.itemWithIcon}>
            <Icon name="Crud" size={24} color="#fff" style={styles.icon} />
            <Text style={styles.drawerItemText}>Crud</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    paddingVertical: 32,
    paddingHorizontal: 16,
    justifyContent: 'flex-start',
    backgroundColor: '#2196f3', // Fondo del menú lateral con color de hospital
  },
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
    textAlign: 'center', // Alineación del texto al centro
  },
  menuItems: {
    flex: 1,
  },
  menuItem: {
    marginTop: 16, // Espacio entre los elementos del menú
  },
  drawerItemText: {
    fontSize: 20,
    color: '#fff',
    marginLeft: 16,
    fontWeight: 'bold', // Fuente en negrita (gordita)
    fontFamily: 'Arial', // Fuente gótica (puedes cambiarla a una fuente gótica específica)
  },
  itemWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8, // Espacio entre el icono y el texto
  },
});

export default CustomDrawerContent;
