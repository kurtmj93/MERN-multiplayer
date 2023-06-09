const { User, Chat } = require('../models');
const { GraphQLError } = require('graphql');
const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();

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
    activeUsers: async () => {
      return await User.find({isActive: true}).exec();
    }
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
      const update = await User.findOneAndUpdate({username: username}, { isActive: true });
      const token = signToken(user);
      return { token, user, update };
    },
    addUser: async (parent, {username, email, password}) => {
      const user = await User.create({username, email, password, isActive: true});
      const token = signToken(user);
      return { token, user };
    },
    postMessage: async (parent, {message, userId} ) => {
      const chat = new Chat();
      chat.user = userId;
      chat.message = message;
      const result = await chat.save();
      const res = await Chat.findById(result._id).populate('user');
      chat.user.username = res.user.username;
      pubsub.publish('CHAT_SENT', {
        chatSent: {
          _id: chat._id,
          message,
          createdAt: chat.createdAt.toLocaleTimeString(),
          user: {
            username: chat.user.username
          }
        }
      });
      return chat;
    },
    logout: async (parent, {userId}) => {
      return await User.findByIdAndUpdate(userId, { isActive: false });
    }
  },
  Subscription: {
    chatSent: {
      subscribe: () => pubsub.asyncIterator(['CHAT_SENT']),
    }
  }
};

module.exports = resolvers;
