const jwt = require('jsonwebtoken');
const segredo = 'seusecretdetoken';
const notAuth = 401;

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if(!token) return res.status(notAuth).json({message:'missing auth token'});


  try {
    const decoded = jwt.verify(token, segredo);
    if (!decoded) {
      return res
        .status(notAuth)
        .json({ message: 'jwt malformed' });
    }


    req.user = decoded;

    next();
  } catch (err) {
    return res.status(notAuth).json({ message: err.message });
  }
};

