const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const { getUserByUsername } = require("../../db/users");


// Use this middleware to restrict routes to only users who are logged in
const isAuthed = async (req, res, next) => {

    const prefix = "Bearer ";
    const bearerToken = req.header("Authorization");

    if (!bearerToken) return res.status(401).json({ message: "Access Denied" });

    if (!bearerToken.startsWith(prefix)) return res.status(401).json({
        name: "AuthorizationHeaderError",
        message: `Authorization token must start with ${prefix}`,
    });

    const token = bearerToken.slice(prefix.length);

    console.log(token);

    try {
        const payload = jwt.verify(token, JWT_SECRET);
        const user = await getUserByUsername(payload.username);

        if (!user) return res.status(401).json({ message: "Access Denied" });

        req.user = user;

        console.log(
            '🚀 ~ file: isAuthed.js ~ line 24 ~ isAuthed ~ id',
            req.user
        );

        next();

    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports = isAuthed
