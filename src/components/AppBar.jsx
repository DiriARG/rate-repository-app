import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import Constants from "expo-constants";
import { Link, useNavigate } from "react-router-native";
import { useQuery, useApolloClient } from "@apollo/client";

import { OBTENER_USUARIO_ACTUAL } from "../graphql/queries";
import useAuthStorage from "../hooks/useAuthStorage";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#24292e",
  },
  scroll: {
    // Los elementos se colocan de izquierda a derecha (Horizontal -->).
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  pestaña: {
    marginRight: 20,
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

const AppBar = () => {
  // Se ejecuta la consulta para obtener al usuario; "data" se actualizará automáticamente cuando el estado del caché de Apollo cambie.
  const { data } = useQuery(OBTENER_USUARIO_ACTUAL);
  const authStorage = useAuthStorage();
  const cliente = useApolloClient();

  const navigate = useNavigate();

  const cerrarSesion = async () => {
    await authStorage.removeAccessToken();
    await cliente.resetStore();
    // Para que al salir el usuario sea redirijido a la pestaña de todos los repositorios.
    navigate("/");
  };

  // Contiene el objeto del usuario si la sesión es válida o null si no está autenticado, permitiendo el renderizado condicional de las pestañas.
  const usuarioAutenticado = data?.me;

  return (
    <View style={styles.container}>
      <ScrollView
        // "horizontal" permite que el componente "ScrollView" se desplace horizontalmente una vez que el contenido no encaje en la pantalla. En React, cuando se coloca la propiedad así sola, se asume que es true.
        horizontal
        // Oculta la barra de desplazamiento que aparece en la parte inferior del "ScrollView" cuando se está moviendo por el contenido (En Android casi que no te das cuenta, se nota en pc).
        showsHorizontalScrollIndicator={false}
        // Para aplicarle estilo al contenedor interno del scroll.
        contentContainerStyle={styles.scroll}
      >
        <Link to="/" component={Pressable}>
          <Text style={styles.pestaña}>Repositories</Text>
        </Link>

        {usuarioAutenticado ? (
          <>
            <Link to="/crear-reseña" component={Pressable}>
              <Text style={styles.pestaña}>Create a review</Text>
            </Link>

            <Pressable onPress={cerrarSesion}>
              <Text style={styles.pestaña}>Sign out</Text>
            </Pressable>
          </>
        ) : (
          <>
            <Link to="/signin" component={Pressable}>
              <Text style={styles.pestaña}>Sign in</Text>
            </Link>

            <Link to="/registrarse" component={Pressable}>
              <Text style={styles.pestaña}>Sign up</Text>
            </Link>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
