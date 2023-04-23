// declare express, socketio, apolloserver
const express = require('express');
const app = express();
const db = require('./config/connection');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');

// import graphQL schema
const { typeDefs, resolvers } = require ('./schemas');

// app.use cors and express middleware
app.use(cors());
app.use(express.urlencoded({ extended: true })); // express middleware
app.use(express.json());

// declare authMiddleware and server
const { authMiddleware } = require('./utils/auth');
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

PORT = process.env.PORT || 3001;

const io = require('socket.io')(server);


const startServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({app});

  db.once('open', () => {

    // NOTE: apparently, app.listen is not recommended, but I couldnt get graphql playground to load using the recommended httpserver method
    const http = app.listen(PORT, () => { 
      console.log(`Server running at http://localhost:${PORT}`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
    const io = require('socket.io')(http);
    io.on('connect', (socket) => {
      console.log('user connected', socket.id);
    });
  });

};

startServer(typeDefs, resolvers);
