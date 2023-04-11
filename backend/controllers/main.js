// main or home controller

module.exports.home = function(req, res){
    res.render('index', { title: 'MEAN Stack Agency..' });
}

module.exports.about = function(req, res){
    res.render('about', { title: 'About' });
}

module.exports.contact = function(req, res){
    res.render('contact',{  title: 'Contact' });
}

module.exports.login = function(req, res){
    res.render('login', { title: 'Login' });
}

module.exports.register = function(req, res){
    res.render('register', { title: 'Register' });
}

module.exports.forgotpassword = function(req, res){
    res.render('forgot-password', { title: 'Forgot Password' });
}




// // my try
// module.exports.loggedin = function(req, res){
//     res.render('logged-in', { title: 'Logged In',  });
// }

// module.exports.registered = function(req, res){
//     res.render('registered', { 
//         title: 'Registered' , 
//         firstname: req.query.firstname,
//         lastname: req.query.lastname,
//         email: req.query.email,
//         password: req.query.password,
//         repeatPassword : req.query.repeatPassword
//     });
// }

// module.exports.loggedin = function(req, res){
//     res.render('loggedin', { title: 'loggedin' });
// }