import Express from 'express';
import { configDotenv } from 'dotenv';
import connectToDB from './config/database.js';
import videoRoutes from './routes/videos.js';
import productRoutes from './routes/products.js';
import cors from 'cors';
import commentRoutes from './routes/comments.js';
import { Server } from 'socket.io';
import http from 'http';

const app = Express();

configDotenv();
await connectToDB();

app.use(Express.json());
app.use(cors());

app.use('/videos', videoRoutes);
app.use('/products', productRoutes);
app.use('/comments', commentRoutes);

const httpServer = http.createServer(app);

const io = new Server(httpServer);

io.on('connection', (socket) => {
  socket.on('comment', (sortedComments, room) => {
    io.emit('received-comment', sortedComments, room);
  });
});

httpServer.listen(process.env.PORT, () => {
  console.log('listening on port ' + process.env.PORT);
});
