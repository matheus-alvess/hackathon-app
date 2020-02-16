import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  const [, token] = authHeader.split(' ');
  try {
    const { id, is_owner } = await promisify(jwt.verify)(
      token,
      authConfig.secret
    );

    req.user = {
      id,
      is_owner,
    };

    return next();
  } catch (e) {
    if (e.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token Expired' });
    }
    return res.status(401).json({ error: 'Token Invalid' });
  }
};
