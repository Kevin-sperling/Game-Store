const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;


const isAdmin = async (req, res, next) => {
    const user = req.user;

    if (!user.is_admin) return res.status(403)
    .json({ error: "You are not an admin to access this resource" });

    next();
}

module.exports = isAdmin
