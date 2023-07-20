const router = require("express").Router();

const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const { getUserById } = require("../db/models/users");

router.use(async (req, res, next) => {
  const prefix = "Bearer ";
  const auth = req.header("Authorization");
  if (!auth) {
    // nothing to see here
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const { id } = jwt.verify(token, JWT_SECRET);
      console.log("jwt data", id);
      if (id) {
        req.user = await getUserById(id);
        next();
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  } else {
    next({
      name: "AuthorizationHeaderError",
      message: `Authorization token must start with ${prefix}`,
    });
  }
});

router.get("/health", (req, res, next) => {
  res.send({
    healthy: true,
  });
});

const usersRouter = require("./users");
router.use("/users", usersRouter);

const gamesRouter = require("./games");
router.use("/games", gamesRouter);

const cartRouter = require("./cart");
router.use("/cart", cartRouter);

router.get("/", (req, res, next) => {
  res.send({
    message: "API is under construction!",
  });
});

router.use((req, res, next) => {
  next({
    error: "Error!",
    name: "PageNotFound",
    message: "The page you are looking for is not here",
    status: 404,
  });
});

router.use((error, req, res, next) => {
  let errorStatus = 400;
  if (error.status) {
    errorStatus = error.status;
  }

  res.status(errorStatus).send({
    message: error.message,
    name: error.name,
    error: error.error,
  });
});

module.exports = router;
