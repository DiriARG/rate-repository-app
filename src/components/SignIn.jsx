import { View, StyleSheet, Pressable } from "react-native";
import { Formik } from "formik";
import { useNavigate } from "react-router-native";

import FormikTextInput from "./FormikTextInput";
import Text from "./Text";
import theme from "../theme";
import useSignIn from "../hooks/useSignIn";
import { esquemaValidacionSignIn } from "../utils/esquemaDeValidaciones";

const estilos = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "white",
  },
  input: {
    marginBottom: 10,
  },
  boton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 15,
    borderRadius: 4,
    alignItems: "center",
  },
  textoDelBoton: {
    color: "white",
    fontWeight: theme.fontWeights.bold,
  },
});

/* SignInContainer es un componente "puro".
Su única responsabilidad es:
- Renderizar el formulario.
- Manejar Formik.
- Llamar a onSubmit con los valores del formulario.
No sabe nada de Graphql, ni de navegación, ni de AsyncStorage, por lo tanto es ideal para realizar pruebas unitarias. */
export const SignInContainer = ({ onSubmit }) => {
  return (
    /* Formik es el contenedor principal que maneja el estado del formulario.
    - initialValues (Obligatorio): Define los nombres de los campos y sus valores iniciales.
    - onSubmit (Obligatorio): Función que se dispara cuando el formulario es válido y se envía.
    - validationSchema (Opcional): Define las reglas de validación con Yup que deben cumplirse antes de que se permita ejecutar el envío.
    */
    <Formik
      initialValues={{ usuario: "", contraseña: "" }}
      onSubmit={onSubmit}
      validationSchema={esquemaValidacionSignIn}
    >
      {/* Se utiliza el patrón "render prop" para extraer "handleSubmit" de Formik. 
      Esta función actúa como mediadora: valida el formulario (al hacer click en el "Pressable") y, si todo es correcto, ejecuta automáticamente la función "onSubmit" definida anteriormente. */}
      {({ handleSubmit }) => (
        <View style={estilos.container}>
          <FormikTextInput
            testID="usuarioInput"
            name="usuario"
            placeholder="Username"
            style={estilos.input}
          />

          <FormikTextInput
            testID="contraseñaInput"
            name="contraseña"
            placeholder="Password"
            // Propiedad de React Native para ocultar caracteres.
            secureTextEntry
            style={estilos.input}
          />

          <Pressable
            testID="botonDeEnvio"
            onPress={handleSubmit}
            style={estilos.boton}
          >
            <Text style={estilos.textoDelBoton}>Sign in</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

/* SignIn es el componente "conectado" --> useSignIn (Graphql) y useNavigate (navegación).
Su responsabilidad es:
- Usar hooks con efectos secundarios.
- Implementar la lógica real de autenticación.
- Decidir qué pasa después del submit
Este componente NO se utiliza para las pruebas directamente. */
const SignIn = () => {
  // Se extrae la función "signIn" del hook personalizado.
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    // Desestructuración de los valores que vienen del estado de Formik (deben coincidir con los de "initialValues").
    const { usuario, contraseña } = values;

    try {
      // Se llama a la función "signIn" del hook y se le pasa el objeto con los campos que espera la mutación GraphQL.
      await signIn({
        username: usuario,
        password: contraseña,
      });

      // Se redirecciona después de un login exitoso.
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  // SignIn solo renderiza el componente puro y le pasa la lógica real como prop.
  return <SignInContainer onSubmit={onSubmit} />;
};

export default SignIn;
