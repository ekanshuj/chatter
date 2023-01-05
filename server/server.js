const express = require('express');
const app = express();
const { Server } = require('socket.io');

const cors = require('cors');

const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
// const messageRoutes = require('./routes/messageRoutes');

dotenv.config({ path: './config/.env' });

const connectDB = require('./config/db');
connectDB();

app.use(cors());
app.use(express.json());
app.use('/api/v1/users', userRoutes);
// app.use('/api/v1/chats', messageRoutes);

app.get('/', (req, res) => {
  res.send('Hello World');
})

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => { });


// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5173",
//     // methods: ["GET", "POST"],
//     credentials: true
//   }
// });

// global.users = new Map();
// io.on("connection", (socket) => {
//   socket.on("user", (id) => {
//     users.set(id, socket.id)
//   });
//   socket.on("send__messages", (data) => {
//     const userSocket = users.get(data.to);
//     userSocket && socket.to(userSocket).emit("receive__messages", data.message);
//   });

//   socket.on('disconnect', () => {
//     socket.removeAllListeners('user');
//     socket.removeAllListeners('send__messages');
//     io.removeAllListeners('connection');
//   });
// });