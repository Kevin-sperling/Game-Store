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

function requireAdmin(req, res, next) {

    if (!req.user || !req.user.is_admin) {
        res.send({
            "error": 'test',
            "message": "You must be an admin to perform this action",
            "name": 'test',
        });
        return
    }
    next();
}




module.exports = {
    requireUser,
    requireAdmin,
}