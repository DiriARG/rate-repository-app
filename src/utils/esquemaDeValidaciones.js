import * as yup from "yup";

export const esquemaValidacionSignIn = yup.object().shape({
  usuario: yup.string().required("Username is required"),
  contraseña: yup.string().required("Password is required"),
});

export const esquemaValidacionReseña = yup.object().shape({
  nombrePropietario: yup.string().required("Repository owner name is required"),

  nombreRepositorio: yup.string().required("Repository name is required"),

  calificacion: yup
    .number()
    .required("Rating is required")
    // Valor mínimo (0) y máximo (100) permitido.
    .min(0, "La calificación debe estar entre 0 y 100")
    .max(100, "La calificación debe estar entre 0 y 100"),

  texto: yup.string().optional(),
});

export const esquemaValidacionSignUp = yup.object().shape({
  usuario: yup
    .string()
    .min(1, "El nombre de usuario debe tener al menos 1 carácter")
    .max(30, "El nombre de usuario debe tener como máximo 30 caracteres")
    .required("Username is required"),

  contraseña: yup
    .string()
    .min(5, "La contraseña debe tener al menos 5 caracteres")
    .max(50, "La contraseña debe tener como máximo 50 caracteres")
    .required("Password is required"),

  confirmacionContraseña: yup
    .string()
    // "oneOf" asegura que el valor sea igual al de la referencia "contraseña".
    .oneOf([yup.ref("contraseña")], "Las contraseñas deben coincidir")
    .required("Password confirmation is required"),
});
