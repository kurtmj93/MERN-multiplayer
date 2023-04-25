import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SEND_CHAT = gql`
  mutation postMessage($message: String!, $userId: ID!) {
    postMessage(message: $message, user: $userId) {
      message
      createdAt
      user {
        username
      }
    }
  }
`;

export const GET_CHAT = gql`
  subscription getChat {
    chatSent {
      message
      createdAt
      user {
        username
      }
    }
  }
`;