const functions = require('firebase-functions');
const util = require('../../../lib/util');
const statusCode = require('../../../constants/statusCode');
const responseMessage = require('../../../constants/responseMessage');
const db = require('../../../db/db');
const { keysToCamel } = require('../../../lib/convertSnakeToCamel');
const { getAllCarData, getIsLikedData, getReserveCarByDate, getReserveCarByType, getReserveCarByLocation, getSortedCarByPrice, getReserveCarbyPopularity } = require('../../../db/reserve');

module.exports = async (req, res) => {

  const { userid: userId } = req.headers;

  const {start, end, type, location, price, trend} = req.query;

  if (!userId) {
    return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
  }

  if(start && !end || !start && end) {
    return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
  }
  
  let client;
  let response;

  try {
    client = await db.connect(req);

    response = await getAllCarData(client);
    response.map((o)=>{
        o.isLiked = false;
    })
    const isLikedData = await getIsLikedData(client, userId);
    if (isLikedData) {
        isLikedData.map((item)=>{
            response.map((o)=>{
                if(item.carId === o.carId){
                    o.isLiked = item.isLiked;
                }
            })
        })
    }

    if(start && end) {
        const startDate = new Date(`${start.substring(0,4)},${start.substring(4,6)},${start.substring(6,8)}`);
        const endDate = new Date(`${end.substring(0,4)},${end.substring(4,6)},${end.substring(6,8)}`);

        console.log("&&",startDate, endDate);
        const reserveCarByDate = await getReserveCarByDate(client, startDate, endDate)
        let carIdList = []
        reserveCarByDate.map((item)=>{
            carIdList.push(item.carId)
        })
        response = response.filter(o=>carIdList.includes(o.carId))
    }

    if(type){
        const reserveCarByType = await getReserveCarByType(client, type);
        let carIdList = []
        reserveCarByType.map((item)=>{
            carIdList.push(item.carId)
        })
        response = response.filter(o=>carIdList.includes(o.carId))
    }

    if(location){
        const reserveCarByLocation = await getReserveCarByLocation(client, location);
        let carIdList = []
        reserveCarByLocation.map((item)=>{
            carIdList.push(item.carId)
        })
        response = response.filter(o=>carIdList.includes(o.carId))
    }

    if(trend){
        const reserveCarByPopularity = await getReserveCarbyPopularity(client,trend);
        let carIdList = []
        reserveCarByPopularity.map((item)=>{
            carIdList.push(item.carId)
        })
        response = response.filter(o=>carIdList.includes(o.carId))
    }
    
    if (price){
        response = response.sort((a,b)=>{
            return Number(a.price)- Number(b.price);
        })
    }
    
    res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.GET_RESERVE_SUCCESS, response));
  } catch (error) {
    functions.logger.error(`[ERROR] [${req.method.toUpperCase()}] ${req.originalUrl}`, `[CONTENT] ${error}`);
    console.log(error);
    
    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR, response));
    
  } finally {
    client.release();
  }
};