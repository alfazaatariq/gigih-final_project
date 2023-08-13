import Express from 'express';
import { configDotenv } from 'dotenv';
import videoRoutes from './routes/videos.js';
import productRoutes from './routes/products.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import cors from 'cors';
import commentRoutes from './routes/comments.js';
import { Server } from 'socket.io';
import http from 'http';

import mongoose from 'mongoose';
import video from './models/videos.js';
import product from './models/products.js';
import comment from './models/comments.js';
import user from './models/users.js';
import populateVideos from './helpers/populateVideos.js';
import populateProducts from './helpers/populateProducts.js';
import populateComments from './helpers/populateComments.js';

const app = Express();

configDotenv();

try {
  await mongoose.connect(process.env.DB_URL);
  console.log('DB Connected!');

  let videos = await video.count();
  let products = await product.count();
  // let comments = await comment.count();

  // let products = await product.deleteMany({});
  // let videos = await video.deleteMany({});
  // let comments = await comment.deleteMany({});
  // let users = await user.deleteMany({});

  if (videos === 0) {
    await populateVideos();
    console.log('Videos Populated!');
  }

  if (products === 0) {
    await populateProducts();
    console.log('Products Populated!');
  }

  // if (comments === 0) {
  //   await populateComments();
  //   console.log('Comments Populated!');
  // }
} catch (error) {
  console.log(error);
}

// connectToDB();

app.use(Express.json());
app.use(Express.static('public'));
app.use(cors());

app.use('/users', userRoutes);
app.use('/videos', videoRoutes);
app.use('/products', productRoutes);
app.use('/comments', commentRoutes);
app.use('/auth', authRoutes);

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
