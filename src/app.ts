import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import routes from './routes/';

dotenv.config();

const port = process.env.PORT; // default port to listen
const app = express();

app.use(bodyParser.json());
app.use(routes);

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

export default app;
