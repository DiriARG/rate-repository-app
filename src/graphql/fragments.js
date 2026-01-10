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
