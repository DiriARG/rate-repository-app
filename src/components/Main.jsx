import { StyleSheet, View } from "react-native";
import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";
import theme from "../theme";

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
      <RepositoryList />
    </View>
  );
};

export default Main;
