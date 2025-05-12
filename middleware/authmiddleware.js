// middleware thst proceess the request before it reaches the controller
// middleware that checks if the user is authenticated
// This middleware checks if the user is authenticated by checking if the user object exists in the session
// If the user is not authenticated, it sends a 401 Unauthorized response
// If the user is authenticated, it calls the next middleware or route handlerS
module.exports = (req, res, next) => {
    if (!req.session.user){
        return res.status(401).json({ message: "Unauthorized, Please log om first"});
    }
    next();
};