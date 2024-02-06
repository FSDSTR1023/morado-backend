const jwt = require ("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
      res.status(401).send({ error: "No token provided" });
      return;
    }
  
    try {
      const data = await jwt.verify(token, process.env.JWT_SECRET);
      if (!data) {
        res.status(500);
        return;
      }
      req.user = data;
      next();
    } catch (err) {
      res.status(401).send({ error: err.message });
    }
  };

  module.exports = authMiddleware; 


////////////////////////////////////////////////


const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

 

const jwtMiddleware = (req, res, next) => {
  // collect header "Authorization", whichc comes in the form of "Bearer XXXXX...", so we keep the token and discard "Bearer"
  const authHeader = req.headers['authorization'];
 
  if (!authHeader)
    return res.status(401).json({ error: 'Unauthorized MISSING HEADER' });
  const token = authHeader.split(' ')[1];

 

  if (!token)
    return res.status(401).json({ error: 'Unauthorized and missing token' });
 
  let tokenPayload; 
  try {
    // if verify() works, it will return the token payload
    tokenPayload = jwt.verify(token, jwtSecret);
  } catch (error) {
    console.log(error)
    // if it fails, will be because of an invalid token, so we return 401
    return res.status(401).json({ error: 'Unauthorized' });
  }
 
  // store the token data inside req.jwtPayload, so it is accessible in the following req objects when calling next
  req.jwtPayload = tokenPayload;
  next();
};

module.exports = jwtMiddleware