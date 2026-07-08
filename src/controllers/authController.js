/**
 * Auth controller.
 * Handles login, token refresh, and current user retrieval.
 */

import jwt from 'jsonwebtoken';
import store from '../data/store.js';

/**
 * POST /api/auth/login
 * Accepts { username, password } and returns JWT tokens + user data.
 */
function login(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: 'Username and password are required.',
    });
  }

  const user = store.users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({
      message: 'Invalid username or password.',
    });
  }

  const tokenPayload = {
    userId: user.id,
    username: user.username,
  };

  const accessToken = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '30m',
  });

  const refreshToken = jwt.sign(tokenPayload, process.env.REFRESH_SECRET, {
    expiresIn: '7d',
  });

  // Return user data without password
  const { password: _, ...safeUser } = user;

  res.json({
    accessToken,
    refreshToken,
    ...safeUser,
  });
}

/**
 * GET /api/auth/me
 * Returns current user data from decoded JWT.
 * Requires verifyToken middleware.
 */
function getMe(req, res) {
  const user = store.users.find(u => u.id === req.user.userId);

  if (!user) {
    return res.status(404).json({ message: 'User not found.' });
  }

  const { password, ...safeUser } = user;
  res.json(safeUser);
}

/**
 * POST /api/auth/refresh
 * Accepts { refreshToken } and returns a new access token.
 */
function refresh(req, res) {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({
      message: 'Refresh token is required.',
    });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);

    const newAccessToken = jwt.sign({ userId: decoded.userId, username: decoded.username }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '30m',
    });

    res.json({
      accessToken: newAccessToken,
      refreshToken,
    });
  } catch (error) {
    return res.status(401).json({
      message: 'Invalid or expired refresh token.',
    });
  }
}

export { login, refresh, getMe };
