const bcrypt = require('bcrypt');

async function hashPassword(password) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

async function comparePassword(password, hashedPassword) {
    const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);
    return isPasswordCorrect;
}

module.exports = {
    hashPassword,
    comparePassword,
};
