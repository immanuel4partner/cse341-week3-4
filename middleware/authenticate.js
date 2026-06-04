const isAuthenticated = (req, res, next) => {
  if (req.session.user === undefined) {
    return res.status(401).json({ error: "You do not have permission to access this resource" });
  }
  next();
};

module.exports = isAuthenticated;