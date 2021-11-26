const functions = require('firebase-functions');
const util = require('../../../lib/util');
const statusCode = require('../../../constants/statusCode');
const responseMessage = require('../../../constants/responseMessage');
const db = require('../../../db/db');
const { myDB } = require('../../../db');
const { keysToCamel } = require('../../../lib/convertSnakeToCamel');
const { getDayFromDate } = require('../../../lib/convertDate');

module.exports = async (req, res) => {

  const { userId } = keysToCamel(req.headers);

  if (!userId) {
    return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
  }

  let client;
  
  try {
    client = await db.connect(req);

    const rent = await myDB.getMyRent(client, userId);

    let response = []
    for(let i = 0; i < (rent.length <= 4 ? rent.length : 4); i++) {
        let obj = {};
        console.log(rent[i])
        let date = String(rent[i].startDate).substring(8,10);
        let day = getDayFromDate(rent[i].startDate)

        obj.date = String(`${date} ${day}`);
        obj.location = rent[i].currentLocation
        obj.address = rent[i].address

        response.push(obj)
    }
    
    res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.RENT_HISTORY_SUCCESS, response));

  } catch (error) {
    functions.logger.error(`[ERROR] [${req.method.toUpperCase()}] ${req.originalUrl}`, `[CONTENT] ${error}`);
    console.log(error);
    
    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));

  } finally {
    client.release();
  }
};