// middleware thst proceess the request before it reaches the controller
module.exports = (req, res, next) => {
    if (!req.session.user){
        return res.status(401).json({ message: "Unauthorized, Please log om first"});
    }
    next();
};