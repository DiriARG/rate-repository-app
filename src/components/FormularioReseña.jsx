// Formulario solo UI (visual).
import { View, Pressable, StyleSheet } from "react-native";
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
    padding: 15,
    borderRadius: 4,
    alignItems: "center",
  },
  textoDelBoton: {
    color: "white",
    fontWeight: theme.fontWeights.bold,
  },
});

const FormularioReseña = ({ onSubmit }) => {
  return (
    <View style={estilos.container}>
      <FormikTextInput
        name="nombrePropietario"
        placeholder="Repository owner name"
        style={estilos.input}
      />

      <FormikTextInput
        name="nombreRepositorio"
        placeholder="Repository name"
        style={estilos.input}
      />

      <FormikTextInput
        name="calificacion"
        placeholder="Rating between 0 and 100"
        // Muestra el teclado numérico en dispositivos móviles.
        keyboardType="numeric"
        style={estilos.input}
      />

      <FormikTextInput
        name="texto"
        placeholder="Review"
        // Permite que el campo de texto se expanda a varias líneas.
        multiline
        style={estilos.input}
      />

      <Pressable style={estilos.boton} onPress={onSubmit}>
        <Text style={estilos.textoDelBoton}>Create a review</Text>
      </Pressable>
    </View>
  );
};

export default FormularioReseña;
