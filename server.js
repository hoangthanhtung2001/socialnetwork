import 'dotenv/config';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import SocketServer from './socketServer.js';
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';
import postRouter from './routes/postRouter.js';
import commentRouter from './routes/commentRouter.js';
import notifyRouter from './routes/notifyRouter.js';
import messageRouter from './routes/messageRouter.js';
import { ExpressPeerServer } from 'peer';
import { Server } from 'socket.io';
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.json());
app.use(cors());
const httpServer = http.createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });
io.on('connection', (socket) => {
  SocketServer(socket);
});
ExpressPeerServer(httpServer, { path: '/' });
app.use(express.static('client/build'));
app.use('/api', authRouter);
app.use('/api', userRouter);
app.use('/api', postRouter);
app.use('/api', commentRouter);
app.use('/api', notifyRouter);
app.use('/api', messageRouter);
const url = process.env.MONGO_URL;
mongoose.connect(
  url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  },
  (err) => {
    if (err) throw err;
    console.log('DB Conected');
  }
);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`Server is running http://localhost:${PORT}`);
});
