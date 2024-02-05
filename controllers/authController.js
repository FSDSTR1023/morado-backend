const User = require  ("../models/user.model.js");
// const bcrypt = require ("bcryptjs");
// import { createError } from "../utils/error.js";
const jwt = require ("jsonwebtoken");
const authMiddleware = require ("../middleware/auth.middleware.js"); 
const users = require ("../models/user.model.js");
// const app = require ("../app.js");
const express = require('express');
const router = express.Router();


// app.use(cookieParser());

router.post("/api/login", (req, res) => {
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

router.post("/api/logout", (_req, res) => {
  res.clearCookie("token").send();
}); 

router.get("/api/profile", authMiddleware, (req, res) => {
  const user = users.find((user) => user.id === req.user.id);
  res.json({ ...user, password: undefined });
}); 

module.exports = router;