import { View, Pressable, StyleSheet, FlatList } from "react-native";
import { useParams } from "react-router-native";
import * as Linking from "expo-linking";
import { format } from "date-fns";

import Text from "./Text";
import RepositoryItem from "./RepositoryItem";
import useRepositorio from "../hooks/useRepositorio";
import theme from "../theme";

const estilos = StyleSheet.create({
  boton: {
    backgroundColor: theme.colors.primary,
    padding: 15,
    marginTop: 15,
    borderRadius: 4,
    alignItems: "center",
  },
  textoDelBoton: {
    color: "white",
    fontWeight: theme.fontWeights.bold,
  },
  separador: {
    height: 10,
    backgroundColor: theme.colors.colorDeFondo,
  },
  containerDeReseña: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: "white",
  },
  containerDeCalificacion: {
    width: 50,
    height: 50,
    // width / 2 para que sea un círculo perfecto.
    borderRadius: 25,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  textoCalificacion: {
    color: theme.colors.primary,
    fontWeight: theme.fontWeights.bold,
  },
  contenidoReseña: {
    flex: 1,
  },
});

// Información del repositorio.
const RepositoryInfo = ({ repository }) => {
  // Función que se ejecuta al presionar el botón "Open in Github". Utiliza la API Linking de Expo para abrir una URL externa, en este caso, la URL pública del repositorio en gh.
  const abrirEnGitHub = () => {
    Linking.openURL(repository.url);
  };

  return (
    // Se reutiliza "RepositoryItem" para mostrar la información del repositorio.
    <RepositoryItem repositorio={repository}>
      <Pressable style={estilos.boton} onPress={abrirEnGitHub}>
        <Text style={estilos.textoDelBoton}>
          Open in GitHub
        </Text>
      </Pressable>
    </RepositoryItem>
  );
};

// Reseña individual.
const ReviewItem = ({ review }) => {
  return (
    <View style={estilos.containerDeReseña}>
      <View style={estilos.containerDeCalificacion}>
        <Text style={estilos.textoCalificacion}>{review.rating}</Text>
      </View>

      {/* Contenido de la reseña. */}
      <View style={estilos.contenidoReseña}>
        <Text fontWeight="bold">{review.user.username}</Text>

        <Text color="textSecondary">
          {/* Se formatea la fecha a date.month.year. */}
          {format(new Date(review.createdAt), "dd.MM.yyyy")}
        </Text>

        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

const SeparadorDeLista = () => <View style={estilos.separador} />;

const Repositorio = () => {
  // Se obtiene el ID del parámetro de la ruta /repositorio/:id.
  const { id } = useParams();
  /* Se invoca el hook personalizado, el 1er arg se asigna al parámetro "id" del hook.
  2do arg se asigna al parámetro "cantidad" del hook, en este caso pedimos 5 reseñas. */
  const { repositorio, loading, error, fetchMore } = useRepositorio(id, 5);

  if (loading) return <Text>Cargando...</Text>;
  // Se dispara cuando la comunicación con el servidor falló ej: no hay internet, el server GraphQL esta caído, etc.
  if (error)
    return <Text>Error al cargar el repositorio: {error.message}</Text>;
  // Se dispara cuando la petición terminó "bien" (no hubo error de red), pero no hay datos ej: el servidor devolvió null porque el ID de la busqueda no existe en la bd.
  if (!repositorio) return null;

  const reviews = repositorio.reviews.edges.map((edge) => edge.node);
  
  // Función de la teoría.
  const onEndReach = () => {
    fetchMore();
  }
  
  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={SeparadorDeLista}
      /*
      ListHeaderComponent: Renderiza un componente al inicio de la lista. Se utiliza aquí para que la información del repositorio y el botón de GitHub formen parte de la misma lista desplazable. 
      Esto evita errores de anidamiento de componentes con scroll (como poner un FlatList dentro de un ScrollView) y asegura que todo el contenido se desplace de forma fluida y coordinada. */
      ListHeaderComponent={() => <RepositoryInfo repository={repositorio} />}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export default Repositorio;
