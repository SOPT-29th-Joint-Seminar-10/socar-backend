const functions = require('firebase-functions');
const util = require('../../../lib/util');
const statusCode = require('../../../constants/statusCode');
const responseMessage = require('../../../constants/responseMessage');
const db = require('../../../db/db');
const { myDB } = require('../../../db');

module.exports = async (req, res) => {

  const {userId, carId, isLiked} = req.body;

  console.log(typeof isLiked);
  if (isLiked === null || isLiked === undefined) return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
  if (!userId || !carId) return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
  
  let client;

  try {
    client = await db.connect(req);

    const likeBtn = await myDB.putLikeBtn(client, userId, carId, isLiked);

    res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.LIKE_CHANGE_SUCCESS, likeBtn));
  } catch (error) {
    functions.logger.error(`[ERROR] [${req.method.toUpperCase()}] ${req.originalUrl}`, `[CONTENT] ${error}`);
    console.log(error);
    
    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));

  } finally {
    client.release();
  }
};