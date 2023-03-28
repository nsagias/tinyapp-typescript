
/**
 * Function to used to create a new user
 * @param {string} id
 * @param {string} name
 * @param {string} email
 * @param {string} password
 * @param {object} userDB
 * @returns {object} enters the new user into the database "userDB"
 */
const createUser = (id:any, name: string, email:string, password:string, userDB: any) => {
  return userDB[id] = {
    id: id,
    name: name,
    email: email,
    password: password
  };
};


/**
 * Function to confirm user in database
 * used to avoid duplicate user creation
 * @param {string} userEmail
 * @param {object} usersDB
 * @returns {boolean or undefined} true if user in database or undefined
 */
const findUserByEmail = (userEmail: string, usersDB: any) => {
  for (let user in usersDB) {
    if (usersDB[user].email === userEmail) {
      return true;
    }
  }
  return undefined;
};

module.exports = {
  createUser,
  findUserByEmail
};