import { View, Image, StyleSheet } from "react-native";
import Text from "./Text";
import theme from "../theme";
import formatearConteo from "../utils/formatearConteo";

const estilos = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "white",
  },
  // Sección superior de cada tarjeta del repositorio; contiene el avatar del autor y la info principal del repo (nombre, descripción, lenguaje).
  header: {
    flexDirection: "row",
    marginBottom: 10,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 4,
    marginRight: 15,
  },
  info: {
    flex: 1,
  },
  lenguaje: {
    alignSelf: "flex-start",
    backgroundColor: theme.colors.primary,
    color: "white",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginTop: 6,
  },
  // Contenedor de todas las estadísticas (estrellas, forks, reseñas y la calificación promedio).
  estadisticas: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 12,
  },
  // Contenedor individual de una estadística.
  itemEstadistica: {
    alignItems: "center",
  },
});

/* Muestra una métrica individual del repo.
- label: texto descriptivo (ej: "Estrellas").
- valor: número que se formatea.
- Ahora recibe testID para ubicar esta vista en las pruebas (Jest). */
const EstadisticaDelRepo = ({ label, valor, testID }) => (
  <View style={estilos.itemEstadistica}>
    <Text testID={testID} fontWeight="bold">
      {formatearConteo(valor)}
    </Text>
    <Text color="secondary">{label}</Text>
  </View>
);

const RepositoryItem = ({ repositorio }) => {
  return (
    <View style={estilos.container}>
      <View style={estilos.header}>
        <Image
          style={estilos.avatar}
          source={{ uri: repositorio.ownerAvatarUrl }}
        />

        <View style={estilos.info}>
          <Text testID="nombreCompleto" fontWeight="bold" fontSize="subheading">
            {repositorio.fullName}
          </Text>
          <Text testID="descripcion" color="secondary">
            {repositorio.description}
          </Text>
          <Text testID="lenguaje" style={estilos.lenguaje}>
            {repositorio.language}
          </Text>
        </View>
      </View>

      <View style={estilos.estadisticas}>
        <EstadisticaDelRepo
          testID="estrellas"
          label="Estrellas"
          valor={repositorio.stargazersCount}
        />
        <EstadisticaDelRepo
          testID="forks"
          label="Forks"
          valor={repositorio.forksCount}
        />
        <EstadisticaDelRepo
          testID="reseñas"
          label="Reseñas"
          valor={repositorio.reviewCount}
        />
        <EstadisticaDelRepo
          testID="calificacionPromedio"
          label="Calificación promedio"
          valor={repositorio.ratingAverage}
        />
      </View>
    </View>
  );
};

export default RepositoryItem;
