const CustomError = require('../errors');

const checkPermissions = (requestUser, resourceUserId) => {
  console.log('requestUser', requestUser);
  console.log('resourceUserId', resourceUserId);
  //   console.log(typeof resourceUserId);
  if (requestUser.role === 'admin') return;
  if (requestUser.userId === resourceUserId.toString()) return;

  // if User with role admin making the request than continue, or if User is making the request to his own Id than continue

  throw new CustomError.UnauthorizedError(
    'not Autohorized to access this route'
  );
};

module.exports = checkPermissions;
