// import packages and functions 
const express = require('express');
const path = require('path');
require("dotenv").config();
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const { createServer } = require('http');
const { WebSocketServer } = require('ws');
const { useServer } = require('graphql-ws/lib/use/ws');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const cors = require('cors');
const bodyParser = require('body-parser');

// import db and graphQL schema
const db = require('./config/connection');
const { typeDefs, resolvers } = require ('./schemas');
const schema = makeExecutableSchema({typeDefs, resolvers});

// Create an Express app and HTTP server; we will attach both 
// the WebSocket server and the ApolloServer to this HTTP server.
const app = express();

if (process.env.NODE_ENV === 'production') { 
  app.use(express.static(path.join(__dirname, '../client/build')));
};

const httpServer = createServer(app);

// Create our WebSocket server using the HTTP server we just set up.
const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/graphql'
});

// Save the returned server's info so we can shutdown this server later
const serverCleanup = useServer({ schema }, wsServer);

// add authMiddleware for context and set up ApolloServer
const { authMiddleware } = require('./utils/auth');
const server = new ApolloServer({
  schema,
  context: authMiddleware,
  plugins: [
    ApolloServerPluginDrainHttpServer({httpServer}),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ]
});

const startServer = async () => {
  await server.start();
  app.use('/graphql', cors(), bodyParser.json(), expressMiddleware(server));
  PORT = process.env.PORT || 3001;
  db.once('open', () => {
    httpServer.listen(PORT, () => { 
      console.log(`Server running at http://localhost:${PORT}`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

startServer();
