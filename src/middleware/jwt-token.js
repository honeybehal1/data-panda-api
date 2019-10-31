const jwt = require('jsonwebtoken');
const Countries = require('../schemas/Countries');
module.exports = (req, res, next) => {
    try {
        const decoded = jwt.verify(req.headers.authorization, 'data_panda');
        req.userData = decoded;
        next();
    } catch (error) {

        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};

