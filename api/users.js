const express = require("express");
const usersRouter = express.Router();

const { getLoginDetails } = require("./services/userService");
const { getUserByName, getAllUsers, updateUser, deleteUser } = require("../db/users");

usersRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res
      .status(400)
      .json({ error: "Username and password are required" });

  try {
    const user = await getLoginDetails(username, password);

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

// not able to register through thunder client
usersRouter.post("/register", async (req, res, next) => {
  const { username, password, email } = req.body;

  if (!username || !email || !password)
    return res
      .status(400)
      .json({ error: "Username, password, and email are required" });

  try {
    const _user = await getUserByName(username);

    if (_user) {
      res.send({
        error: "Error",
        message: `User ${username} is already taken.`,
        name: "userExistsError",
      });
    } else {
      const user = await insertUser(username, password, email);

      const token = jwt.sign(
        {
          id: user.id,
          username,
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

usersRouter.get("/", async (req, res, next) => {


  try {
    const users = await getAllUsers()

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

usersRouter.patch(`/:userId`, async (req, res, next) => {
  const { userId } = req.params;
  const { name, password, email, is_admin } = req.body;

  const updateFields = {};

  if (name !== undefined) {
    updateFields.name = name;
  }

  if (password !== undefined) {
    updateFields.password = password;
  }

  if (email !== undefined) {
    updateFields.email = email;
  }

  if (is_admin !== undefined) {
    updateFields.is_admin = is_admin
  }

  try {

    const updatedUser = await updateUser({ id: userId, ...updateFields });

    res.send(updatedUser);

  } catch (error) {
    next(error)
  }

})


usersRouter.delete(`/:userId`, async (req, res, next) => {
  const { userId } = req.params;

  try {

    const deletedUser = await deleteUser(userId)
    res.send(deletedUser)

  } catch (error) {
    next(error)
  }
})

module.exports = usersRouter;
