import { FlatList, View, StyleSheet, Pressable } from "react-native";
import { useNavigate } from "react-router-native";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { Searchbar } from "react-native-paper";
import { useDebounce } from "use-debounce";

import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import theme from "../theme";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  contenedorPicker: {
    backgroundColor: theme.colors.colorDeFondo,
    marginTop: 10
  },
  contenedorDelEncabezado: {
    backgroundColor: theme.colors.colorDeFondo,
    padding: 15,
  },
  buscador: {
    backgroundColor: 'white',
    borderRadius: 4,
  },
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

        <Picker.Item
          label="Latest repositories"
          value="ULTIMOS"
          color="#000000"
        />
        <Picker.Item
          label="Highest rated repositories"
          value="MEJOR_CALIFICADOS"
          color="#000000"
        />
        <Picker.Item
          label="Lowest rated repositories"
          value="PEOR_CALIFICADOS"
          color="#000000"
        />
      </Picker>
    </View>
  );
};

// Componente de cabecera para la lista de repositorios. Integra la barra de búsqueda y el menú de ordenación, gestionando los estados que disparan las consultas filtradas hacia el servidor Apollo.
const RepositoryListHeader = ({
  busqueda,
  setBusqueda,
  ordenSeleccionado,
  setOrdenSeleccionado,
}) => {
  return (
    <View style={styles.contenedorDelEncabezado}>
      <Searchbar
        placeholder="Buscar repositorios"
        value={busqueda}
        onChangeText={setBusqueda}
        style={styles.buscador}
      />

      <MenuOrdenacion
        valor={ordenSeleccionado}
        alCambiar={setOrdenSeleccionado}
      />
    </View>
  );
};

/* Implementación de "RepositoryListContainer" como un componente de clase para evitar que el campo de búsqueda (Searchbar) pierda el foco al escribir.
Al definir "renderHeader" como una propiedad de la clase, React mantiene la referencia de la función estable, evitando que el encabezado (RepositoryListHeader) se desmonte y vuelva a montar en cada pulsación de tecla. */
export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const { busqueda, setBusqueda, ordenSeleccionado, setOrdenSeleccionado } =
      this.props;

    return (
      <RepositoryListHeader
        busqueda={busqueda}
        setBusqueda={setBusqueda}
        ordenSeleccionado={ordenSeleccionado}
        setOrdenSeleccionado={setOrdenSeleccionado}
      />
    );
  };

  render() {
    // Se obtiene los repositorios, la función de navegación y "onEndReach" de los props.
    const { repositories, navigate, onEndReach } = this.props;

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
        ListHeaderComponent={this.renderHeader}
        // Se activa cuando el usuario llega al final.
        onEndReached={onEndReach}
        // 0.5 significa que se dispara cuando falta la mitad de la pantalla para llegar al final.
        onEndReachedThreshold={0.5}
      />
    );
  }
}

const RepositoryList = () => {
  const navigate = useNavigate()
  
  // Estado para el criterio de ordenación (Valor inicial: Más recientes).
  const [ordenSeleccionado, setOrdenSeleccionado] = useState("ULTIMOS");
  // Estado para el texto que el usuario escribe en la barra de búsqueda.
  const [busqueda, setBusqueda] = useState("");

  /* Se le aplica un retraso (debounce) de 500ms al valor de búsqueda. 
  "busquedaRetrasada" solo se actualizará cuando el usuario deje de escribir por medio segundo, evitando saturar el servidor con peticiones en cada letra pulsada. */
  const [busquedaRetrasada] = useDebounce(busqueda, 500)
  // Obtiene el objeto de configuración (ordenarPor y direccion) correspondiente al criterio de ordenación seleccionado por el usuario en la ui.
  const orden = OPCIONES_ORDEN[ordenSeleccionado];

  /* repositories = data.repositories. 
  Petición a la bd. Se vuelve a ejecutar automáticamente cada vez que cambian las variables de ordenación o la palabra clave filtrada. */
  const { repositories, fetchMore } = useRepositories({
    // Cantidad de elementos por página.
    first: 3,
    ordenarPor: orden.ordenarPor,
    direccion: orden.direccion,
    palabraClave: busquedaRetrasada
  });

  // Función que se ejecuta al llegar al final de la FlatList.
  const onEndReach = () => {
    fetchMore();
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      navigate={navigate}
      ordenSeleccionado={ordenSeleccionado}
      setOrdenSeleccionado={setOrdenSeleccionado}
      busqueda={busqueda}
      setBusqueda={setBusqueda}
      onEndReach={onEndReach}
    />
  );
};

export default RepositoryList;
