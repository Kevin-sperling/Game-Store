const { getUserByName, createUser } = require("../../db/models/users");
const bcrypt = require("bcrypt");

async function getLoginDetails(userName, password, email) {
  const user = await getUserByName(userName);

  if (!user) throw new Error("User not found");

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) throw new Error("Username or password does not match");

  return user;
}

async function insertUser(username, password, email) {
  return await createUser({
    username,
    password,
    email,
    is_admin: false,
  });
}

module.exports = { insertUser, getLoginDetails };
