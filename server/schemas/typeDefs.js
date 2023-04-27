const { gql } = require('graphql-tag');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    isActive: Boolean!
  }

  type Chat {
    _id: ID!
    message: String!
    user: User!
    createdAt: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    chat: [Chat]
    users: [User]
    activeUsers: [User]
  }

  type Mutation {
    login(username: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    postMessage(message: String!, userId: ID!): Chat
    logout(userId: ID!): User
  }

  type Subscription {
    chatSent: Chat
  }
`;

module.exports = typeDefs;
