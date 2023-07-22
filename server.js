import Express from 'express';
import { configDotenv } from 'dotenv';
import connectToDB from './config/database.js';
import { getAllVideos } from './controllers/controllers.js';

const app = Express();
configDotenv();
await connectToDB();

app.use(Express.json());

app.get('/getvideos', getAllVideos);

app.listen(process.env.PORT, () => {
  console.log('listening on port ' + process.env.PORT);
});
