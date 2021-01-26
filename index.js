const express = require('express');
const { request, response } = require('express');
const app = express();
const bodyParser = require('body-parser');
const { v4: uuid, validate: isUuid, v4 } = require('uuid'); 
const connection = require('./database/database');
const Ask = require('./database/Ask');

// database connection
connection.authenticate()
    .then(() => {
        console.log('Connected to Database.');
    })
    .catch((error) => {
        console.log(error);
    });

// app configs

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// routes here

app.get('/', (request, response) => {
    Ask.findAll({ raw: true, order: [['createdAt', 'desc']] }).then(questions => {
        response.render('index', { questions });
    });
});

app.get('/ask', (request, response) => {
    response.render('ask');
});

app.post('/ask', (request, response) => {
    const { title, description } = request.body;
    
    Ask.create({
        id: uuid(),
        title,
        description
    }).then(() => response.redirect('/'));
});


app.listen(3337, () => {
    console.log('🔥 Back-end Iniciado!')
});