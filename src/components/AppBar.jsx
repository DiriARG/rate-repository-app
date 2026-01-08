import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import Constants from "expo-constants";
import { Link } from "react-router-native";

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

        <Link to="/signin" component={Pressable}>
          <Text style={styles.pestaña}>Sign In</Text>
        </Link>
      </ScrollView>
    </View>
  );
};

export default AppBar;
