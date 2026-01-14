import { gql } from "@apollo/client";
import { CAMPOS_BASE_REPOSITORIO, CAMPOS_RESENIA } from "./fragments";

export const OBTENER_REPOSITORIOS = gql`
  query ObtenerRepositorios(
    $ordenarPor: AllRepositoriesOrderBy
    $direccion: OrderDirection
    $palabraClave: String
    $first: Int
    $after: String
  ) {
    repositories(
      orderBy: $ordenarPor
      orderDirection: $direccion
      searchKeyword: $palabraClave
      first: $first
      after: $after
    ) {
      edges {
        node {
          ...CamposBaseRepositorio
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
  ${CAMPOS_BASE_REPOSITORIO}
`;

export const OBTENER_USUARIO_ACTUAL = gql`
  # Por defecto "incluirResenias" es false para evitar sobrecarga del servidor, a menos que solicitemos explícitamente las reseñas del usuario.
  query ObtenerUsuarioActual($incluirResenias: Boolean = false) {
    me {
      id
      username
      # Este bloque se incluye solo si "incluirResenias" es true; de lo contrario, se omite.
      reviews @include(if: $incluirResenias) {
        edges {
          node {
            ...CamposResenia
            repository {
              id
              fullName
            }
          }
        }
      }
    }
  }
  ${CAMPOS_RESENIA}
`;


export const OBTENER_REPOSITORIO = gql`
  query ObtenerRepositorio($id: ID!, $cantidad: Int, $desdeDonde: String) {
    repository(id: $id) {
      ...CamposBaseRepositorio
      url
      reviews(first: $cantidad, after: $desdeDonde) {
        edges {
          node {
            ...CamposResenia
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
  ${CAMPOS_BASE_REPOSITORIO}
  ${CAMPOS_RESENIA}
`;
