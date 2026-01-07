import { StatusBar } from "expo-status-bar";
import { NativeRouter } from "react-router-native";

import Main from "./src/components/Main";

const App = () => {
  return (
    <>
      {/* Se envuelve "Main" con NativeRouter para habilitar la navegación en la app.*/}
      <NativeRouter>
        <Main />
      </NativeRouter>
      <StatusBar style="auto" />
    </>
  );
};

export default App;
