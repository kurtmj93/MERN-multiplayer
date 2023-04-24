const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
// import sign token function from auth
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userMe = await User.findOne({_id: context.user._id}).select('-__v -password');
        return userMe;
      } else {
        throw new AuthenticationError('You need to be logged-in!');
      }
    }
  },
  Mutation: {
    login: async (parent, { username, password }) => {

      const user = await User.findOne({ username });
      if (!user) {
        throw new AuthenticationError('No user with that email.');
      }

      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect password.');
      }

      const token = signToken(user);
      return { token, user };
    },
    addUser: async (parent, {username, email, password}) => {
      const user = await User.create({username, email, password});
      const token = signToken(user);
      return { token, user };
    }
  }
};

module.exports = resolvers;
