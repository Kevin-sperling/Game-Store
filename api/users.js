const express = require("express");
const usersRouter = express.Router();

const { getLoginDetails } = require("./services/userService");
const { getUserByName } = require("../db/users");

usersRouter.post("/login", async (req, res, next) => {
  const { userName, password } = req.body;

  if (!userName || !password)
    return res
      .status(400)
      .json({ error: "Username and password are required" });

  try {
    const user = await getLoginDetails(userName, password);

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

// not able to register through thunder client
usersRouter.post("/register", async (req, res, next) => {
  const { userName, password, email } = req.body;

  if (!userName || !email || !password)
    return res
      .status(400)
      .json({ error: "Username, password, and email are required" });

  try {
    const _user = await getUserByName(userName);

    if (_user) {
      res.send({
        error: "Error",
        message: `User ${userName} is already taken.`,
        name: "userExistsError",
      });
    } else {
      const user = await insertUser(userName, password, email);

      const token = jwt.sign(
        {
          id: user.id,
          userName,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: null,
        }
      );

      res.send({
        message: "thank you for signing up",
        user: user,
        token,
      });

      return res.status(201).json({ user });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
});

module.exports = usersRouter;
