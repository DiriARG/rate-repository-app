// Código copiado de la teoría.
import { Platform } from "react-native";

const theme = {
  colors: {
    textPrimary: "#24292e",
    textSecondary: "#586069",
    primary: "#0366d6",
    colorDeFondo: "#e1e4e8",
    error: "#d73a4a"
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    // "Platform.select" elige automáticamente según el SO del usuario. 
    main: Platform.select({
      android: "Roboto",
      ios: "Arial",
      default: "System",
    }),
  },
  fontWeights: {
    normal: "400",
    bold: "700",
  },
};

export default theme;
