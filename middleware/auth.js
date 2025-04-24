// const jwt = require('jsonwebtoken');
// const SECRET_KEY = process.env.JWT_SECRET;

// const verifyToken = (req, res, next) => {
//   const authHeader = req.headers['authorization'];

//   const token = authHeader && authHeader.split(' ')[1];

//   if (!token) {
//     return res.status(401).json({ message: 'Access denied. No token provided.' });
//   }

//   try {
//     const decoded = jwt.vPerify(token, SECRET_KEY);
//     req.user = decoded; 
//     next();
//   } catch (err) {
//     res.status(403).json({ message: 'Invalid token.' });
//   }
// };

// module.exports = verifyToken;







const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET;

const verifyToken = async(req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, SECRET_KEY,(err,user)=>{
     req.user = decoded;
    next();
    });
  } catch {
    res.status(403).json({ message: 'Invalid token' });
  }
};

module.exports = verifyToken;

























