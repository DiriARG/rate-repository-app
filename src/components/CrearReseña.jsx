// Lógica (Formik + mutación + navegación)
import { Formik } from "formik";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-native";

import FormularioReseña from "./FormularioReseña";
import { CREAR_RESENIA } from "../graphql/mutations";
import { esquemaValidacionReseña } from "../utils/esquemaDeValidaciones";

const valoresIniciales = {
  nombrePropietario: "",
  nombreRepositorio: "",
  calificacion: "",
  texto: "",
};

const CrearReseña = () => {
  const navigate = useNavigate();
  const [createReview] = useMutation(CREAR_RESENIA);

  const alEnviar = async (valores) => {
    const { nombrePropietario, nombreRepositorio, calificacion, texto } =
      valores;

    try {
      const resultado = await createReview({
        variables: {
          nombrePropietario,
          nombreRepositorio,
          calificacion: Number(calificacion),
          texto,
        },
      });

      // Ruta de la reseña creada.
      const IdRepositorio = resultado.data.createReview.repositoryId;
      // Despues de la creación de la reseña, se redirije al usuario al repo reseñado.
      navigate(`/repositorio/${IdRepositorio}`);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <Formik
      initialValues={valoresIniciales}
      onSubmit={alEnviar}
      validationSchema={esquemaValidacionReseña}
    >
      {({ handleSubmit }) => <FormularioReseña onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default CrearReseña;
