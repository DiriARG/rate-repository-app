import { View, Text, StyleSheet, Pressable } from 'react-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 15,
    backgroundColor: '#24292e',
  },
  pestaña: {
    paddingVertical: 15,
  },
  textoPestaña: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Pressable style={styles.pestaña}>
        <Text style={styles.textoPestaña}>Repositorios</Text>
      </Pressable>
    </View>
  );
};

export default AppBar;
