import { useQuery } from "@apollo/client";
import { OBTENER_REPOSITORIOS } from "../graphql/queries";

const useRepositories = (variables) => {
  const { data, loading, error, refetch } = useQuery(OBTENER_REPOSITORIOS, {
    // Se pasa el objeto de variables completo (que contiene "ordenarPor" y "direccion").
    variables,
    // Devuelve datos de la caché primero y luego actualiza si los datos del servidor han cambiado.
    fetchPolicy: "cache-and-network",
  });

  /* Se extrae el objeto "repositories" que tiene la siguiente estructura: { repositories: { edges: [ { node: { ... } } ] } }. */
  const repositories = data?.repositories;

  // Se devuelve la misma interfaz que antes tenía el hook.
  return { repositories, loading, error, refetch };
};

export default useRepositories;
