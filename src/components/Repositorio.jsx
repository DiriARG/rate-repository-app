import { View, Pressable, StyleSheet } from "react-native";
import { useParams } from "react-router-native";
import * as Linking from "expo-linking";

import Text from "./Text";
import RepositoryItem from "./RepositoryItem";
import useRepositorio from "../hooks/useRepositorio";
import theme from "../theme";

const estilos = StyleSheet.create({
  boton: {
    backgroundColor: theme.colors.primary,
    padding: 15,
    margin: 15,
    borderRadius: 4,
    alignItems: "center",
  },
  textoDelBoton: {
    color: "white",
    fontWeight: theme.fontWeights.bold,
  },
});

const Repositorio = () => {
  // Se obtiene el ID del parámetro de la ruta /repositorio/:id.
  const { id } = useParams();
  const { repositorio, loading, error } = useRepositorio(id);

  if (loading) return <Text>Cargando...</Text>;
  // Se dispara cuando la comunicación con el servidor falló ej: no hay internet, el server GraphQL esta caído, etc.
  if (error) return <Text>Error: {error.message}</Text>;
  // Se dispara cuando la petición terminó "bien" (no hubo error de red), pero no hay datos ej: el servidor devolvió null porque el ID de la busqueda no existe en la bd.
  if (!repositorio) return null;

  // Función que se ejecuta al presionar el botón "Open in Github". Utiliza la API Linking de Expo para abrir una URL externa, en este caso, la URL pública del repositorio en gh.
  const abrirEnGitHub = () => {
    Linking.openURL(repositorio.url);
  };

  return (
    <View>
      {/* Se reutiliza "RepositoryItem" para mostrar la información del repositorio. */}
      <RepositoryItem repositorio={repositorio} />

      <Pressable style={estilos.boton} onPress={abrirEnGitHub}>
        <Text style={estilos.textoDelBoton}>Open in GitHub</Text>
      </Pressable>
    </View>
  );
};

export default Repositorio;
