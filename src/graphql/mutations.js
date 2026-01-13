import { gql } from '@apollo/client';

export const AUTENTICAR = gql`
  mutation Autenticar($credentials: AuthenticateInput!) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;

export const CREAR_RESENIA = gql`
  mutation CrearResenia(
    $nombrePropietario: String!
    $nombreRepositorio: String!
    $calificacion: Int!
    $texto: String
  ) {
    createReview(
      review: {
        ownerName: $nombrePropietario
        repositoryName: $nombreRepositorio
        rating: $calificacion
        text: $texto
      }
    ) {
      repositoryId
    }
  }
`;

export const CREAR_USUARIO = gql`
  mutation CrearUsuario($usuario: CreateUserInput) {
    createUser(user: $usuario) {
      id
      username
    }
  }
`;