const express = require("express");
const PORT = process.env.PORT || 3000;
const cookieParser = require("cookie-parser");
const cors = require("cors");

const postRoutes = require("./routes/postRouter.js");
const authRoutes = require("./routes/authRouter.js");
const userRoutes = require("./routes/userRouter.js");
const uploadRoutes = require("./routes/uploadRouter.js");

const app = express();


app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  exposedHeaders: ["set-cookie"] // This might help in some cases
}));


app.use("/api/post",postRoutes);

app.use("/api/user",userRoutes);

app.use("/api/auth",authRoutes);

app.use("/api/uploads",uploadRoutes);

app.listen(PORT,(req,res)=>{
    console.log(`Server has Been Started on ${PORT}`);
})
