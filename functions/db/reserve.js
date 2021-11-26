const _ = require('lodash');
const convertSnakeToCamel = require('../lib/convertSnakeToCamel');

const getAllCarData = async (client) => {
    const { rows } = await client.query(
        `
        SELECT DISTINCT c.id as car_id, c.car_name, c.model_year, cp.price_unit, cp.price, cp.discount_rate, cl.current_location, c.image_url
        FROM car c INNER JOIN reserve r 
        ON c.id = r.car_id
        INNER JOIN car_location cl
        ON r.car_id = cl.car_id
        INNER JOIN car_price cp
        ON cl.car_id = cp.car_id
        `
    );
    return convertSnakeToCamel.keysToCamel(rows);
}

const getIsLikedData = async (client, userId) => {
    const { rows } = await client.query(
        `
        SELECT DISTINCT c.id as car_id, l.is_liked
        FROM  car c, "like" l
        WHERE l.car_id = c.id
            AND l.user_id = $1
            AND c.is_deleted = FALSE
            AND l.is_deleted = FALSE;
        `,
        [userId]
    );
    return convertSnakeToCamel.keysToCamel(rows);
}
// 받은 날짜에 예약 내역 없는 차를 리턴
const getReserveCarByDate = async (client, startDate, endDate) => {
    const { rows } = await client.query(
        `
        SELECT DISTINCT car_id, car_name 
        FROM reserve r, car c
        WHERE r.car_id = c.id
            AND (r.end_date < $1 OR r.start_date > $2) 
            AND r.is_deleted = FALSE
            AND c.is_deleted = FALSE;
        `,
        [startDate, endDate]
    );
    return convertSnakeToCamel.keysToCamel(rows);
};

const getReserveCarByType = async (client, type) => {
    const { rows } = await client.query(
        `
        SELECT DISTINCT c.id as car_id, car_type
        FROM car c
        WHERE c.car_type = $1
            AND c.is_deleted = FALSE;
        `,
        [type]
    );
    return convertSnakeToCamel.keysToCamel(rows);
}

const getReserveCarByLocation = async (client, location) => {
    const { rows } = await client.query(
        `
        SELECT *
        FROM car c, car_location cl
        WHERE c.id = cl.car_id
            AND cl.region = $1
            AND cl.is_deleted = FALSE
            AND c.is_deleted = FALSE;
        `,
        [location]
    );
    return convertSnakeToCamel.keysToCamel(rows);
}

const getSortedCarByPrice = async(client) => {
    const { rows } = await client.query(
        `
        SELECT *
        FROM car c, car_price cp
        WHERE c.id = cp.car_id
            AND cp.is_deleted = FALSE
            AND c.is_deleted = FALSE;
        `
    );
    return convertSnakeToCamel.keysToCamel(rows);
}

const getReserveCarbyPopularity = async(client, trend) => {
    const { rows } = await client.query(
        `
        SELECT DISTINCT c.id as car_id
        FROM  car c, "like" l
        WHERE l.car_id = c.id
            AND l.is_liked = $1
            AND l.is_deleted = FALSE
            AND c.is_deleted = FALSE;
        `,
        [trend]
    );
    return convertSnakeToCamel.keysToCamel(rows);
}

module.exports = {getAllCarData, getIsLikedData, getReserveCarByDate,getReserveCarByType,getReserveCarByLocation, getSortedCarByPrice, getReserveCarbyPopularity }