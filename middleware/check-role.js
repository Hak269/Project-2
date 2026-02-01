const isAllowed = (roles = [])=> (req, res, next) => {
  if (roles.includes(req.session.user.role)) return next();
  res.redirect("/auth/denied");
};

module.exports = isAllowed;
