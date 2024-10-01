const User = require("../models/user")

module.exports.renderSignupForm = (req, res)=>{
    res.render("users/signup.ejs");
};

module.exports.signup = async (req, res) => {
    const { username, email, password } = req.body;
    
    try {
      // Create a new user
      const newUser = new User({ username, email });
      const registeredUser = await User.register(newUser, password);
  
      // Automatically log the user in after registration
      req.login(registeredUser, (err) => {
        if (err) return next(err);
        req.flash("success", "Welcome, you are now registered!");
        res.redirect('/');
      });
    } catch (err) {
      if (err.name === 'UserExistsError') {
        // Handle username conflict
        req.flash('error', 'Username is already taken. Please choose another.');
        return res.redirect('/signup');
      }
      console.error(err);
      req.flash('error', 'Signup failed, please try again.');
      res.redirect('/signup');
    }
  };
  

// module.exports.signup = async (req, res) => {
//     const { username, email, password } = req.body;
  
//     try {
//       // Create a new user
//       const newUser = new User({ username, email });
//       const registeredUser = await User.register(newUser, password);
  
//       // Automatically log the user in after registration
//       req.login(registeredUser, (err) => {
//         if (err) return next(err);
//         res.redirect('/');
//       });
//     } catch (err) {
//       console.error(err);
//       res.render('signup', { errorMessage: 'Signup failed, please try again.' });
//     }
//   };



// module.exports.signup = async(req,res)=>{
//     try {
//         let{username, email, password} = req.body;
//    const newUser= new User ({email,username});
//     const registerUser= await User.register(newUser,password);
//     console.log(registerUser);
//     req.login(registeredUser,(err)=>{
//         if(err){
//             return next (err);
//         }
//         req.flash("success", "user was registered");
//          res.redirect("/listings");
//     })
   
//     }catch (e){
//         req.flash("error", e.message);
//         res.redirect("/signup");
//     }
   
// };

module.exports.renderLoginForm = (req, res)=>{
    res.render("users/login.ejs");
};



module.exports.login = async(req,res)=>{
    req.flash("success","welcome to wanderlust you are logged in ");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logout =  (req,res, next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("succes","you are logged out! ");
        res.redirect("/listings");
    });
};