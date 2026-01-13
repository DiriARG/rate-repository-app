import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import Constants from 'expo-constants';
import { setContext } from '@apollo/client/link/context';
import { relayStylePagination } from '@apollo/client/utilities';

/* "Constants.expoConfig.extra" es un objeto donde Expo almacena configuraciones personalizadas definidas en "app.config.js".
En este caso se utiliza para acceder a una variable de entorno (.env) al código del cliente, ya que "process.env" no es accesible directamente en dispositivos móviles. */
const { apolloUri } = Constants.expoConfig.extra;

const httpLink = createHttpLink({
  uri: apolloUri,
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        repositories: relayStylePagination(),
      },
    },
  /* Configura la caché para que las reseñas (reviews) no se sobrescriban. 
  "relayStylePagination" le indica a Apollo que cuando pida una nueva página de reseñas, debe "concatenar" los nuevos resultados al final de los existentes en la memoria. 
  Esto es lo que permite que el usuario haga scroll hacia abajo y siga viendo las reseñas anteriores junto con las nuevas. */
    Repository: {
      fields: {
        reviews: relayStylePagination(),
      },
    },
  },
});

const createApolloClient = (authStorage) => {
  const authLink = setContext(async (_, { headers }) => {
    try {
      const accessToken = await authStorage.getAccessToken();
      return {
        headers: {
          ...headers,
          authorization: accessToken ? `Bearer ${accessToken}` : '',
        },
      };
    } catch (e) {
      console.log(e);
      return {
        headers,
      };
    }
  });
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
  });
};

export default createApolloClient;