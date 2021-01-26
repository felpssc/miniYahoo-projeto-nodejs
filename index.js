const express = require('express');
const {request, response} = require('express');
const app = express();
const bodyParser = require('body-parser');
const { v4: uuid, validate: isUuid, v4 } = require('uuid'); 


app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// routes here

app.get('/', (request, response) => {
    response.render('index');
});

app.get('/ask', (request, response) => {
    response.render('ask');
});

app.post('/ask', (request, response) => {
    const { title, description } = request.body;
    const newAsk = {
        id: uuid(),
        title,
        description,
        date: new Date
    }
    response.send(newAsk);
});


app.listen(3338, () => {
    console.log('🔥 Back-end Iniciado!')
});