// Importing bcrypt library
// import { bcrypt } from "bcrypt";

// Function to encrypt password
async function encryptPassword(password) {
  try {
    // Generate a salt
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    // Hash the password with the salt
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  } catch (error) {
    console.error("Error encrypting password:", error);
    throw error;
  }
}

// Exporting the function
module.exports = encryptPassword;
