import { useQuery } from "@apollo/client";
import { OBTENER_REPOSITORIO } from "../graphql/queries";

// Copiamos casi exactamente igual al "useRepositories" de la teoría.
const useRepositorio = (id, cantidad) => {
  const { data, loading, error, refetch, fetchMore, ...result } = useQuery(
    OBTENER_REPOSITORIO,
    {
      // Se pasa el ID y la cantidad como variables requeridas para la consulta GraphQL.
      variables: { id, cantidad },
      fetchPolicy: "cache-and-network",
    }
  );

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        desdeDonde: data.repository.reviews.pageInfo.endCursor,
        id,
        cantidad,
      },
    });
  };

  const repositorio = data?.repository;

  return {
    repositorio,
    fetchMore: handleFetchMore,
    loading,
    error,
    refetch,
    ...result,
  };
};

export default useRepositorio;
