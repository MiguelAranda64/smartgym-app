import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Button, Modal, TextInput, SafeAreaView } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawerContent from "../components/CustomDrawerContent";
import { ScrollView } from "react-native-gesture-handler";


const Drawer = createDrawerNavigator();

const CrudUsuario = () => {
  return (
    <Drawer.Navigator drawerContent={CustomDrawerContent}>
      <Drawer.Screen name="Usurio" component={CrudUsuarioContent} />
    </Drawer.Navigator>
  );
}

const UsuarioTable = () => {
  const [usuarioData, setUsuarioData] = useState([]);
  const [form, setForm] = useState({
    _id: "",
    username: "",
    email: "",
    birthdate: "",
    gender: "",
    weight: "",
    height: ""
  });
  const [isModalUsuario, setIsModalUsuario] = useState(false);
  const [isModalInsert, setIsModalInsert] = useState(false);
  // Agrega este estado
  const [isModalDetails, setIsModalDetails] = useState(false);
  const [selectedUsuario, setSelectedUsuario] = useState(null);


  const handleShowDetails = (usuario) => {
    setSelectedUsuario(usuario);
    setIsModalDetails(true);
  };


  const fetchUsuarioData = async () => {
    try {
      const responseUsuario= await fetch(
        "http://172.17.3.170:9000/api/padres"
      );
      const jsonDataUsuario = await responseUsuario.json();
      setUsuarioData(jsonDataUsuario);
    } catch (error) {
      console.log("error fetching data:", error);
    }
  };

  const insertUsuario = async () => {
    try {
      const { _id, ...formData } = form;

      const response = await fetch("http://172.17.3.170:9000/api/padres", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const jsonData = await response.json();
      console.log("Usuarioinsertado:", jsonData);
      fetchEnfermeraData();
      setIsModalInsert(false); // Cerrar el modal después de insertar
    } catch (error) {
      console.log("Error al insertar el doctor:", error);
    }
  };

  const deleteUsuario = async (item) => {
    try {
      const response = await fetch(
        `http://172.17.3.170:9000/api/padres/${item._id}`,
        {
          method: "DELETE",
        }
      );
      const jsonData = await response.json();
      console.log("Usuario eliminado:", jsonData);
      fetchUsuarioData(); // Refresh the medicamentos list after deletion
    } catch (error) {
      console.log("Error al eliminar el doctor:", error);
    }
  }

  const updateUsuario = async () => {
    try {
      const response = await fetch(
        `http://172.17.3.170:9000/api/padres/${form._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );
      const jsonData = await response.json();
      console.log("Usuario actualizado:", jsonData);
      fetchUsuarioData();
      setIsModalUsuario(false); // Cerrar el modal después de actualizar
    } catch (error) {
      console.log("Error al actualizar al doctor:", error);
    }
  }

  const handleEditUsuario= (item) => {
    setForm(item);
    setIsModalUsuario(true);
  }

  const handleChange = (name, values) => {
    setForm((prevState) => ({
      ...prevState,
      [name]: values,
    }));
  };

  // const toggleModalMedicamento = () => {
  //   setIsModalMedicamento(!isModalMedicamento);
  // }

  const toggleModalInsert = () => {
    setIsModalInsert(!isModalInsert);
    setForm({
        _id: "",
        username: "",
        email: "",
        birthdate: "",
        gender: "",
        weight: "",
        height: ""
    });
  }

  useEffect(() => {
    fetchUsuarioData();
  }, []);

  const renderRowUsuario = ({ item }) => {
  // const categoriasTexto = Array.isArray(item.categoria) ? item.categoria.join(", ") : "Sin categorías";
  return (
    <View style={styles.row} key={item._id}>
      <Text style={styles.column}>{item.username}</Text>
      <Text style={styles.column}>{item.email}</Text>
      <Text style={styles.column}>{item.birthdate}</Text>
      <View style={styles.actionsColumn}>
        <View style={styles.buttonContainer}>
          {/* Botón de editar */}
          <TouchableOpacity
            style={styles.modalButtonInsertSmall} // Botón de color amarillo más pequeño
            onPress={() => handleEditUsuario(item)}
          >
            <Text style={styles.buttonTextSmall}>Actualizar</Text>
          </TouchableOpacity>

          {/* Boton de detalles */}
          <TouchableOpacity
            style={styles.modalButtonInsertSmall} // Botón de color verde más pequeño
            onPress={() => handleShowDetails(item)}
          >
             <Text style={styles.buttonTextSmall}>Detalles</Text>
          </TouchableOpacity>

          {/* Botón de eliminar */}
          <TouchableOpacity
            style={styles.modalButtonDeleteSmall} // Botón de color rojo más pequeño
            onPress={() => deleteUsuario(item)}
          >
            <Text style={styles.buttonTextSmall}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};



  return (
    <View style={styles.container}>
      <View style={styles.tableContainer}>
        {/* Renderizado de la tabla de medicamentos */}
        <Text style={styles.title}>Usuario</Text>
        <Button style={styles.insertButton} title="Insert" onPress={toggleModalInsert} />
        <View style={styles.headerRow}>
          <Text style={styles.headerColumn}>Nombre</Text>
          <Text style={styles.headerColumn}>Correo</Text>
          <Text style={styles.headerColumn}>Fecha de Nacimiento</Text>
          {/* <Text style={styles.headerColumn}>Edad</Text> */}
          {/* <Text style={styles.headerColumn}>Genero</Text> */}
          <Text style={styles.headerColumn}>Acciones</Text>
        </View>
        <FlatList
          data={usuarioData}
          renderItem={renderRowUsuario}
          keyExtractor={(item) => item._id}
        />
      </View>
      {/* Renderizado del modal de edición */}
      <Modal visible={isModalUsuario} animationType="fade">
        <View style={styles.modalContainer}>
          <SafeAreaView style={styles.modalContentUsuario}>
            <Text style={styles.modalTitle}>Editar Usuario</Text>
            {/* Campos del formulario de actualización */}
            <TextInput
              style={styles.modalinput}
              value={form._id}
              onChangeText={(value) => handleChange("_id", value)}
              editable={false}
            />
            <Text style={styles.modalnames}>Nombre</Text>
            <TextInput
              style={styles.modalinput}
              value={form.username}
              onChangeText={(value) => handleChange("username", value)}
            />
            <Text style={styles.modalnames}>Correo</Text>
            <TextInput
              style={styles.modalinput}
              value={form.email}
              onChangeText={(value) => handleChange("email", value)}
            />
            <Text style={styles.modalnames}>Fecha de nacimiento</Text>
            <TextInput
            style={styles.modalinput}
            value={form.birthdate}
            onChangeText={(value) => handleChange("birthdate", value)}
            />
            <Text style={styles.modalnames}>Genero</Text>
            <TextInput
              style={styles.modalinput}
              value={form.gender}
              onChangeText={(value) => handleChange("gender", value)}
            />
            <Text style={styles.modalnames}>Peso</Text>
            <TextInput
              style={styles.modalinput}
              value={form.weight}
              onChangeText={(value) => handleChange("weight", value)}
            />
             <Text style={styles.modalnames}>Altura</Text>
            <TextInput
              style={styles.modalinput}
              value={form.height}
              onChangeText={(value) => handleChange("height", value)}
            />
            {/* Botón para guardar los cambios */}
            <TouchableOpacity style={styles.modalButtonInsert} title="Guardar" onPress={updateUsuario} >
              <Text style={styles.modalButtonText}>Save</Text>
            </TouchableOpacity>
            {/* Botón para cerrar el modal */}
            <TouchableOpacity style={styles.modalButtonDelete} title="Cerrar" onPress={() => setIsModalUsuario(false)} >
              <Text style={styles.modalButtonText}>close</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </View>
      </Modal>

      {/* Renderizado del modal de inserción */}
      <Modal visible={isModalInsert} animationType="fade">
        <View style={styles.modalContainer}>
          <SafeAreaView style={styles.modalContentUsuario}>
            <Text style={styles.modalTitle}>Agregar Usuario</Text>
            {/* Campos del formulario de inserción */}
            <Text style={styles.modalnames}>Nombre</Text>
            <TextInput
              style={styles.modalinput}
              value={form.username}
              onChangeText={(value) => handleChange("username", value)}
            />
            <Text style={styles.modalnames}>Correo</Text>
            <TextInput
              style={styles.modalinput}
              value={form.email}
              onChangeText={(value) => handleChange("email", value)}
            />
            <Text style={styles.modalnames}>Fecha de Nacimiento</Text>
            <TextInput
              style={styles.modalinput}
              value={form.birthdate}
              onChangeText={(value) => handleChange("birthdate", value)}
              
            />
            <Text style={styles.modalnames}>Genero</Text>
            <TextInput
              style={styles.modalinput}
              value={form.gender}
              onChangeText={(value) => handleChange("gender", value)}
            />
            <Text style={styles.modalnames}>Peso</Text>
            <TextInput
              style={styles.modalinput}
              value={form.weight}
              onChangeText={(value) => handleChange("weight", value)}
            />
            <Text style={styles.modalnames}>Altura</Text>
            <TextInput
              style={styles.modalinput}
              value={form.height}
              onChangeText={(value) => handleChange("height", value)}
            />
            {/* Botón para guardar el nuevo medicamento */}
            <TouchableOpacity style={styles.modalButtonInsert} title="Guardar" onPress={insertUsuario} >
              <Text style={styles.modalButtonText}>Save</Text>
            </TouchableOpacity>
            {/* Botón para cerrar el modal de inserción */}
            <TouchableOpacity style={styles.modalButtonDelete} title="Cerrar" onPress={() => setIsModalInsert(false)} >
              <Text style={styles.modalButtonTextt}>Close</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </View>
      </Modal>

      {/* Renderizado de la ventana de detalles */}
      {isModalDetails && selectedUsuario && (
  <Modal visible={true} animationType="fade">
    <View style={styles.modalContainer}>
      <SafeAreaView style={styles.modalContentUsuario}>
        <Text style={styles.modalTitle}>Detalles Usuario</Text>
        <View style={styles.detailContainer}>
          <Text style={styles.detailLabel}>Nombre:</Text>
          <Text style={styles.detailText}>{selectedUsuario.username}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.detailLabel}>Correo:</Text>
          <Text style={styles.detailText}>{selectedUsuario.email}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.detailLabel}>Fecha de Nacimiento:</Text>
          <Text style={styles.detailText}>{selectedUsuario.birthdate}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.detailLabel}>Genero:</Text>
          <Text style={styles.detailText}>{selectedUsuario.gender}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.detailLabel}>Peso:</Text>
          <Text style={styles.detailText}>{selectedUsuario.weight}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.detailLabel}>Altura:</Text>
          <Text style={styles.detailText}>{selectedUsuario.height}</Text>
        </View>

        {/* Botón para cerrar la ventana de detalles */}
        <TouchableOpacity style={styles.modalButtonInsert} onPress={() => setIsModalDetails(false)}>
          <Text style={styles.modalButtonText}>Cerrar</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  </Modal>
)}
    </View>
  );
};



const CrudUsuarioContent = () => {
  return (
    <SafeAreaView style={styles.container}>
      <UsuarioTable />
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#f0f0f0",
    // marginTop: 460,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  column: {
    flex: 1,
    textAlign: "center",
    justifyContent: "center",
  },
  headerRow: {
    flexDirection: "row",
    textAlign: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor: "#f0f0f0", // Color de fondo para la fila de encabezados
  },
  headerColumn: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold", // Fuente en negrita para los encabezados
  },
  tableContainer: {
    marginBottom: 16,
  },
  tableSpacing: {
    height: 39,
  },
  actionsColumn: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  closeModalText: {
    paddingTop: 50,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#001d3d'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(218, 192, 163)', // Fondo semi-transparente
    borderRadius: 20, // Bordes redondeados
    padding: 20, // Espacio interno
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Sombras en Android
  },
  modalContent: {
    backgroundColor: '#F8F0E5', // Color de fondo para el contenido de la ventana modal
    borderRadius: 10, // Bordes redondeados para el contenido
    elevation: 5, // Sombras en Android para el contenido
    padding: 20, // Espacio interno para el contenido
  },
  modalTitle: {
    paddingTop: 16,
    paddingBottom: 10,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff"
  },
  modalnames: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
    marginRight: 10,
    color: "#000"
  },
  modalinput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  modalButtonInsertSmall: {
    borderRadius: 8,
    paddingVertical: 6, // Tamaño del padding vertical más pequeño
    paddingHorizontal: 12, // Tamaño del padding horizontal más pequeño
    marginVertical: 5, // Espacio vertical entre botones
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#102C57", // Color amarillo
  },
  modalButtonDeleteSmall: {
    borderRadius: 8,
    paddingVertical: 6, // Tamaño del padding vertical más pequeño
    paddingHorizontal: 12, // Tamaño del padding horizontal más pequeño
    marginVertical: 5, // Espacio vertical entre botones
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF0000", // Color rojo
  },
  buttonTextSmall: {
    fontSize: 12, // Tamaño del texto más pequeño
    color: "#ffffff", // Texto blanco para botones
  },
  modalButtonInsert: {
    borderRadius: 8,
    padding: 12,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0077B6",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalButtonDelete: {
    borderRadius: 8,
    padding: 12,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF0000",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: "#ffff",
  },

  // Estilos para botones de texto en ventanas modales
  modalButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  detailContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  detailLabel: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  detailText: {
    flex: 2,
    fontSize: 18,
    color: "#666",
  },
});

export default CrudUsuario;


