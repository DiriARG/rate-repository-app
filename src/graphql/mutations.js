import { gql } from '@apollo/client';

export const AUTENTICAR = gql`
  mutation Autenticar($credentials: AuthenticateInput!) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;