export default (req, res, next) => {
  const { is_owner } = req.user;

  if (!is_owner) {
    return res.status(401).json({ error: 'Not owner' });
  }

  return next();
};
