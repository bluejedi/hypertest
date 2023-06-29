var express = require('express'),
    bodyParser = require('body-parser');
    employees = require('./routes/employees'),
    app = express();

app.use(express.static('www'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "content-type, Content-Type, X-Custom-Header, X-Requested-With");
    //res.header("Access-Control-Allow-Headers", "Accept");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS");
    //res.header("Content-Type", "text/plain");
    next();
});

app.get('/employees', employees.findAll);
app.get('/employees/:id', employees.findById);

app.post('/rest-auth/login/', employees.login);
app.post('/rest-auth/logout/', employees.logout);

app.get('/api/jobs/', employees.findAllJob);
app.post('/api/jobs/', employees.postJobs);
app.patch('/api/jobs/:id', employees.patchJobById);

app.get('/api/movies/', employees.findAllMovie);
app.post('/api/movies/', employees.postJobs);
app.patch('/api/movies/:id', employees.patchJobById);


app.get('/api/persons/', employees.findAllPeople);
app.post('/api/persons/', employees.postPeoples);
app.patch('/api/persons/:id', employees.patchPeopleById);

app.get('/api/genres/', employees.findAllGenre);
app.post('/api/genres/', employees.postGenres);
app.patch('/api/genres/:id', employees.patchGenreById);

app.post('/', (req, res) => {
    let data = req.body;
    res.send('Data Received: ' + JSON.stringify(data));
})

// const bodyParser = require('body-parser')
 
// const app = express()
 
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
 

app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});