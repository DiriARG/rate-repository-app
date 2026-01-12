// Código copiado de la teoría.
import React from "react";
import { TextInput as NativeTextInput, StyleSheet } from "react-native";
import theme from "../theme";

const styles = StyleSheet.create({
  input: {
    // Grosor del rectángulo del input.
    borderWidth: 1,
    borderColor: "#d0d7de",
    borderRadius: 4,
    padding: 15,
    backgroundColor: "white",
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
  },
  error: {
    borderColor: theme.colors.error,
  },
});

const TextInput = ({ style, error, ...props }) => {
  /* "styles.input": Siempre aplica el diseño base (bordes, padding). 
  "error && styles.error": Si la prop "error" es verdadera (true), el borde rojo sobreescribe al gris por estar después en el array. Si no hay error (false), esta capa simplemente no existe y se salta. 
  "style": Permite aplicar estilos adicionales enviados desde otros componentes. */
  const textInputStyle = [styles.input, error && styles.error, style];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
