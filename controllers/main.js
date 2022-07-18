/* 
    Pseudo code
    ============
    1. Get the username and password from req.body
    2. Check if the username and password are provided using (Mongo/Joi/manually in the controller as below)
    3. If provided, create a new JSON Web Token (JWT) else show an error msg asking for credentials.
    4. Send back to the front-end
    5. Setup an authentication mechanism to allow accessing the dashboard for only users with valid JWT.
*/
const CustomError = require("../errors/custom-error");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
    const { username , password } = req.body;
    if(!username || !password){
        throw new CustomError(message="username/password cannot be empty.", statusCode=400);
    }
    // Payload object should not contain any sensetive data, and the smaller, the better.
    // id is for demonstration only, usually get it from the DB
    const id = new Date().getTime();
    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn:'30d' });
    res.status(200).json({ msg: "You have successfully logged in.", token });
}

const dashboard = async(req, res) => {
    const lucky_number = Math.floor(Math.random() * 100);
    res.status(200).json({ msg: `Hello, Alaa.`, secret: `Your lucky number is ${lucky_number}`});
}
module.exports = { login, dashboard };