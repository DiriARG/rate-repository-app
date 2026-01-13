import { FlatList, View, StyleSheet, Pressable } from "react-native";
import { useNavigate } from "react-router-native";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";

import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import theme from "../theme"

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  contenedorPicker: {
    backgroundColor: theme.colors.colorDeFondo,
    padding: 10
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

// Opciones de orden disponibles para la lista de repositorios.
const OPCIONES_ORDEN = {
  ULTIMOS: {
    ordenarPor: "CREATED_AT",
    direccion: "DESC",
  },
  MEJOR_CALIFICADOS: {
    ordenarPor: "RATING_AVERAGE",
    direccion: "DESC",
  },
  PEOR_CALIFICADOS: {
    ordenarPor: "RATING_AVERAGE",
    direccion: "ASC",
  },
};

// Componente que renderiza un menú desplegable para elegir cómo ordenar los repositorios.
const MenuOrdenacion = ({ valor, alCambiar }) => {
  return (
   <View style={styles.contenedorPicker}> 
    
    <Picker selectedValue={valor} onValueChange={alCambiar}>
      <Picker.Item 
        label="Select an item..." 
        value={null} 
        // Para que el usuario no pueda hacerle click.
        enabled={false} 
        color="#9b9b9b" 
      />
      
      <Picker.Item label="Latest repositories" value="ULTIMOS" color="#000000" />
      <Picker.Item label="Highest rated repositories" value="MEJOR_CALIFICADOS" color="#000000" />
      <Picker.Item label="Lowest rated repositories" value="PEOR_CALIFICADOS" color="#000000" />
    </Picker>
    </View>
  );
};

export const RepositoryListContainer = ({ repositories, encabezado }) => {
  const navigate = useNavigate();

  // Por lo tanto si hay "data" se transforma la siguiente estructura: { repositories: { edges: [ { node: { ... } } ] } }, se convierte en un array plano: [ { ... }, { ... } ] mapeando "edges" y sustrayendo por cada "edge" un "node" que sería un repositorio.
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      // Ahora se utilizan los datos del servidor.
      data={repositoryNodes}
      // "renderItem" es una función que FlatList ejecuta por cada elemento del array "repositoryNodes"; Se extrae {item}, que es el objeto con la info del repositorio actual en cada iteración.
      renderItem={({ item }) => (
        // Ahora cada item (cada repo) es clickeable.
        <Pressable onPress={() => navigate(`/repositorio/${item.id}`)}>
          {/* Se envía la info del repo a traves de la prop "repositorio". */}
          <RepositoryItem repositorio={item} />
        </Pressable>
      )}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={encabezado}
    />
  );
};

const RepositoryList = () => {
  // Último repositorio con la reseña mas reciente es el orden default.
  const [ordenSeleccionado, setOrdenSeleccionado] = useState("ULTIMOS");

  // Obtiene el objeto de configuración (ordenarPor y direccion) correspondiente al criterio de ordenación seleccionado por el usuario en la ui. 
  const orden = OPCIONES_ORDEN[ordenSeleccionado];
  
  /* repositories = data.repositories. 
  Petición a la bd. Se vuelve a ejecutar automáticamente cada vez que cambian las variables de ordenación. */
 const { repositories } = useRepositories({
    ordenarPor: orden.ordenarPor,
    direccion: orden.direccion,
  });

  // Componente que se encuentra arriba de la lista de repositorios.
  const componenteEncabezado = (
    <MenuOrdenacion
      valor={ordenSeleccionado}
      alCambiar={setOrdenSeleccionado}
    />
  );

  return (
    <RepositoryListContainer
      repositories={repositories}
      encabezado={componenteEncabezado}
    />
  );
};

export default RepositoryList;
