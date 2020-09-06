var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs-extra');
var fetch = require('node-fetch');
var downloadRoutes = require('./Routes/download');
var uploadRoutes = require('./Routes/upload');
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
const PORT = 4000;
app.get('/', (req, res) => {

    res.render('home');
})
app.use('/', uploadRoutes);
app.use('/', downloadRoutes);
app.listen(process.env.PORT || 3000, function () {
    console.log("App Started");
});
