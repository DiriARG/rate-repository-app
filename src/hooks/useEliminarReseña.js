import { useMutation } from "@apollo/client";
import { ELIMINAR_RESENIA } from "../graphql/mutations";

const useEliminarReseña = () => {
  const [enviarMutacion, estadoDeLaMutacion] = useMutation(ELIMINAR_RESENIA);

  const eliminarReseña = async (id) => {
    await enviarMutacion({
      variables: { id },
    });
  };

  return [eliminarReseña, estadoDeLaMutacion];
};

export default useEliminarReseña;
