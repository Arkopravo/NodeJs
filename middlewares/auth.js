const jwt = require("jsonwebtoken");


function auth(req, res, next) {
    const token = req.cookies.token;
    if(!token) {
        return res.status(401).json({
            message: "unauthorization"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded JWT:', decoded);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({message: "Token is not valid"});
    }
}


module.exports = auth;  