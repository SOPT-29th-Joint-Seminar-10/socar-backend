const functions = require('firebase-functions');
const util = require('../../../lib/util');
const statusCode = require('../../../constants/statusCode');
const responseMessage = require('../../../constants/responseMessage');
const db = require('../../../db/db');
const { keysToCamel } = require('../../../lib/convertSnakeToCamel');
const { myDB } = require('../../../db');

module.exports = async (req, res) => {

  const { userid: userId } = req.headers;

  if (!userId) return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
  
  let client;
  
  try {
    client = await db.connect(req);

    const recommend = await myDB.getMyRecommendation(client, userId);

    let response = []
    for(let i = 0; i < (recommend.length <= 4 ? recommend.length : 4); i++) {
        let obj = {};
        let data = recommend[i]

        obj.carName = data.carName
        obj.priceUnit = data.priceUnit
        obj.price = data.price
        obj.discountRate = data.discountRate
        obj.imageUrl = data.imageUrl

        response.push(obj)
    }

    res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.RECOMMENDATION_SUCCESS, response));
   
  } catch (error) {
    functions.logger.error(`[ERROR] [${req.method.toUpperCase()}] ${req.originalUrl}`, `[CONTENT] ${error}`);
    console.log(error);
    
    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));

  } finally {
    client.release();
  }
};