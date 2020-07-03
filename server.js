const express = require('express');

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

app.use(express.static('static'));

const port = 3000;
let projectData = [];

const server = app.listen(port, () => 
    { 
        console.log(`running on localhost: ${ port }`); 
    });


app.get('/get', (req, res) => {
    res.send(projectData);
    projectData.splice(0, projectData.length);//earse data after sending the response
});

app.post('/save', (req, res) => {
    projectData.splice(0, projectData.length);//earse any old data
    projectData.push(req.body);
    // console.log(projectData);
});

