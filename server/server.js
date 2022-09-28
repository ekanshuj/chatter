const express = require('express');
const app = express();
const cors = require('cors');

const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes');

dotenv.config({ path: './config/.env' });

const connectDB = require('./config/db');
connectDB();

app.use(express.json());
app.use(cors());
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/chats', messageRoutes);

app.get('/', (req, res) => {
  res.send('Hello World');
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => { });
