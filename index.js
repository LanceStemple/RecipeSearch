const PORT = 8000;
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();

app.use(cors());

app.get('/', (req, res) =>{
    res.json('hi');
})

app.get('/search', (req, res) =>{
    const options = {
        method: 'GET',
        url: 'https://api.edamam.com/search',
        headers: {
            'app_id': process.env.RECIPE_API_ID,
            'app_key': process.env.RECIPE_API_KEY,
        },
        params: {
            "q": req.query.q,
            "from": req.query.from,
            "to": req.query.to,
            "app_id": process.env.RECIPE_API_ID,
            "app_key": process.env.RECIPE_API_KEY
        }
    }

    axios.request(options).then((response) => {
        res.json(response.data);
    }).catch((error) => {
        console.error(error)
    })
})

app.listen(PORT, () => console.log('Server is running on port ' + PORT));
