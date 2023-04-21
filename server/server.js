const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');


const app = express();
app.use(express.json());

port = process.env.PORT || 3001;

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: `http://localhost:3000` // this is the client origin
  }
});

io.on('connect', (socket) => {
  console.log('user connected', socket.id);
})


httpServer.listen(port, () => {
  console.log(`Server running at port ${port}`);
});