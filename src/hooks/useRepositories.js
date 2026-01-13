import { useQuery } from "@apollo/client";
import { OBTENER_REPOSITORIOS } from "../graphql/queries";

const useRepositories = (variables) => {
  const { data, loading, error, refetch, fetchMore, ...result } = useQuery(
    OBTENER_REPOSITORIOS,
    {
      // Se pasa el objeto de variables completo (que contiene "ordenarPor" y "direccion").
      variables,
      // Devuelve datos de la caché primero y luego actualiza si los datos del servidor han cambiado.
      fetchPolicy: "cache-and-network",
    }
  );

  // Función para cargar más elementos cuando el usuario llega al final.
  const handleFetchMore = () => {
    // Solo se pide más si no está cargando y si la API dice que hay más páginas.
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    // Ejecutamos fetchMore pasando el cursor de la última posición.
    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  /* Se extrae el objeto "repositories" que tiene la siguiente estructura: { repositories: { edges: [ { node: { ... } } ] } }. */
  const repositories = data?.repositories;

  // Se devuelve la misma interfaz que antes tenía el hook.
  return { repositories, fetchMore: handleFetchMore, loading, error, refetch, ...result };
};

export default useRepositories;
