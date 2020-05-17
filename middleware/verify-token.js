const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header['x-access-token'] || req.body.token || req.query.token;

    if(token) {
       jwt.verify(token, req.app.get('api_secret_key'), (err, decoded) => {
            if(err)
                res.json({ status: false, message: 'Failed you authenticate token' })

            req.decode = decoded;
            console.log(decoded)
            next();
       });

    } else {
        res.json({
            status: false,
            message: 'No token provided'
        })
    }

};

