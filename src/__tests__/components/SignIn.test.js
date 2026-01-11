import { render, fireEvent, waitFor, act } from "@testing-library/react-native";
import { SignInContainer } from "../../components/SignIn";

describe("SignIn", () => {
  describe("SignInContainer", () => {
    it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
      // Se crea la función simulada.
      const onSubmit = jest.fn();

      const { getByTestId } = render(<SignInContainer onSubmit={onSubmit} />);

      // Se utiliza el "act" para asegurar que todas las actualizaciones internas (vlaidaciones de Yup, cambios de estado en Formik) se procesen antes de pasar a la siguiente línea del test. Evitando avisos de advertencias.
      await act(async () => {
        // Se llena el formulario.
        fireEvent.changeText(getByTestId("usuarioInput"), "kalle");
        fireEvent.changeText(getByTestId("contraseñaInput"), "password");
      });

      // Se presiona el botón.
      await act(async () => {
        fireEvent.press(getByTestId("botonDeEnvio"));
      });

      await waitFor(() => {
        // Se verifica que la función simulada se ejecute exactamente una vez para asegurar que por ej, un error en el código no haga que el formulario se envíe dos veces.
        expect(onSubmit).toHaveBeenCalledTimes(1);
        /* Se verifica que el primer argumento [0][0] sean los valores correctos.
        ".calls[0][0]" significa: primera llamada, primer argumento. */
        expect(onSubmit.mock.calls[0][0]).toEqual({
          usuario: "kalle",
          contraseña: "password",
        });
      });
    });
  });
});
