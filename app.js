import 'dotenv/config';
import express from 'express';
import router from './routes/productRoutes.js';
import connect from './schemas/index.js';
import schema from './schemas/productSchema.js';

const app = express();
const port = 3000;
connect();

app.use(express.json());

app.use('/api', router);

app.listen(port, () => {
  console.log(`서버 구동이 정상적으로 완료되었습니다. 포트 : ${port}`);
});
