// 각종 모듈들
const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const hpp = require('hpp');
const helmet = require('helmet');

dotenv.config();

const app = express();

app.use(cors());

if (process.env.NODE_ENV === 'production') {
  app.use(hpp());
  app.use(helmet());
}

// request에 담긴 정보를 json 형태로 파싱하기 위한 미들웨어들
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// 라우팅: routes 폴더로 관리
app.use('/', require('./routes'));

app.use('*', (req, res) => {
  res.status(404).json({
    status: 404,
    success: false,
    message: '잘못된 경로입니다.',
  });
});

// express를 firebase functions로 감싸주는 코드
module.exports = functions
  .runWith({
    timeoutSeconds: 300,
    memory: '512MB',
  })
  .region('asia-northeast3')
  .https.onRequest(async (req, res) => {
    console.log(
      '\n\n',
      '[api]',
      `[${req.method.toUpperCase()}]`,
      req.originalUrl,
      `[${req.method}] ${!!req.user ? `${req.user.id}` : ``} ${req.originalUrl}\n ${!!req.query && `query: ${JSON.stringify(req.query)}`} ${!!req.body && `body: ${JSON.stringify(req.body)}`} ${
        !!req.params && `params ${JSON.stringify(req.params)}`
      }`,
    );

    return app(req, res);
  });
