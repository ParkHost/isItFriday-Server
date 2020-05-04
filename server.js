const express = require('express');
const cors = require('cors');
// const volleyball = require('volleyball');
const morgan = require('morgan');
const helmet = require('helmet');

const app = express();
app.use(morgan('common'));
app.use(helmet());

app.use(cors());
app.use(express.json());
// app.use(volleyball);

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({
    message: 'Hello  World!',
  })
});

app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
})

app.use((error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? '🍰' : error.stack,
  });
});


app.listen(port, () => {
  console.log(`app is listening on port http://192.168.99.207:${port}`);
});
