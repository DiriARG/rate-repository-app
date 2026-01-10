import { View, StyleSheet, Pressable } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";

import FormikTextInput from "./FormikTextInput";
import Text from "./Text";
import theme from "../theme";
import useSignIn from "../hooks/useSignIn"

const reglasDeValidacion = yup.object().shape({
  usuario: yup.string().required("Username is required"),
  contraseña: yup.string().required("Password is required"),
});

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
  },
});

const SignIn = () => {
  // Se extrae la función "signIn" del hook personalizado.
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    // Desestructuración de los valores que vienen del estado de Formik (deben coincidir con los de "initialValues").
    const { usuario, contraseña } = values;

    try {
      // Se llama a la función "signIn" del hook y se le pasa el objeto con los campos que espera la mutación GraphQL.
      const { data } = await signIn({
        username: usuario,
        password: contraseña,
      });

      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    /* Formik es el contenedor principal que maneja el estado del formulario.
    - initialValues (Obligatorio): Define los nombres de los campos y sus valores iniciales.
    - onSubmit (Obligatorio): Función que se dispara cuando el formulario es válido y se envía.
    - validationSchema (Opcional): Define las reglas de validación con Yup que deben cumplirse antes de que se permita ejecutar el envío.
    */
    <Formik
      initialValues={{ usuario: "", contraseña: "" }}
      onSubmit={onSubmit}
      validationSchema={reglasDeValidacion}
    >
      {/* Se utiliza el patrón "render prop" para extraer "handleSubmit" de Formik. 
      Esta función actúa como mediadora: valida el formulario (al hacer click en el "Pressable") y, si todo es correcto, ejecuta automáticamente la función "onSubmit" definida anteriormente. */}
      {({ handleSubmit }) => (
        <View style={estilos.container}>
          <FormikTextInput
            name="usuario"
            placeholder="Username"
            style={estilos.input}
          />

          <FormikTextInput
            name="contraseña"
            placeholder="Password"
            // Propiedad de React Native para ocultar caracteres.
            secureTextEntry
            style={estilos.input}
          />

          <Pressable onPress={handleSubmit} style={estilos.boton}>
            <Text fontWeight="bold" style={estilos.textoDelBoton}>
              Sign in
            </Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

export default SignIn;
