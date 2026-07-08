/**
 * Post controller.
 * Handles all CRUD operations for the posts resource.
 */

import store from '../data/store.js';
import { paginate } from '../utils/pagination.js';
import { search } from '../utils/search.js';
import { filterByFields, sortByField, selectFields } from '../utils/filter.js';
import { listResponse } from '../utils/response.js';

const FILTERABLE_FIELDS = ['userId'];

/**
 * GET /api/posts
 */
function getAll(req, res) {
  let data = [...store.posts];

  data = filterByFields(data, req.query, FILTERABLE_FIELDS);

  if (req.query.sortBy) {
    data = sortByField(data, req.query.sortBy, req.query.order);
  }

  const { data: paginated, total, skip, limit } = paginate(data, req.query);
  const result = req.query.select ? selectFields(paginated, req.query.select) : paginated;

  res.json(listResponse('posts', result, total, skip, limit));
}

/**
 * GET /api/posts/:id
 */
function getById(req, res) {
  const id = parseInt(req.params.id);
  const post = store.posts.find(p => p.id === id);

  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }

  res.json(post);
}

/**
 * GET /api/posts/search?q=query
 */
function searchPosts(req, res) {
  const q = req.query.q;
  if (!q) {
    return res.status(400).json({ message: 'Search query parameter "q" is required' });
  }

  let data = search(store.posts, q, ['title', 'body']);

  const { data: paginated, total, skip, limit } = paginate(data, req.query);
  const result = req.query.select ? selectFields(paginated, req.query.select) : paginated;

  res.json(listResponse('posts', result, total, skip, limit));
}

/**
 * GET /api/posts/:id/comments
 */
function getPostComments(req, res) {
  const id = parseInt(req.params.id);
  const post = store.posts.find(p => p.id === id);

  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }

  let data = store.comments.filter(c => c.postId === id);

  const { data: paginated, total, skip, limit } = paginate(data, req.query);

  res.json(listResponse('comments', paginated, total, skip, limit));
}

/**
 * GET /api/posts/tag/:tag
 */
function getByTag(req, res) {
  const tag = req.params.tag.toLowerCase();
  let data = store.posts.filter(p => p.tags && p.tags.some(t => t.toLowerCase() === tag));

  const { data: paginated, total, skip, limit } = paginate(data, req.query);

  res.json(listResponse('posts', paginated, total, skip, limit));
}

/**
 * POST /api/posts
 */
function create(req, res) {
  const newPost = {
    id: store.posts.length + 1,
    ...req.body,
    reactions: { likes: 0, dislikes: 0 },
  };

  res.status(201).json(newPost);
}

/**
 * PUT /api/posts/:id
 */
function update(req, res) {
  const id = parseInt(req.params.id);
  const post = store.posts.find(p => p.id === id);

  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }

  const updatedPost = { ...post, ...req.body, id };
  res.json(updatedPost);
}

/**
 * PATCH /api/posts/:id
 */
function patch(req, res) {
  const id = parseInt(req.params.id);
  const post = store.posts.find(p => p.id === id);

  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }

  const patchedPost = { ...post, ...req.body, id };
  res.json(patchedPost);
}

/**
 * DELETE /api/posts/:id
 */
function remove(req, res) {
  const id = parseInt(req.params.id);
  const post = store.posts.find(p => p.id === id);

  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }

  res.json({ ...post, isDeleted: true });
}

export { getAll, getById, searchPosts, getPostComments, getByTag, create, update, patch, remove };
