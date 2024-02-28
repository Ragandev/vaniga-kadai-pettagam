const jwt = require('jsonwebtoken')

module.exports = function( req, res, next ) {
   try {
    const token =req.header('authorization').replace("Bearer ","")

    const decryptToken = jwt.verify(token,process.env.JWT_SECERT_KEY)
    req.body.userId = decryptToken.userId
    next()
   } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      // Token expired
      return res.status(401).json({ message: 'Token expired' });
    } else if (error instanceof jwt.JsonWebTokenError) {
      // Invalid token
      return res.status(401).json({ message: 'Invalid token' });
    } else {
      // Other errors
      return res.status(500).json({ message: error.message });  
    }
  }
}