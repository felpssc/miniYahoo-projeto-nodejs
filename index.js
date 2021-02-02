const express = require('express');
const { request, response } = require('express');
const app = express();
const bodyParser = require('body-parser');
const { v4: uuid, validate: isUuid, v4 } = require('uuid'); 
const connection = require('./database/database');
const Ask = require('./database/Ask');
const Answer = require('./database/Answer');

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
        response.render('index', { questions, title: 'Perguntas recentes' });
    });
});

app.get('/ask', (request, response) => {
    response.render('ask', { title:'Fazer pergunta' });
});

app.get('/question/:id', (request, response) => {
    const { id } = request.params;
    const question = Ask.findOne({ 
        where: { id }
    }).then(question => {
        if(question != undefined) { 
            const title = question.title;
            response.render('question', {title, question})
        } else { 
            response.redirect('/');
        } 
    });

});

app.post('/ask', (request, response) => {
    const { title, description } = request.body;
    
    Ask.create({
        id: uuid(),
        title,
        description
    }).then(() => response.redirect('/'));
});

app.post('/reply', (request, response) => {
    const { id, answerBody } = request.body;
    console.log(id);
    Answer.create({
        questionID: id,
        body: answerBody
    }).then(() => {
        response.redirect(`/question/${id}`);
    });
});


app.listen(3337, () => {
    console.log('🔥 Back-end Iniciado!')
});