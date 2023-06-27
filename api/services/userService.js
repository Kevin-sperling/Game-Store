
const {getUserByName, createUser} = require("../../db/users")
const bcrypt = require("bcrypt");

async function getLoginDetails(userName, password){

    const user = await getUserByName(userName);

    if(!user) throw new Error("User not found");

    
const passwordMatch = await bcrypt.compare(password, user.password);

if(!passwordMatch) throw new Error("Username or password does not match");

return user

}


async function insertUser(userName, password){
    await createUser(userName);
}



module.exports  = {insertUser, getLoginDetails}