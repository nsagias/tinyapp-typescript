import bcrypt from "bcryptjs";
/**
 * Function authenticate user by user defined password
 * Takes user provide email password and compares synchronisely
 * to password in database
 * @param {string} email
 * @param {string} password
 * @param {object} usersDB
 * @returns {string} returns a user ID if authenticated or undefined if not authenticated
 */
const checkPassword = (email: string, password: string, usersDB: any) => {
  // bcrypt.compareSync(password, hashedPassword);
  for (let user in usersDB) {
    if (usersDB[user].email === email) {
      let storedPassword = usersDB[user].password;
      if (bcrypt.compareSync(password, storedPassword)) {
        return usersDB[user].id;
      }
    }
  }
};


module.exports = { checkPassword };