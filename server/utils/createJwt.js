const jwt = require("jsonwebtoken");
require("dotenv").config();

function createJwt(email, role, username) {
    const jwtToken = jwt.sign({ email, role, username }, process.env.JWT_SECRET);
    return jwtToken;
}
module.exports = createJwt;