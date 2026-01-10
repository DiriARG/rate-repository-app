import { gql } from '@apollo/client';
import { CAMPOS_BASE_REPOSITORIO } from './fragments';

export const OBTENER_REPOSITORIOS = gql`
  query ObtenerRepositorios {
    repositories {
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