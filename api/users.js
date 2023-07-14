const express = require("express");
require('dotenv').config();
const jwt = require('jsonwebtoken');
const usersRouter = express.Router();
const isAuthed = require("./middleware/isAuthed");
const isAdmin = require("./middleware/isAdmin");

const { getLoginDetails, insertUser } = require("./services/userService");
const { getUserByName, getAllUsers, updateUser, deleteUser, getUserIdByUserame } = require("../db/users");

usersRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res
      .status(400)
      .json({ error: "Username and password are required" });

  try {
    const user = await getLoginDetails(username, password);

    console.log(user, "user")
  
    const token = jwt.sign(
      {
        id: user.id,
        username,
     
      },
      process.env.JWT_SECRET
    );
console.log(user, " is_admin")
    return res.status(200).json({  user, token, })

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
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
    console.log('_user', _user);

    if (_user) {
      res.send({
        error: "Error",
        message: `User ${username} is already taken.`,
        name: "userExistsError",
      });
    } else {
      const user = await insertUser(username, password, email);
      console.log('user_new', JSON.stringify(user, null, 2));

      const token = jwt.sign(
        {
          id: user.id,
          username,
         
        },
        process.env.JWT_SECRET
      );

      console.log(user,"register route")
      res.status(201).send({
        message: "thank you for signing up",
        user: user,
        token,
        email
      });

      // return res.status(201).json({ user });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
});

usersRouter.get("/all", isAuthed, isAdmin, async (req, res) => {
  try {
    const users = await getAllUsers()

    console.log(users, "users")

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

usersRouter.get("/:username", async (req, res, next) => {
  console.log("username route")
  const { username } = req.params;


  try {
    const user = await getUserIdByUserame(username)

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error });
  }
});



module.exports = usersRouter;
