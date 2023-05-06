const jwt = require('jsonwebtoken');


module.exports = {

    signAccessToken: (userId) => {

        return new Promise((resolve, reject) => {

            const payload = {};
            const secret = "EFEED";
            const options = {
                expiresIn: '1y',
                issuer: 'Darshan_EFEED',
                audience: userId
            };

            jwt.sign(payload, secret, options, (err, token) => {
                if(err){
                    console.log(err.message);
                    reject(err);
                }
                resolve(token);
            })
        })
    },

    verifyAccessToken: (req, res, next) => {

        if(!req.headers['authorization']){
            return next(new Error('Unauthorized'));
        }

        const authHeader = req.headers['authorization'];
        // const baererToken = authHeader.split(" ");
        // const token = baererToken[1];
        const token = authHeader;

        jwt.verify(token, "EFEED", (err, payload) => {
            if(err){
                return next(new Error(err));
            }

            req.payload = payload;
            next();
        });
    }
}