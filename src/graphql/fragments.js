import { gql } from '@apollo/client';

export const CAMPOS_BASE_REPOSITORIO = gql`
  fragment CamposBaseRepositorio on Repository {
    id
    fullName
    description
    language
    forksCount
    stargazersCount
    ratingAverage
    reviewCount
    ownerAvatarUrl
  }
`;

export const CAMPOS_RESENIA = gql`
  fragment CamposResenia on Review {
    id
    text
    rating
    createdAt
    user {
      id
      username
    }
  }
`;