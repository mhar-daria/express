var mysql = require('mysql')
var express = require('express')
var app = express()
var http = require('http').Server(app)
var path = require('path')
var bodyParser = require('body-parser')
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'sample',
});
connection.connect()
app.set('port', 3000);
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false})); 
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html');
app.use(express.static(__dirname ,{ index: 'index.html' }));
app.post('/', function(req, res){
    var username = req.body.Username
    var password = req.body.Password
    var data = {
        "Data":""   
    }
    const retrieveQuery = 'SELECT * FROM tbl_users WHERE user_email=? AND user_password=? LIMIT 1'
    connection.query(retrieveQuery,[username,password], function(err, rows){
        if(err) throw err
       if(rows.length != 0){
           for(var i in rows){
               if(rows[i].user_level == 0){
                   data["Data"] = "Admin";
                  res.sendFile(path.join(__dirname + '/admin.html'))
               }else if(rows[i].user_level == 1){
                   data["Data"] = "Individual Account";
            res.sendFile(path.join(__dirname + '/individual.html'))
               }else if(rows[i].user_level == 2){
                   data["Data"] = "Corporate Account";
            res.sendFile(path.join(__dirname + '/corporate.html'))
               }else if(rows[i].user_level == 3){
                   data["Data"] = "Self Employment Instructor";
            res.sendFile(path.join(__dirname + '/selfemploy.html'))
               }else if(rows[i].user_level == 4){
                   data["Data"] = "Learning Partners";
            res.sendFile(path.join(__dirname + '/learnpart.html'))
               }
           }
            
        }else{
            data["Data"] = "Email or password is incorrect.";
            res.json(data);
        }
    });
});

app.listen(app.get('port'))
console.log('Server is running in port: ' + app.get('port'))
