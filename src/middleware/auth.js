const jwt = require('jsonwebtoken');
const segredo = 'seusecretdetoken';

module.exports = async (req, res, next) => {
const token = req.headers.authorization

if(!token) return res.status(401).json({message:'missing auth token'})


try {
    const decoded = jwt.verify(token, segredo);
    if (!decoded) {
      return res
        .status(401)
        .json({ message: 'jwt malformed' });
    }


    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

