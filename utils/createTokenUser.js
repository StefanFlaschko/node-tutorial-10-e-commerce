const createTokenUser = (user) => {
  return {
    name: user.name,
    userId: user._id,
    role: user.role,
    geheiminformation: 'lulu',
  };
};

module.exports = createTokenUser;
