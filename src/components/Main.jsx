import { StyleSheet, View } from "react-native";
import { Route, Routes, Navigate } from "react-router-native";

import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";
import theme from "../theme";
import SignIn from "./SignIn";
import Repositorio from "./Repositorio";
import CrearReseña from "./CrearReseña";
import Registro from "./Registro";
import MisReseñas from "./MisReseñas";

const estilos = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.colorDeFondo,
  },
});

const Main = () => {
  return (
    <View style={estilos.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/repositorio/:id" element={<Repositorio />} />
        <Route path="/crear-reseña" element={<CrearReseña />} />
        <Route path="/registrarse" element={<Registro />} />
        <Route path="/mis-reseñas" element={<MisReseñas />} />

        {/* Esta ruta se activará si el usuario intenta navegar a una ruta que no coincida con las rutas definidas previamente.
        Manda al usuario a la lista de repositorios; el "replace" reemplaza la ruta errónea al historial de navegación, evitando que al hacer click al botón de "atrás", regresar a la página que no existe. */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
