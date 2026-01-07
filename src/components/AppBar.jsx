import { View, Text, StyleSheet, Pressable } from 'react-native';
import Constants from 'expo-constants';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 15,
    paddingBottom: 10,
    backgroundColor: '#24292e',
    // Los elementos se colocan de izquierda a derecha (Horizontal -->).
    flexDirection: "row"
  },
  pestaña: {
    marginRight: 20,
    color: "white",
    fontSize: 18,
    fontWeight: 'bold',
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Link to="/" component={Pressable}>
        <Text style={styles.pestaña}>
          Repositories
        </Text>
      </Link>

      <Link to="/signin" component={Pressable}>
        <Text style={styles.pestaña}>
          Sign In
        </Text>
      </Link>
    </View>
  );
};

export default AppBar;
