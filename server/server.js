// import packages 
const express = require('express');
const cors = require('cors');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const { ApolloServer } = require('apollo-server-express');
const { createServer } = require('http');
const { WebSocketServer } = require('ws');
const { useServer } = require('graphql-ws/lib/use/ws');
// import db and graphQL schema
const db = require('./config/connection');
const { typeDefs, resolvers } = require ('./schemas');

const app = express();
// app.use cors and express middleware
app.use(cors());
app.use(express.urlencoded({ extended: true })); // express middleware
app.use(express.json());

const httpServer = createServer(app);

const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/graphql',
});

const serverCleanup = useServer({ typeDefs, resolvers }, wsServer);

const { authMiddleware } = require('./utils/auth');
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});

PORT = process.env.PORT || 3001;

const startServer = async () => {
  await apolloServer.start();
  apolloServer.applyMiddleware({app});

  db.once('open', () => {
    const http = httpServer.listen(PORT, () => { 
      console.log(`Server running at http://localhost:${PORT}`);
      console.log(`Use GraphQL at http://localhost:${PORT}${apolloServer.graphqlPath}`);
    });
  });

};

startServer();
