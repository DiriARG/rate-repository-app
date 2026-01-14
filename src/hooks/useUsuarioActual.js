import { useQuery } from "@apollo/client";
import { OBTENER_USUARIO_ACTUAL } from "../graphql/queries";

// Se le pasa el valor false para evitar que sea undefined.
const useUsuarioActual = (incluirResenias = false) => {
  const { data, loading, error } = useQuery(OBTENER_USUARIO_ACTUAL, {
    variables: { incluirResenias },
    fetchPolicy: "cache-and-network",
  });

  const usuario = data?.me;
  
  return {
    usuario,
    loading,
    error,
  };
};

export default useUsuarioActual;
