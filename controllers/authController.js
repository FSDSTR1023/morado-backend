const User = require  ("../models/user.model.js")

//login user
const loginUser = async (req, res) => {
  const {email, pwd } = req.body

  try{
    const exists = await User.findOne({email})
    if (!exists){
      return res.status(404).json({msg: 'usuario no encontrado, por favor registrate'})
    }
    if (!exists.comparePassword(pwd)) {
      return res.status(400).json({ error: { pwd: 'Invalid Password' } });
    }
      return res.status(200).json({token: exists.generateJWT()})

  } catch (error){

      return res.status(500).json(error)
  }
}

//signup user
const signupUser = async (req, res) => {
  const {nameu, lastName, phone, email, DoB, country, docType, docNum, username, isAdmin, pwd} = req.body

  try {
    const user = await User.signup(nameu, lastName, phone, email, DoB, country, docType, docNum, username, isAdmin, pwd)
    return res.status(200).json({email, user})
  } catch (error){
    return res.status(400).json({error: error.message})
  }
}

module.exports = {
  loginUser,
  signupUser
}














// const User = require  ("../models/user.model.js");
// const bcrypt = require ("bcryptjs");
// import { createError } from "../utils/error.js";
// const jwt = require ("jsonwebtoken");
// const authMiddleware = require ("../middlewares/auth.middleware.js"); 
// const cors = require ('cors')
// const users = require ("../models/user.model.js");

// app.use(
//   cors({
//     origin: "http://localhost:5174",
//     credentials: true,
//   })
// );
// app.use(cookieParser());

// app.post("/api/login", (req, res) => {
//   const { username, password } = req.body;

//   const user = users.find(
//     (user) => user.username === username && user.password === password
//   );
//   if (!user) {
//     res.status(401).send({ error: "User not found" });
//     return;
//   }

//   jwt.sign(
//     { id: user.id, username: user.username },
//     process.env.JWT_SECRET,
//     (err, token) => {
//       if (err) {
//         res.status(401).send({ error: err.message });
//       } else {
//         res
//           .cookie("token", token, {
//             httpOnly: true,
//             secure: false,
//             expires: new Date("2100-12-17T03:24:00"),
//           })
//           .status(201)
//           .send();
//         //res.status(201).send({ token });
//       }
//     }
//   );
// }); 

// app.post("/api/logout", (_req, res) => {
//   res.clearCookie("token").send();
// });

// app.get("/api/profile", authMiddleware, (req, res) => {
//   const user = users.find((user) => user.id === req.user.id);
//   res.json({ ...user, password: undefined });
// });

// module.exports = {
//     register,
//     // login
// };