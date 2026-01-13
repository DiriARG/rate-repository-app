import { gql } from "@apollo/client";
import { CAMPOS_BASE_REPOSITORIO, CAMPOS_RESENIA } from "./fragments";

export const OBTENER_REPOSITORIOS = gql`
  query ObtenerRepositorios(
    $ordenarPor: AllRepositoriesOrderBy
    $direccion: OrderDirection
    $palabraClave: String
  ) {
    repositories(
      orderBy: $ordenarPor
      orderDirection: $direccion
      searchKeyword: $palabraClave
    ) {
      edges {
        node {
          ...CamposBaseRepositorio
        }
      }
    }
  }
  ${CAMPOS_BASE_REPOSITORIO}
`;

export const OBTENER_USUARIO_ACTUAL = gql`
  query Me {
    me {
      id
      username
    }
  }
`;

export const OBTENER_REPOSITORIO = gql`
  query ObtenerRepositorio($id: ID!) {
    repository(id: $id) {
      ...CamposBaseRepositorio
      url
      reviews {
        edges {
          node {
            ...CamposResenia
          }
        }
      }
    }
  }
  ${CAMPOS_BASE_REPOSITORIO}
  ${CAMPOS_RESENIA}
`;
