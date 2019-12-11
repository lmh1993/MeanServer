const express = require('express');
const bodyParser = require('body-parser');
const api = require('./routes/api');
const cors = require('cors');

const PORT = 3000;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api', api);

app.get('/', function(req,res){
    res.send('hello from server')
});

app.listen(PORT, function(){
    console.log('Server running on localhost: ' + PORT)
});

//mongodb+srv://Minghui:<password>@cluster0-ayo02.mongodb.net/test?retryWrites=true&w=majority