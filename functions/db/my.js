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

const getMyRecommendation = async (client, userId) => {
    const { rows } = await client.query(
        `
        SELECT *
        FROM reserve r, car c, car_price cp
        WHERE r.car_id = c.id
            AND cp.car_id = c.id
            AND r.user_id = $1
            AND r.is_deleted = FALSE
            AND c.is_deleted = FALSE
            AND cp.is_deleted = FALSE;
        `,
        [userId]
    );
    return convertSnakeToCamel.keysToCamel(rows);
};

const putLikeBtn = async (client, userId, carId, isLiked) => {
    const { rows: existingRows } = await client.query(
        `
        SELECT *
        FROM "like"
        WHERE user_id = $1
            AND car_id = $2
            AND is_deleted = FALSE
        `,
        [userId, carId]
    );

    if (existingRows.length === 0) {
        console.log(">>> making new")
        const { rows } = await client.query(
            `
            INSERT INTO "like"
            (user_id, car_id, is_liked)
            VALUES
            ($1, $2, $3)
            RETURNING car_id, is_liked
            `,
            [userId, carId, isLiked],
        );
        return convertSnakeToCamel.keysToCamel(rows[0]);
    } 
    else {
        console.log(">>> updating")
        const data = _.merge({}, convertSnakeToCamel.keysToCamel(existingRows[0]), { isLiked });

        const { rows } = await client.query(
        `
        UPDATE "like"
        SET user_id = $1, car_id = $2, is_liked = $3, updated_at = now()
        WHERE user_id = $1
            AND car_id = $2
        RETURNING car_id, is_liked
        `,
        [userId, carId, data.isLiked],
        );
        return convertSnakeToCamel.keysToCamel(rows[0]);
    }
};

module.exports = {getMyRent, getMyRecommendation, putLikeBtn}