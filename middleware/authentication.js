const CustomError = require('../errors');
const { isTokenValid } = require('../utils');

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;

  if (!token) {
  }

  try {
    //
    console.log('token: ', token);
    console.log('isTokenValid: ', isTokenValid({ token }));

    //
    const { name, userId, role } = isTokenValid({ token });
    req.user = { name, userId, role };
    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError('Authentication Invalid');
  }
};

// ...roles: creates an array which contains all arguments passed to the function
// we need a return inside this function so that we can pass arguments
// more details on thes function in video 302
const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(
        'Unauthorized to access this route'
      );
    }
    console.log('admin route');
    next();
  };
};

module.exports = { authenticateUser, authorizePermissions };
