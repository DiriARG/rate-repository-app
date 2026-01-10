import { StatusBar } from "expo-status-bar";
import { NativeRouter } from "react-router-native";
import { ApolloProvider } from "@apollo/client/react";
import Constants from 'expo-constants';

import Main from "./src/components/Main";
import createApolloClient from "./src/utils/apolloClient";

const apolloClient = createApolloClient();

const App = () => {
  console.log(Constants.expoConfig);

  return (
    <>
      {/* Se envuelve "Main" con NativeRouter para habilitar la navegación en la app. */}
      <NativeRouter>
        <ApolloProvider client={apolloClient}>
          <Main />
        </ApolloProvider>
      </NativeRouter>
      <StatusBar style="auto" />
    </>
  );
};

export default App;
