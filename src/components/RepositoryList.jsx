import { FlatList, View, StyleSheet } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {
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
        // Se envía la info del repo a traves de la prop "repositorio".
        <RepositoryItem repositorio={item} />
      )}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={ItemSeparator}
      // Other props
    />
  );
};

const RepositoryList = () => {
  // repositories = data.repositories.
  const { repositories } = useRepositories();

  return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;
