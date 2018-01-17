const mysql = require('mysql')
const express = require('express');
const app = express();
const http = require('http')
const path = require('path');
//const flash = require('express-flash-notification');
const cookieParser = require('cookie-parser');
const HoganExpress = require('hogan-express');
const session = require('express-session');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const md5 = require('md5');
const morgan = require('morgan');
const PORT = 3009;
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sender.admlnistrator@gmail.com',
    pass: 'passwordweak'
  }
});
const connection = mysql.createConnection({
    host    : 'localhost',
    user    : 'root',
    password: 'root',
    database: 'sample',
	port: 8889,
})
connection.connect()
app.set('views', path.resolve(path.join(__dirname +'/views')))
app.use(cookieParser('secret'));
app.use(session({
  name: 'user',
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
    path: '/',
    httpOnly: true,
    secure: false
  },
}));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'html');
app.engine('html', HoganExpress)
app.disable('view cache')
app.use(express.static(path.resolve('views/public')));
app.route('/account/update')
    .get(function(req,res){
    if(!req.session.uname){
            res.redirect('/')
        }else{
        const retrieveQuery = 'SELECT * FROM tbl_users where username=?'
         connection.query(retrieveQuery,[req.session.uname],function(err, rows, result){
        if(err) throw err
        res.render('update',{data:rows})
         })  
        }
    })
    .post(function(req,res){
        const username = req.body.Username;
        const retrieveQuery = 'SELECT * FROM tbl_users where username=?'
         connection.query(retrieveQuery,[username],function(err, rows1, result){
            if(err) {
            throw err
            }
             if(rows1.length != 0){
                 if(username == req.session.uname){
                   const updateQuery = 'UPDATE tbl_users set username = ? where username=?'
                     connection.query(updateQuery,[username,req.session.uname],function(err, rows, result){
                    if(err) throw err
                    req.session.uname = username;
                    res.redirect(md5(req.session.uname), '/account/',{data:rows})
                })
                 }else{
                      req.flash('Error','username is already taken please choose another one')       
                 }
                        
            }else{const updateQuery = 'UPDATE tbl_users set username = ? where username=?'
                    connection.query(updateQuery,[username,req.session.uname],function(err, rows, result){
                    if(err) throw err
                    req.session.uname = username;
                    res.redirect(md5(req.session.uname), '/account/',{data:rows})
                })
                 }
         })
})
            

         

app.route('/signup')
    .get(function(req,res){
    res.render('classify')
    })
    .post(function (req, res){
        var gen = Math.floor((Math.random() * 10000) + 1);
        var genString = gen.toString();
        var verCode = md5(genString);
        var email = req.body.Email;
        var username = req.body.Username;
        var pass = md5(req.body.password);
        var userlevel = req.body.accountRole;
        var accountType = req.body.accountType;
        var fname = req.body.fname;
        var lname = req.body.lname;
        var insertQuery = "INSERT INTO tbl_users(username,first_name,last_name,user_email,user_password, user_level,account_type,verification_code) VALUE(?,?,?,?,?,?,?,?)"; 
        const mailOptions = {
              from: 'no-reply@pisara.ph',
              to: email,
              subject: 'Thank you for signing up!',
              text: 'Please click this link to verify your account:',
              html:'<p>Please click <a href="http://localhost:3000/verify/' + verCode + '">here</a> to verify your account</p>'
            };
        const retrieveQuery1 = "SELECT * FROM tbl_users WHERE user_email=?";
        connection.query(retrieveQuery1,[email], function(err,rows){
            if(err) {
                throw err
               console.log(err) 
               
            } 
                console.log(username)
                    if(rows.length != 0){
                        var data = {
                                message : "Email already used, Please register a different email.",
                                status : "Error"
                            }
                            res.render('classify',{data : data});
                    }else{
connection.query(insertQuery,[username,fname,lname,email,pass,userlevel,accountType,verCode],function(error1,rows1){
                        if(error1) throw error1
                        res.redirect('/')
                        transporter.sendMail(mailOptions, function(error, info){
                          if (error) {
                            console.log(error);
                           } else {
                            console.log('Email sent: ' + info.response);
                          }
                        });
                    });
                }
             
        });
            
    });

app.route('/account/:uname')
.get(function(req,res){
    if(md5(req.session.uname) == req.params.uname){
          const retrieveQuery = 'SELECT * FROM tbl_users where username=?'
         connection.query(retrieveQuery,[req.session.uname],function(err, rows, result){
        if(err) throw err
             for(const i in rows){
                req.session.type = rows[i].account_type; 
             }
        res.render('account/'+req.session.type+'_dashboard',{data:rows})
         })
        }else{
        res.redirect('/');
        }
   
})
app.route('/logout')
.get(function(req,res){
    req.session.destroy()
    res.redirect('/')
})
app.route('/admin/:uname')
    .get(function(req,res){
        if(!req.session.uname){
            res.redirect('/')
        }else{
             const retrieveQuery = 'SELECT * FROM tbl_users where username = ?'
         connection.query(retrieveQuery,[req.session.uname],function(err, rows, result){
        if(err) throw err
        res.render('admin',{data:rows})
         }) 
        }   
        })
app.route('/')
    .get(function(req,res){
    if(!req.session.uname){ 
        res.render('Login', { message : 'Welcome!', status : 'noerror'})
    }else{
        res.redirect('/account/' + md5(req.session.uname))
    }
    
})
    .post(function(req, res){
    const username = req.body.Username;
    const password = req.body.Password;
    
    const retrieveQuery = 'SELECT * FROM tbl_users WHERE username=? AND user_password=? LIMIT 1'
    connection.query(retrieveQuery,[username,password], function(err, rows){
        if(err) throw err
       if(rows.length > 0){
           for(const i in rows){
               if(rows[i].user_level == "Admin"){
                   req.session.uname = username;
                  res.redirect('/admin')     
                   }else if(rows[i].user_level == "Learner"){
                       if(rows[i].account_type == "Corporate"){
                       if(rows[i].user_status == 0){
                           var data = {
                                message : "Account not yet verified, Please check your email.",
                                status : "Warning"
                            }
                            res.render('Login',{data : data});
                   }else{
                       req.session.uname = username;
                       res.redirect('/account/' + md5(req.session.uname))
                   }
                   }else if(rows[i].account_type == "Individual"){
                       if(rows[i].user_status == 0){
                        var data = {
                                message : "Account not yet verified, Please check your email.",
                                status : "Warning"
                            }
                            res.render('Login',{data : data});
                   }else{
                       req.session.uname = username;
                       res.redirect('/account/' + md5(req.session.uname))
                   }
                   }
                   
               }else if(rows[i].user_level == "Educator"){
                   if(rows[i].account_type == "Self Employed"){
                   if(rows[i].user_status == 0){
                       var data = {
                                message : "Account not yet verified, Please check your email.",
                                status : "Warning"
                            }
                            res.render('Login',{data : data});
                   }else{
                       req.session.uname = username;
                       res.redirect('/account/' + md5(req.session.uname))
                   }  
               }else if(rows[i].account_type == "Learning Partner"){
                   if(rows[i].user_status == 0){
                       var data = {
                                message : "Account not yet verified, Please check your email.",
                                status : "Warning"
                            }
                            res.render('Login',{data : data});
                   }else{
                        req.session.uname = username;
                        res.redirect('/account/' + md5(req.session.uname))
                   }
               }
           
               }
           }
        }else{
            var data = {
                message : 'Incorrect Username or Password',
                status : 'Incorrect'
            }
            res.render('Login',{data : data});
        }
    });
})

app.get('/verify/:verCode', function(req, res){
    const updateStatus = 1;
    const code = req.params.verCode;
     const updateQuery = 'UPDATE `tbl_users` SET `user_status` = ? WHERE `verification_code`=?'
    const retrieveQuery = 'SELECT * FROM tbl_users WHERE verification_code=?'
    connection.query(retrieveQuery,[code], function(err, rows){
        if(err) throw err
       if(rows.length != 0){
           for(const i in rows){
               if(rows[i].user_status == 1){
                   res.redirect('/');
               }else{
               connection.query(updateQuery,[updateStatus,code], function(err, rows){
        if(err) throw err
           res.redirect('/');
    })
           }
            } 
            }else{
                res.send("No Account Found!")
            }             
})
    
})

app.route('/forgot/:email')
.get(function(req,res){
    const data = req.params.email;
    const retrieveEmail = "SELECT * FROM tbl_users WHERE user_email = ?"
    connection.query(retrieveEmail,[data], function (err, rows){
    if(rows.length !=0){
        for(const x in rows){
            if(rows[x].passwordResetAttempt == 1){
                res.send("The link you requested has already expired")
            }else{
                res.render('resetpass');
            }
        }
    }else{
        res.send('No account found')
    }
    
})
})
.post(function(req,res){
    const data = req.params.email;
    const password = req.body.password;
    const cfmpassword = req.body.cfmpassword;
    const attempt = 1;
    const retrieveEmail = "SELECT * FROM tbl_users WHERE user_email = ?"
    const retrieveQuery = "UPDATE tbl_users SET user_password = ?, passwordResetAttempt = ? WHERE user_email = ? ";
    
    
    connection.query(retrieveEmail,[data], function (err, rows){
        if(rows.length != 0){
            if(password === cfmpassword){
                connection.query(retrieveQuery,[md5(password),attempt,data], function(err,rows){
                    res.redirect('/')
                });
            }else{
                req.flash('Error', 'Password must match')
            }
            
        }else{
            res.send("No Account found");
        }
    })
});


app.route('/forgotp')
.get(function(req,res){    
    res.render('forgotpassword')
})
.post(function(req,res){
    const email = req.body.email;
    
const mailOptions = {
        from: 'pisara@no-reply.com', // sender address
        to: email, // list of receivers
        subject: 'Forgot password', // Subject line
        text: 'You recently requested a new password Please click the link below to complete your request', // plain text body
        html: 'Click this <a href="http://localhost:3000/forgot/'+ email +'">Link</a> to reset your password' // html body
    }
    
    transporter.sendMail(mailOptions, function(Error,info){
        if(Error){
            console.log(Error);
        }else{
            const updateAttempt = 0;
            const update = 'UPDATE tbl_users set passwordResetAttempt = ? WHERE user_email = ?'
            connection.query(update,[updateAttempt,email])
            res.send('A reset link has been sent to your email.')
            console.log("Email sent: " + info.response);
        }
    });
});




http.createServer(app).listen(PORT, function(){
  console.log(
    '[HTTP] running on port %s, with pid: %s', 
    PORT, 
    process.pid
  )
});
