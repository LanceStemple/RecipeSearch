const axios = require('axios');
require('dotenv').config();

exports.handler = async function(event, context) {
    const { q, from, to } = JSON.parse(event.body);

    const options = {
        method: 'GET',
        url: 'https://api.edamam.com/search',
        headers: {
            'app_id': process.env.RECIPE_API_ID,
            'app_key': process.env.RECIPE_API_KEY,
        },
        params: {
            "q": q,
            "from": from,
            "to": to,
            "app_id": process.env.RECIPE_API_ID,
            "app_key": process.env.RECIPE_API_KEY
        }
    };

    try {
        console.warn("FHAHAHAHA");
        const response = await axios.request(options);
        return {
            statusCode: 200,
            body: JSON.stringify(response.data)
        };
    } catch (error) {
        console.warn("FHAHAHAHA");
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' })
        };
    }
};