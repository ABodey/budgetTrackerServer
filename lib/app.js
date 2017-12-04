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

app.get('/api/test', (req, res, next) => {
    const { wait, unexpected, validation } = req.query;
    if(wait) {
        setTimeout(() => res.json({ answer: `waited fo ${wait}ms`}), wait);
    }
    else if(unexpected) {
        throw new Error(unexpected);
    }
    else if(validation) {
        next({ code: 400, error: validation });
    }
    else {
        res.json({ answer: 'vanilla response' });
    }
});

const budget = require('./routes/budgets');
app.use(checkDB);
app.use('/api/budgets', budget);

app.use(errorHandler());

module.exports = app;