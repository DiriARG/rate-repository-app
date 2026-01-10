import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  // Obtención del token, null en caso de que no exista.
  async getAccessToken() {
    const accessToken = await AsyncStorage.getItem(
      `${this.namespace}:tokenDeAcceso`
    );

    return accessToken ? accessToken : null;
  }

  // Guarda el token.
  async setAccessToken(accessToken) {
    // El primer argumento del método es la clave del elemento y el segundo argumento su valor.
    await AsyncStorage.setItem(
      `${this.namespace}:tokenDeAcceso`,
      accessToken
    );
  }

  // Elimina el token.
  async removeAccessToken() {
    await AsyncStorage.removeItem(
      `${this.namespace}:tokenDeAcceso`
    );
  }
}

export default AuthStorage;
