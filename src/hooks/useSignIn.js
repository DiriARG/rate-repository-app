import { useMutation } from '@apollo/client';
import { AUTENTICAR } from '../graphql/mutations';

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTENTICAR);

  const signIn = async ({ username, password }) => {
    // Se ejecuta la mutación pasando las credenciales en el formato que espera la API.
    const respuesta = await mutate({
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

    return respuesta;
  };

  return [signIn, result];
};

export default useSignIn;
