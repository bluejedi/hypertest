var express = require('express'),
    employees = require('./routes/employees'),
    app = express();

app.use(express.static('www'));

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "content-type, X-Custom-Header, X-Requested-With");
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

app.get('/api/persons/', employees.findAllPeople);

app.get('/api/genres/', employees.findAllGenre);

app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});