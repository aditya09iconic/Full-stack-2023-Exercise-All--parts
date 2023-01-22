import { gql } from 'apollo-boost';

import { USER_BASE_FIELDS } from './fragments';

export const SIGN_IN = gql`
  mutation Authorize($credentials: AuthorizeInput) {
    authorize(credentials: $credentials) {
      accessToken
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation CreateReview($review: CreateReviewInput) {
    createReview(review: $review) {
      id
      user {
        username
      }
      repository {
        fullName
      }
      userId
      repositoryId
      rating
      createdAt
      text
    }
  }
`;

export const SIGN_UP = gql`
  mutation CreateUser($user: CreateUserInput) {
    createUser(user: $user) {
      ...UserBaseFields
    }
  }
  ${USER_BASE_FIELDS}
`;

export const DELETE_REVIEW = gql`
  mutation DeleteReview($id: ID!) {
    deleteReview(id: $id)
  }
`;
