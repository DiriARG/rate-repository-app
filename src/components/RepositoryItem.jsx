import { View, Text, StyleSheet } from 'react-native';

const estilos = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white',
  },
  nombreCompleto: {
    fontWeight: 'bold',
  },
  estadisticas: {
    marginTop: 8,
  },
});

const RepositoryItem = ({ repositorio }) => {
  return (
    <View style={estilos.container}>
      <Text style={estilos.nombreCompleto}>Nombre completo: {repositorio.fullName}</Text>
      <Text>Descripción: {repositorio.description}</Text>
      <Text>Lenguaje: {repositorio.language}</Text>

      <View style={estilos.estadisticas}>
        <Text>Estrellas: {repositorio.stargazersCount}</Text>
        <Text>Forks: {repositorio.forksCount}</Text>
        <Text>Reseñas: {repositorio.reviewCount}</Text>
        <Text>Calificación promedio: {repositorio.ratingAverage}</Text>
      </View>
    </View>
  );
};

export default RepositoryItem;
