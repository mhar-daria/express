const express = require('express');
const app = express();
const http = require('http')
const path = require('path');
const cookieParser = require('cookie-parser');
const HoganExpress = require('hogan-express');
const session = require('express-session');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    host: 'localhost',
    dialect: 'mysql',
    username: 'root',
    password: null,
    database: 'pisara_sequelize',
    logging : false,
});
const newUser = sequelize.define('newUsers',{
    firstName : {
        type : Sequelize.STRING,
        allowNull : false,
        validate:{
          isAlpha : {
              msg : "Please input alphabets only!"
          },
        },
    },  
    lastName :{
        type : Sequelize.STRING,
        allowNull : false,
        validate:{
          isAlpha : {
              msg : "Please input alphabets only!"
          },
        },
    }, 
    userEmail :{
        type : Sequelize.STRING,
        allowNull : false,
        validate : {
            isEmail : {
                msg : "Please Use valid email! "
            }      
        }
    },
        
});

const userInfo = sequelize.define('userInfo',{
    userAge : {
        type : Sequelize.INTEGER,
        allowNull : false,
        validate : {
          isInt :{
              msg : "Please Input numbers only!"
          }  
        },
    },
    userName : {
        type : Sequelize.STRING,
        allowNull : false,
    },
    nickName : {
        type : Sequelize.STRING,
        allowNull : false,
    }
});
userInfo.belongsTo(newUser);
userInfo.sync();
newUser.sync();

newUser.create({
    firstName : "Levy",
    lastName : "Madriaga",
    userEmail : "levy.madriaga0@gmail.com",
}).then(createdUser => {
    userInfo.create({
        userAge : 19,
        userName : createdUser.firstName,
        newUserId : createdUser.id,
        nickName : "LIBAG"
    }).then(createdUserInfo => {
        userInfo.findAll({include : [{
            model : newUser,
        }],
        }).then(allUsers => {
        for(let i in allUsers){
     console.log("ID: " + allUsers[i].newUser.id + " User Name: " + allUsers[i].newUser.firstName + " Nickname: " + allUsers[i].nickName + " Age: " + allUsers[i].userAge );   
        }
       })
    
    })

})



