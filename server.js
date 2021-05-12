//Required boilerplate code

const express = require('express');

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

app.use(express.static('website'));
const port = 8000;

const server = app.listen(port, listening);

// Testing the server

function listening() {
    console.log(`running on localhost: ${port}`);
};

// Storing the data

const data = [];

// Get all the data

app.get('/all', function(req, res) {
    res.send(data);
})

// Add the weather data + mood message

app.post('/addWeather', addWeather);

function addWeather (req, res) {
    console.log(req.body)
    let newData = req.body;
    let newEntry = {
        name: newData.name,
        time: newData.time,
        temp: newData.temp,
        mood: newData.mood
    }
    data.push(newEntry);
}
