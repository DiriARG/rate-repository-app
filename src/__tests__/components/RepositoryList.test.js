import { render } from '@testing-library/react-native';
import { RepositoryListContainer } from '../../components/RepositoryList';

describe("RepositoryList", () => {
  describe("RepositoryListContainer", () => {
    it("renders repository information correctly", () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          startCursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
        },
        edges: [
          {
            node: {
              id: "jaredpalmer.formik",
              fullName: "jaredpalmer/formik",
              description: "Build forms in React, without the tears",
              language: "TypeScript",
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars2.githubusercontent.com/u/4060187?v=4",
            },
            cursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
          },
          {
            node: {
              id: "async-library.react-async",
              fullName: "async-library/react-async",
              description: "Flexible promise-based React data loader",
              language: "JavaScript",
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars1.githubusercontent.com/u/54310907?v=4",
            },
            cursor:
              "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          },
        ],
      };

      /* Se renderiza el componente de forma aislada en el entorno de prueba (RepositoryListContainer).
       Se desestructura "getAllByTestId" para buscar múltiples elementos que compartan el mismo identificador. */
      const { getAllByTestId } = render(
        <RepositoryListContainer repositories={repositories} />
      );

      // Obtención de los arrays de elementos para cada campo.
      const nombresCompletos = getAllByTestId('nombreCompleto');
      const descripciones = getAllByTestId('descripcion');
      const lenguajes = getAllByTestId('lenguaje');
      const forks = getAllByTestId('forks');
      const estrellas = getAllByTestId('estrellas');
      const calificaciones = getAllByTestId('calificacionPromedio');
      const reseñas = getAllByTestId('reseñas');

      // Repositorio 1: Verificación que los textos existan en el primer elemento (index 0).
      expect(nombresCompletos[0]).toHaveTextContent('jaredpalmer/formik');
      expect(descripciones[0]).toHaveTextContent(
        'Build forms in React, without the tears'
      );
      expect(lenguajes[0]).toHaveTextContent('TypeScript');
      expect(forks[0]).toHaveTextContent('1.6k');
      expect(estrellas[0]).toHaveTextContent('21.9k');
      expect(calificaciones[0]).toHaveTextContent('88');
      expect(reseñas[0]).toHaveTextContent('3');

      // Repositorio 2: Se verifica el segundo elemento (index 1).
      expect(nombresCompletos[1]).toHaveTextContent('async-library/react-async');
      expect(descripciones[1]).toHaveTextContent(
        'Flexible promise-based React data loader'
      );
      expect(lenguajes[1]).toHaveTextContent('JavaScript');
      expect(forks[1]).toHaveTextContent('69');
      expect(estrellas[1]).toHaveTextContent('1.8k');
      expect(calificaciones[1]).toHaveTextContent('72');
      expect(reseñas[1]).toHaveTextContent('3');
    });
  });
});
