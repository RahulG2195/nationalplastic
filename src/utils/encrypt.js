async function encryptPassword(password) {
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  } catch (error) {
    console.error("Error encrypting password:", error);
    throw error;
  }
}

module.exports = encryptPassword;
