// const User = require  ("../models/user.model.js");
// const bcrypt = require ("bcryptjs");
// // import { createError } from "../utils/error.js";
// // const jwt = require ("jsonwebtoken");

// const register = async (req, res, next) => {
//   try {
//     const salt = bcrypt.genSaltSync(10);
//     const hash = bcrypt.hashSync(req.body.password, salt);

//     const newUser = new User({
//       ...req.body,
//       password: hash,
//     });

//     await newUser.save();
//     res.status(200).send("User has been created.");
//   } catch (err) {
//     next(err);
//   }
// };

// // const login = async (req, res, next) => {
// //   try {
// //     const user = await User.findOne({ username: req.body.username });
// //     if (!user) return next(createError(404, "User not found!"));

// //     const isPasswordCorrect = await bcrypt.compare(
// //       req.body.password,
// //       user.password
// //     );
// //     if (!isPasswordCorrect)
// //       return next(createError(400, "Wrong password or username!"));

// //     const token = jwt.sign(
// //       { id: user._id, isAdmin: user.isAdmin },
// //       "specialKey"
// //       // process.env.JWT
// //     );

// //     const { password, isAdmin, ...otherDetails } = user._doc;
// //     res
// //       .cookie("access_token", token, {
// //         httpOnly: true,
// //       })
// //       .status(200)
// //       .json({ details: { ...otherDetails }, isAdmin });
// //   } catch (err) {
// //     next(err);
// //   }
// // };


// module.exports = {
//     register,
//     // login
// };

import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import jwt from "jsonwebtoken";
import { authMiddleware } from "./auth.middleware.js";
import { users } from "./users.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Hello World!");
});

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (user) => user.username === username && user.password === password
  );
  if (!user) {
    res.status(401).send({ error: "User not found" });
    return;
  }

  jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET,
    (err, token) => {
      if (err) {
        res.status(401).send({ error: err.message });
      } else {
        res
          .cookie("token", token, {
            httpOnly: true,
            secure: false,
            expires: new Date("2100-12-17T03:24:00"),
          })
          .status(201)
          .send();
        //res.status(201).send({ token });
      }
    }
  );
});

app.post("/api/logout", (_req, res) => {
  res.clearCookie("token").send();
});

app.get("/api/profile", authMiddleware, (req, res) => {
  const user = users.find((user) => user.id === req.user.id);
  res.json({ ...user, password: undefined });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
