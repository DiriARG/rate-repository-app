import { useMutation } from "@apollo/client";
import { CREAR_USUARIO } from "../graphql/mutations";

const useCrearUsuario = () => {
  const [enviarMutacion, estadoDeLaMutacion] = useMutation(CREAR_USUARIO);

  const crearUsuario = async ({ username, password }) => {
    const respuesta = await enviarMutacion({
      variables: {
        usuario: { username, password },
      },
    });
    // Se devuelve específicamente el objeto del usuario que el servidor acaba de guardar (con su id y username).
    return respuesta.data.createUser;
  };

  return [crearUsuario, estadoDeLaMutacion];
};

export default useCrearUsuario;
