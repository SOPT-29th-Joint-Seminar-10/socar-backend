const _ = require('lodash');
const convertSnakeToCamel = require('../lib/convertSnakeToCamel');

const getMyRent = async (client, userId) => {
    const { rows } = await client.query(
        `
        SELECT *
        FROM reserve r, car_location c
        WHERE r.car_id = c.car_id
            AND r.user_id = $1
            AND r.is_deleted = FALSE
            AND c.is_deleted = FALSE;
        `,
        [userId]
    );
    return convertSnakeToCamel.keysToCamel(rows);
};

module.exports = {getMyRent};