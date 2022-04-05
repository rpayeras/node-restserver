const isAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(500).json({
      msg: "This user has not rights for this operation",
    });
  }

  const { role } = req.user;

  if (role !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: "Not authorized",
    });
  }

  next();
};

const hasRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(500).json({
        msg: "This user has not rights for this operation",
      });
    }

    const { role } = req.user;

    if (!roles.includes(role)) {
      return res.status(401).json({
        msg: "Not authorized",
      });
    }

    next();
  };
};

module.exports = {
  isAdmin,
  hasRole,
};
