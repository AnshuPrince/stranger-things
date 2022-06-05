var express = require('express');
var router = express.Router();
const mysql = require('mysql2');

// create the connection to database
const rawConnection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root@123', // PLEASE SEE AND ENTER YOUR DATABASE PASSWORD HERE, COMMENT THIS LINE IF PASSWORD IS NOT SET
  database: 'stranger_things',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

//promisifed Connection
const mysqlConnection = rawConnection.promise();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


// REGISTER A USER - COMPLETED FOR DEMONSTRATION PURPOSE
router.post('/register_strange_user', async function(req, res) {
  const requestBody = req.body;
  console.log(requestBody);

  //STEP 1 -> Check if all required information is available or not
  const userName = requestBody.userName;
  const email = requestBody.email;
  const password = requestBody.password;
  const phoneNumber = requestBody.phoneNumber;
  
  if(!userName || !email || !password || !phoneNumber) {
    res.status(400).send({
      message: "Please provide all required information"
    });
    return;
  }

  //STEP 2 -> Check if user already exists inside our database or not (unique email and phone number)
  const query = 'SELECT * FROM table_stange_peoples WHERE email = ? OR phone_no = ?';
  const values = [email, phoneNumber]
  const [users] = await mysqlConnection.execute(query, values);

  if(users.length > 0) {
    res.status(400).send({
      message: "User already exists"
    });
    return;
  }

  //STEP 3 -> Save details of user into database
  const insertQuery = 'INSERT INTO table_stange_peoples (user_name, email, password, phone_no) VALUES (?, ?, ?, ?)';
  const insertValues = [userName, email, password, phoneNumber];
  const [insertResult] = await mysqlConnection.execute(insertQuery, insertValues);

  //STEP 4 -> Return response
  res.status(200).send({message: "User registered successfully"});
});

// LOGIN A USER - COMPLETE THE MISSING PART
router.post('/login_strange_user', async function(req, res) {
  //STEP 1 -> Check if all required information is available or not (email and password)

  //STEP 2 -> Check if user exists inside our database or not AND if password is correct or not

  //STEP 3 -> Create a secret token for user
  const token = "strange_salt" + // USER EMAIL + CURRENT TIME IN UTC

  //STEP 4 -> Save the token into database

  //STEP 5 -> Return response
  res.status(200).send({message: 'User logged in successfully', token: token});
})

module.exports = router;
