import mongoose from 'mongoose';

const connect = () => {
  mongoose
    .connect('mongodb+srv://dnjs5432:wldkskfn3@leeyewon.vuqafjp.mongodb.net/', {
      dbName: 'node_lv1',
    })
    .then(() => console.log('MongoDB 연결에 성공하였습니다.'))
    .catch((err) => console.log(`MongoDB 연결에 실패하였습니다. ${err}`));
};

mongoose.connection.on('error', (err) => {
  console.error('MongoDB 연결 에러', err);
});

export default connect;
