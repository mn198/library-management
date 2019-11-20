const { cloudinaryConfig } =  require('./common/config/cloudinaryConfig');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./common/config/env.config');
var path = require('path');
const app = express();

mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(config.db_url, { useNewUrlParser: true })
    .then(() => console.log('connected to database!'))
    .catch((err) => console.log('can not connect to database:' + err));

const UserRouter = require('./users/routes.config');
const AuthorizationRouter = require('./authorization/routes.config');
const BookRouter = require('./app/books/routes.config');
const RackRouter = require('./app/racks/routes.config');
const ReaderRouter = require('./app/readers/routes.config');
const LendingRouter = require('./app/bookLending/routes.config');

app.use(function (req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
        return res.status(200).send();
    } else {
        return next();
    }
})

app.use('*', cloudinaryConfig);
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

AuthorizationRouter.routesConfig(app);
UserRouter.routesConfig(app);
BookRouter.routesConfig(app);
RackRouter.routesConfig(app);
ReaderRouter.routesConfig(app);
LendingRouter.routesConfig(app);

/*Adds the react production build to serve react requests*/
app.use(express.static(path.join(__dirname, '../grand_new_client/build')));
/*React root*/
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '../grand_new_client/build/index.html'));
});

const server = app.listen(config.port, () => {
    console.log('app listening at port %s', config.port);
})