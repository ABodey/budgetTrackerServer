//eslint-disable-next-line 
module.exports = function createErrorHandler(log = console.log) {

//eslint-disable-next-line 
    return (err, req, res, next) => { 
        let showLog = process.env.NODE_ENV !== 'production';
        let code = 500;
        let error = 'Internal Server Error';

        if (err.code) {
            // by convention, we're passing in an object
            // with a code property === http statusCode
            // and a error property === message to display
            code = err.code;
            error = err.error;
        }
        // Mongoose Validation Error?
        else if (err.name === 'CastError') {
            code = 400;
            error = err.message;
        }
        else if (err.name === 'ValidationError') {
            code = 400;
            error = Object.values(err.errors).map(e => e.message);
        }
        // is this one of our errors?
        // or something unexpected?
        else {
            showLog = false;
            log(err);
        }

        if(showLog) log(code, error);

        res.status(code).json({ error });
    };
};