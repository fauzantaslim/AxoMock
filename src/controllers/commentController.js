/**
 * Comment controller.
 * Handles all CRUD operations for the comments resource.
 */

import store from '../data/store.js';
import { paginate } from '../utils/pagination.js';
import { search } from '../utils/search.js';
import { sortByField, selectFields } from '../utils/filter.js';
import { listResponse } from '../utils/response.js';

/**
 * GET /api/comments
 */
function getAll(req, res) {
  let data = [...store.comments];

  if (req.query.sortBy) {
    data = sortByField(data, req.query.sortBy, req.query.order);
  }

  const { data: paginated, total, skip, limit } = paginate(data, req.query);
  const result = req.query.select ? selectFields(paginated, req.query.select) : paginated;

  res.json(listResponse('comments', result, total, skip, limit));
}

/**
 * GET /api/comments/:id
 */
function getById(req, res) {
  const id = parseInt(req.params.id);
  const comment = store.comments.find(c => c.id === id);

  if (!comment) {
    return res.status(404).json({ message: 'Comment not found' });
  }

  res.json(comment);
}

/**
 * GET /api/comments/search?q=query
 */
function searchComments(req, res) {
  const q = req.query.q;
  if (!q) {
    return res.status(400).json({ message: 'Search query parameter "q" is required' });
  }

  let data = search(store.comments, q, ['body']);

  const { data: paginated, total, skip, limit } = paginate(data, req.query);

  res.json(listResponse('comments', paginated, total, skip, limit));
}

/**
 * POST /api/comments
 */
function create(req, res) {
  const newComment = {
    id: store.comments.length + 1,
    ...req.body,
  };

  res.status(201).json(newComment);
}

/**
 * PUT /api/comments/:id
 */
function update(req, res) {
  const id = parseInt(req.params.id);
  const comment = store.comments.find(c => c.id === id);

  if (!comment) {
    return res.status(404).json({ message: 'Comment not found' });
  }

  const updatedComment = { ...comment, ...req.body, id };
  res.json(updatedComment);
}

/**
 * PATCH /api/comments/:id
 */
function patch(req, res) {
  const id = parseInt(req.params.id);
  const comment = store.comments.find(c => c.id === id);

  if (!comment) {
    return res.status(404).json({ message: 'Comment not found' });
  }

  const patchedComment = { ...comment, ...req.body, id };
  res.json(patchedComment);
}

/**
 * DELETE /api/comments/:id
 */
function remove(req, res) {
  const id = parseInt(req.params.id);
  const comment = store.comments.find(c => c.id === id);

  if (!comment) {
    return res.status(404).json({ message: 'Comment not found' });
  }

  res.json({ ...comment, isDeleted: true });
}

export { getAll, getById, searchComments, create, update, patch, remove };
