import { ApolloClient, InMemoryCache } from '@apollo/client';
import Constants from 'expo-constants';

const createApolloClient = () => {
  return new ApolloClient({
    /* "Constants.expoConfig.extra" es un objeto donde Expo almacena configuraciones personalizadas definidas en "app.config.js".
    En este caso se utiliza para acceder a una variable de entorno (.env) al código del cliente, ya que "process.env" no es accesible directamente en dispositivos móviles. */
    uri: Constants.expoConfig.extra.apolloUri,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;