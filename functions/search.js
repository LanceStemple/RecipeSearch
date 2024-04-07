const axios = require('axios');

exports.handler = async (event) => {
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

    const response = await axios.request(options);
        return {
            statusCode: 200,
            body: JSON.stringify(response.data)
        };
};