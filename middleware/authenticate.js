const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  }

  return res.status(401).json({
    error: "You do not have permission to access this resource",
  });
};

module.exports = isAuthenticated;