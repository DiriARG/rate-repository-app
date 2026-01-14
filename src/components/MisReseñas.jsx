import { FlatList, View, Pressable, StyleSheet } from "react-native";
import { useNavigate } from "react-router-native";
import { format } from "date-fns";

import Text from "./Text";
import theme from "../theme";
import useUsuarioActual from "../hooks/useUsuarioActual";

const estilos = StyleSheet.create({
  separador: {
    height: 10,
    backgroundColor: theme.colors.colorDeFondo,
  },
  container: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: "white",
  },
  containerDeCalificacion: {
    width: 50,
    height: 50,
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

const ReseñaItem = ({ reseña, alPresionar }) => {
  return (
    <Pressable onPress={alPresionar}>
      <View style={estilos.container}>
        <View style={estilos.containerDeCalificacion}>
          <Text style={estilos.textoCalificacion}>{reseña.rating}</Text>
        </View>

        <View style={estilos.contenidoReseña}>
          <Text fontWeight="bold">{reseña.repository.fullName}</Text>

          <Text color="textSecondary">
            {format(new Date(reseña.createdAt), "dd.MM.yyyy")}
          </Text>

          <Text>{reseña.text}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const SeparadorDeLista = () => <View style={estilos.separador} />;

const MisReseñas = () => {
  const navigate = useNavigate();
  // Se llama al hook con "true" para obtener las reseñas.
  const { usuario, loading, error } = useUsuarioActual(true);

  if (loading) return <Text>Cargando...</Text>;
  if (error) return <Text>Error al cargar las reseñas: {error.message}</Text>;
  if (!usuario) return null;

  const reseñas = usuario.reviews.edges.map((edge) => edge.node);

  return (
    <FlatList
      data={reseñas}
      renderItem={({ item }) => (
        <ReseñaItem
          reseña={item}
          // Al presionar la reseña, navega hacia la vista detallada del repositorio correspondiente.
          alPresionar={() => navigate(`/repositorio/${item.repository.id}`)}
        />
      )}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={SeparadorDeLista}
    />
  );
};

export default MisReseñas;
