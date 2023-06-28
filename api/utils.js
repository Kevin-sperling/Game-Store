function requireUser(req, res, next) {
    if (!req.user) {
        res.send({
            "error": 'test',
            "message": "You must be logged in to perform this action",
            "name": 'test',
        });
        return
    }

    next();
}

module.exports = {
    requireUser
}