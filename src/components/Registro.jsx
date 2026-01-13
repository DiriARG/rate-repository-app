import { View, StyleSheet, Pressable } from "react-native";
import { Formik } from "formik";
import { useNavigate } from "react-router-native";

import FormikTextInput from "./FormikTextInput";
import Text from "./Text";
import theme from "../theme";
import { esquemaValidacionSignUp } from "../utils/esquemaDeValidaciones";
import useCrearUsuario from "../hooks/useCrearUsuario";
import useSignIn from "../hooks/useSignIn";

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

const Registro = () => {
  const [crearUsuario] = useCrearUsuario();
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const alEnviar = async (valores) => {
    const { usuario, contraseña } = valores;

    try {
      await crearUsuario({
        username: usuario,
        password: contraseña,
      });

      // Luego del registro, se produce un login automático.
      await signIn({
        username: usuario,
        password: contraseña,
      });

      navigate("/");
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <Formik
      initialValues={{
        usuario: "",
        contraseña: "",
        confirmacionContraseña: "",
      }}
      onSubmit={alEnviar}
      validationSchema={esquemaValidacionSignUp}
    >
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
            secureTextEntry
            style={estilos.input}
          />

          <FormikTextInput
            name="confirmacionContraseña"
            placeholder="Password confirmation"
            secureTextEntry
            style={estilos.input}
          />

          <Pressable onPress={handleSubmit} style={estilos.boton}>
            <Text style={estilos.textoDelBoton}>Sign up</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

export default Registro;
