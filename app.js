////ADD VARIABLES TO REQUIRE THE NECESSARY DEPENDENCIES
const express = require('express');
//const bodyParser = require('body-parser');
const router = express.Router(); //is this necessary
const data = require("./data.json"); //What does {data} do exactly?
//require path and query?
//const { app } = data;  
const app = express();
//const read = json();??
//const mainRoutes = require('./routes');

////SET UP MIDDLEWARE
//set view engine to pug
app.set('view engine', 'pug');

//use a static route and the express.static method to serve the static files located in the public folder
app.use('/static', express.static('public'));

////SET ROUTES
app.get('/', (req, res) => {
    const projects = data.projects; //from data.json file
    //res.locals.projects = data.projects;
    res.render("index", { projects }); //or "/"??
});

app.get('/about', (req, res) => {
    res.render("about");
});

app.get('/project/:id', (res, req) => {
    //res.render('project');
    const id = req.params.id; //do i need to put {id}
    const result = data.projects.filter(el => el.id === id);
    //res.redirect(`/projects/${id}`);
    res.render('project', {projects: result});
});


module.exports = router; //unsure

app.use((req, res, next) => {
    const err = new Error('Page not found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status); //sends a 500 status for download error
    res.render('error');
});

app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
});