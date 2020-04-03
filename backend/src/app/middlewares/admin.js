import User from '../models/User';

export default async (req, res, next) => {
  const { provider } = await User.findByPk(req.userId);
  if (provider) return res.status(403).json({ error: 'Forbidden' });
  return next();
};
