<h1 align="center">ChatHub Chat App -  RESTfull API</h1>

## Project_Background

ChatHub is a  web-based chat application that aim to connecting people around the world wth one click. Imagine the world right now without communication? so much things that we'll be missed. This App help you to stay in contact with all of your friend, business partner, and beloved person  at anywhere and everywhere!

## Built With

[![Express.js](https://img.shields.io/badge/Express.js-4.17.1-orange.svg?style=rounded-square)](https://expressjs.com/en/starter/installing.html)
[![Node.js](https://img.shields.io/badge/Node.js-v.12.18.2-green.svg?style=rounded-square)](https://nodejs.org/)

## Requirements

1. <a href="https://nodejs.org/en/download/">Node Js</a>
2. Node_modules
3. <a href="https://www.getpostman.com/">Postman</a>
4. Web Server (ex. localhost)
5. <a href="https://www.npmjs.com/package/bcrypt">bcrypt</a>
6. <a href="https://www.npmjs.com/package/jsonwebtoken">JSON Web Token</a>
7. <a href="https://www.npmjs.com/package/multer">multer</a>
8. MySQL
9. <a href="https://www.npmjs.com/package/redis">Redis</a>
10. <a href="https://socket.io/get-started/chat/">Socket.io</a>

## How to run the app ?

1. Open app's directory in CMD or Terminal
2. Type `npm install`
3. Make new file a called **.env**, set up first [here](#set-up-env-file)
4. Turn on Web Server and MySQL can using Third-party tool like xampp, etc.
5. Create a database with the name `onlineshop`, and Import file sql to **phpmyadmin**
6. Open Postman desktop application or Chrome web app extension that has installed before
7. Choose HTTP Method and enter request url.(ex. localhost:3000/)
8. You can see all the end point [here](#end-point)

## Set up .env file

Open .env file on your favorite code editor, and copy paste this code below :

```
#KEYDATABASE
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_DATABASE = chat_app

PORT=3000
```

## End Point

**See Documentation API [Here](https://documenter.getpostman.com/view/12322022/TVYDez2K)**

### License

© [M Faishal Ramadhan](https://github.com/Faishalrmdhn)