const express = require('express');
const app = express();

const morgan = require('morgan');
const redirectHttp = require('./redirect-http')();
const cors = require('cors')();
const checkDB = require('./check-connection')();
const errorHandler = require('./error-handler')();

app.use(morgan('dev'));
app.use(cors);

if(process.env.NODE_ENV === 'production'){
    app.use(redirectHttp);
}
app.use(express.static('./public'));

const budget = require('./routes/budgets');
app.use(checkDB);
app.use('/api/budget', budget);

app.use(errorHandler);

module.exports = app;