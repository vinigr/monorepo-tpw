module.exports = {
  isTeacher(req, res, next) {
    if (!req.professor) {
      return res.status(403).send({ message: 'Require Teacher Role!' });
    }

    next();
  },

  isAdmin(req, res, next) {
    if (!req.administrador) {
      return res.status(403).send({ message: 'Require Admin Role!' });
    }

    next();
  },
};
