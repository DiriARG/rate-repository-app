import { useQuery } from "@apollo/client";
import { OBTENER_REPOSITORIO } from "../graphql/queries";

const useRepositorio = (id) => {
  const { data, loading, error, refetch } = useQuery(OBTENER_REPOSITORIO, {
    // Se pasa el ID como variable para la consulta GraphQL.
    variables: { id },
    fetchPolicy: "cache-and-network",
  });

  const repositorio = data?.repository;

  return { repositorio, loading, error, refetch };
};

export default useRepositorio;
