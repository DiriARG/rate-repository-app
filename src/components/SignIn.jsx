import { View, StyleSheet, Pressable } from "react-native";
import { Formik } from "formik";

import FormikTextInput from "./FormikTextInput";
import Text from "./Text";
import theme from "../theme";

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
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    /* Formik es el contenedor principal que maneja el estado del formulario.
    - initialValues (Obligatorio): Define los nombres de los campos y sus valores iniciales.
    - onSubmit (Obligatorio): Función que se dispara cuando el formulario es válido y se envía.
    */
    <Formik initialValues={{ usuario: "", contraseña: "" }} onSubmit={onSubmit}>
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
