/**
 * User controller.
 * Handles all CRUD operations for the users resource.
 */

import store from '../data/store.js';
import { paginate } from '../utils/pagination.js';
import { search } from '../utils/search.js';
import { filterByFields, sortByField, selectFields } from '../utils/filter.js';
import { listResponse } from '../utils/response.js';

const FILTERABLE_FIELDS = ['gender', 'age'];

/**
 * Exclude password from a user object.
 */
function sanitizeUser(user) {
  const { password: _password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

/**
 * GET /api/users
 */
function getAll(req, res) {
  let data = store.users.map(sanitizeUser);

  // Apply filters
  data = filterByFields(data, req.query, FILTERABLE_FIELDS);

  // Apply sorting
  if (req.query.sortBy) {
    data = sortByField(data, req.query.sortBy, req.query.order);
  }

  // Apply pagination
  const { data: paginated, total, skip, limit } = paginate(data, req.query);

  // Apply field selection
  const result = req.query.select ? selectFields(paginated, req.query.select) : paginated;

  res.json(listResponse('users', result, total, skip, limit));
}

/**
 * GET /api/users/:id
 */
function getById(req, res) {
  const id = parseInt(req.params.id);
  const user = store.users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json(sanitizeUser(user));
}

/**
 * GET /api/users/search?q=query
 */
function searchUsers(req, res) {
  const q = req.query.q;
  if (!q) {
    return res.status(400).json({ message: 'Search query parameter "q" is required' });
  }

  let data = store.users.map(sanitizeUser);
  data = search(data, q, ['firstName', 'lastName', 'email', 'username']);

  const { data: paginated, total, skip, limit } = paginate(data, req.query);
  const result = req.query.select ? selectFields(paginated, req.query.select) : paginated;

  res.json(listResponse('users', result, total, skip, limit));
}

/**
 * POST /api/users
 */
function create(req, res) {
  const newUser = {
    id: store.users.length + 1,
    ...req.body,
  };

  res.status(201).json(sanitizeUser(newUser));
}

/**
 * PUT /api/users/:id
 */
function update(req, res) {
  const id = parseInt(req.params.id);
  const user = store.users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const updatedUser = { ...user, ...req.body, id };
  res.json(sanitizeUser(updatedUser));
}

/**
 * PATCH /api/users/:id
 */
function patch(req, res) {
  const id = parseInt(req.params.id);
  const user = store.users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const patchedUser = { ...user, ...req.body, id };
  res.json(sanitizeUser(patchedUser));
}

/**
 * DELETE /api/users/:id
 */
function remove(req, res) {
  const id = parseInt(req.params.id);
  const user = store.users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json({ ...sanitizeUser(user), isDeleted: true });
}

/**
 * GET /api/users/:id/posts
 */
function getUserPosts(req, res) {
  const id = parseInt(req.params.id);
  const user = store.users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  let data = store.posts.filter(p => p.userId === id);

  const { data: paginated, total, skip, limit } = paginate(data, req.query);

  res.json(listResponse('posts', paginated, total, skip, limit));
}

/**
 * GET /api/users/:id/todos
 */
function getUserTodos(req, res) {
  const id = parseInt(req.params.id);
  const user = store.users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  let data = store.todos.filter(t => t.userId === id);

  const { data: paginated, total, skip, limit } = paginate(data, req.query);

  res.json(listResponse('todos', paginated, total, skip, limit));
}

export { getAll, getById, searchUsers, create, update, patch, remove, getUserPosts, getUserTodos };
