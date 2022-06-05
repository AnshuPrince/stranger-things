STEP 1 -> Create the project folder and navigate inside your folder in the terminal, after that run the following command: npx express-generator
This will setup the basic project structure for you.

STEP 2 -> Run the following command: npm i

STEP 3 -> Create Database in mysql. Run the following commands: 
mysql -u root -p
CREATE DATABASE stranger_things;
USE stranger_things;
CREATE TABLE table_stange_peoples (
    id INT(11) NOT NULL AUTO_INCREMENT,
    user_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone_no VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
    );
);

//STEP 4 -> Run the following command: npm run start

//STEP 5 -> Execure following inside terminal to register a user

curl --location --request POST 'http://localhost:3000/users/register_strange_user' \
--header 'Content-Type: application/json' \
--data-raw '{
    "userName": "Anshu Prince",
    "email": "princeanshu101.ap@gmail.com",
    "password": "TingIsAwesome",
    "phoneNumber": "+918146879980"
}'
