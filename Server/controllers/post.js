const {db} = require("../db.js");
const jwt = require("jsonwebtoken");



exports.addPost = (req,res) =>{
    const post_id = req.params.id;
    const token = req.cookies.Blog_Jwt_Token;
    console.log(token);
    console.log("Reached add a Post");

    if(!token) return res.status(401).json({message : "Not Authenticated !"});

    jwt.verify(token,"MySecretKey",(err,userInfo) =>{ // userInfo will contain the user data
        console.log(userInfo);
        if(err) return res.status(400).json({message : "Token is Not Valid"});

        console.log(req.body);
        
        const q = "INSERT INTO posts (image,title,description,date,user_id,category) values(?)";
        const values = [
            req.body.image,
            req.body.title,
            req.body.description,
            req.body.date,
            userInfo.id,
            req.body.category
        ]

        db.query(q,[values],(err,data) =>{
            if(err) return res.status(404).json({message : "internal Error"});

            res.status(200).json({message : "Post was Created Successfully"});
        })
    })
}

exports.getPost = (req,res) =>{

    const q = "select p.user_id,u.username,u.image,p.post_id,p.image,p.title,p.description,p.date,p.category from users as u inner join posts as p on u.id = p.user_id WHERE p.post_id = ?";

    db.query(q,[req.params.id], (err,data) =>{
        if(err)  return res.status(400).json({message : err});

        return res.status(200).json({message : data[0]});
    })
}

exports.deletePost = (req,res) =>{
    const post_id = req.params.id;
    const token = req.cookies.Blog_Jwt_Token;
    console.log("Reached deleteing");

    if(!token) return res.status(401).json({message : "Not Authenticated !"});

    jwt.verify(token,"MySecretKey",(err,userInfo) =>{ // userInfo will contain the user data
        if(err) return res.status(400).json({message : "Token is Not Valid"});
        console.log(userInfo);

        const q = "DELETE FROM posts where post_id = ? AND user_id = ?";

        db.query(q,[post_id, userInfo.id],(err,data) =>{
            if(err) return res.status(404).json({message : "Internal Error"});
            console.log(data);

            if (data.affectedRows === 0) {
                return res.status(403).json({ message: "You can delete only your own posts!" });
            }
            
            return res.status(200).json({ message: "Post has been deleted successfully" });
        })
    })
}

exports.updatePost = (req,res) =>{
    const token = req.cookies.Blog_Jwt_Token;
    console.log("Reached Updating");
    if (!token) return res.status(401).json("Not authenticated!");
  
    jwt.verify(token, "MySecretKey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const postId = req.params.id;
      const q =
        "UPDATE posts SET title=?,description=?,image=?,category= ? WHERE post_id = ? AND user_id = ?";
  
      const values = [req.body.title, req.body.description, req.body.image, req.body.category];
  
      db.query(q, [...values, postId, userInfo.id], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json({message : "Post has been updated."});
      });
    });
}

exports.getAllPosts = (req,res) =>{
    console.log("cat ->",req.query.cat);
    const q = req.query.cat ? "SELECT * FROM posts WHERE category = ?" : "SELECT * FROM posts"; //get All Post either based on category or All


    db.query(q,[req.query.cat],(err,data) =>{
        if(err) return res.status(404).json({message : "Internal Error"});

        return res.status(200).json({message : data});
    })
}






