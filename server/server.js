const express = require('express');
const cors = require('cors');
const { createServer } = require('http');
const { Server } = require('socket.io');


const app = express();
app.use(cors());
app.use(express.json());

port = process.env.PORT || 3001

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: `http://localhost:3000`,
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

io.on('connect', (socket) => {
  console.log('user connected', socket.id);
})


httpServer.listen(port, () => {
  console.log(`Server running at port ${port}`);
});