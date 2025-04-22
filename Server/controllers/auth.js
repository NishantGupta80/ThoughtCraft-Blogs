const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {db} = require("../db.js");


exports.login = (req,res) =>{
    // Check If user Exist Or Not

    const q = "SELECT username,password,id FROM users WHERE username = ? ";
    db.query(q,[req.body.username],(err,data) => {
      if(err) return res.status(400).json({message : err});

      if(data.length == 0) return res.status(404).json({message : "User Not Found with this UserName"});


    // If User Exist Check Password is Correct or Not
      const isPasswordCorrect = bcrypt.compareSync(req.body.password,data[0].password);

      if(!isPasswordCorrect) return res.status(404).json({message : "Wrong Password Or Username"});
    

    // If User is Valid create a Token , Sign it With a unique User's Credential such as email or id ( we will Use id as it will help table refrencing in db)
    // when a user will try to delete a post we will check from token the id and then if user is the author , he can delete it !.
       console.log("user Loggin in ->",data[0]);
      const token = jwt.sign({id : data[0].id} , "MySecretKey");

      const  {password , ...other} = data[0]; // we dont want to send Password back in the responose (security Purpose);
      console.log("token ->", token);
      
      // res.cookie('Blog_Jwt_Token',token,{ // adding a Another variable Cookie on reponse Object, so that browser can take it out and store it
      //   httpOnly: true,
      // }).status(200).json({message : other});


      res.cookie('Blog_Jwt_Token', token, {
        httpOnly: true,
        secure: false, // Should be true in production with HTTPS
        sameSite: 'lax', // or 'none' if you need cross-site
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        domain: 'localhost' // Important for local development
      }).status(200).json({ message: other });
      
    })
}


exports.register = (req,res)=>{
  //  check if User already exist ;

   const q = "SELECT * FROM users WHERE username = ? OR email = ?";
    db.query(q,[req.body.username,req.body.email],(err,data) =>{
      if(err) return res.status(404).json({message : err});
      
      if(data.length > 0) return res.status(409).json({message : "User already exist"});

      if(req.body.password != req.body.confirmPassword) return res.status(400).json({message : "Confirm Password Doesn't Match"});

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(String(req.body.password), salt);

      const q = "INSERT INTO users (`username`,`email`,`password`,`image`) VALUES (?)";
      const values = [req.body.username,req.body.email,hash,"UserImage"];

      db.query(q,[values],(err,data) => {
        if(err) return res.status(404).json({message : err});

        console.log("registered ->")

        return res.status(200).json({message : "User has Been Registered Successfully"});
      })
    })
}

exports.logout = (req,res)=>{
  res.cookie('Blog_Jwt_Token',"loggedOut",{
    expires: new Date(Date.now() + 10*1000),
    httpOnly : true
}).status(200).json({message : "User has been logged Out Successfully"})
}
