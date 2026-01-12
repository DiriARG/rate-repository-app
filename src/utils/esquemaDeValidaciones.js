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
    .min(0, "Rating must be between 0 and 100")
    .max(100, "Rating must be between 0 and 100"),

  texto: yup.string().optional(),
});
