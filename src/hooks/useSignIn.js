import { useMutation, useApolloClient } from "@apollo/client";
import { AUTENTICAR } from "../graphql/mutations";
import useAuthStorage from "./useAuthStorage";

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const cliente = useApolloClient();

  const [mutate, result] = useMutation(AUTENTICAR);

  const signIn = async ({ username, password }) => {
    // Se ejecuta la mutación pasando las credenciales en el formato que espera la API.
    const { data } = await mutate({
      // "variables" es el objeto que Apollo siempre requiere para enviar datos dinámicos.
      variables: {
        // "credentials" es el nombre exacto de la variable que esta definida en la mutación GraphQL ($credentials).
        credentials: {
          // Estos son los campos que el tipo "AuthenticateInput" exige.
          username,
          password,
        },
      },
    });

    // Se guarda el token.
    const tokenDeAcceso = data.authenticate.accessToken;
    await authStorage.setAccessToken(tokenDeAcceso);

    // Se resetea el store de Apollo para limpiar la caché.
    await cliente.resetStore();

    return { data };
  };

  return [signIn, result];
};

export default useSignIn;
