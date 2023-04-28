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

export const LOGOUT_USER = gql`
  mutation logout($userId: ID!) {
    logout(userId: $userId) { 
        isActive
    }
  }
`

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password, isActive: true) {
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
    postMessage(message: $message, userId: $userId) {
      message
      createdAt
      user {
        username
      }
    }
  }
`;

export const GET_CHAT = gql`
query getChat {
  chat {
    message
    createdAt
    user {
      username
    }
  }
}
`

export const GET_ACTIVE = gql`
query getUsers {
  activeUsers {
      _id
      username
      isActive
    }
}
`

export const SUBSCRIBE_CHAT = gql`
  subscription subscribeChat {
    chatSent {
      _id
      message
      createdAt
      user {
        username
      }
    }
  }
`;