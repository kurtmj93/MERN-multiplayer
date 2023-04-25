const { User, Chat } = require('../models');
const { GraphQLError } = require('graphql');

// import sign token function from auth
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    chat: async () => {
      return await Chat.find().populate('user');
    },
    users: async () => {
      return await User.find().exec();
    },
  },
  Mutation: {
    login: async (parent, { username, password }) => {

      const user = await User.findOne({ username });
      if (!user) {
        throw new GraphQLError('No user with that email.');
      }

      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new GraphQLError('Incorrect password.');
      }

      const token = signToken(user);
      return { token, user };
    },
    addUser: async (parent, {username, email, password}) => {
      const user = await User.create({username, email, password});
      const token = signToken(user);
      return { token, user };
    },
    postMessage: async (parent, {message, userId} ) => {
      const chat = new Chat();
      chat.user = userId;
      chat.message = message;
      await chat.save();
      return chat;
    }
  }
};

module.exports = resolvers;
