/**
 * Todo controller.
 * Handles all CRUD operations for the todos resource.
 */

import store from '../data/store.js';
import { paginate } from '../utils/pagination.js';
import { search } from '../utils/search.js';
import { filterByFields, sortByField, selectFields } from '../utils/filter.js';
import { listResponse } from '../utils/response.js';

const FILTERABLE_FIELDS = ['completed', 'userId'];

/**
 * GET /api/todos
 */
function getAll(req, res) {
  let data = [...store.todos];

  data = filterByFields(data, req.query, FILTERABLE_FIELDS);

  if (req.query.sortBy) {
    data = sortByField(data, req.query.sortBy, req.query.order);
  }

  const { data: paginated, total, skip, limit } = paginate(data, req.query);
  const result = req.query.select ? selectFields(paginated, req.query.select) : paginated;

  res.json(listResponse('todos', result, total, skip, limit));
}

/**
 * GET /api/todos/:id
 */
function getById(req, res) {
  const id = parseInt(req.params.id);
  const todo = store.todos.find(t => t.id === id);

  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  res.json(todo);
}

/**
 * GET /api/todos/random
 */
function getRandom(req, res) {
  const randomIndex = Math.floor(Math.random() * store.todos.length);
  res.json(store.todos[randomIndex]);
}

/**
 * GET /api/todos/search?q=query
 */
function searchTodos(req, res) {
  const q = req.query.q;
  if (!q) {
    return res.status(400).json({ message: 'Search query parameter "q" is required' });
  }

  let data = search(store.todos, q, ['todo']);

  const { data: paginated, total, skip, limit } = paginate(data, req.query);

  res.json(listResponse('todos', paginated, total, skip, limit));
}

/**
 * POST /api/todos
 */
function create(req, res) {
  const newTodo = {
    id: store.todos.length + 1,
    todo: req.body.todo || '',
    completed: req.body.completed || false,
    userId: req.body.userId || 1,
  };

  res.status(201).json(newTodo);
}

/**
 * PUT /api/todos/:id
 */
function update(req, res) {
  const id = parseInt(req.params.id);
  const todo = store.todos.find(t => t.id === id);

  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  const updatedTodo = { ...todo, ...req.body, id };
  res.json(updatedTodo);
}

/**
 * PATCH /api/todos/:id
 */
function patch(req, res) {
  const id = parseInt(req.params.id);
  const todo = store.todos.find(t => t.id === id);

  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  const patchedTodo = { ...todo, ...req.body, id };
  res.json(patchedTodo);
}

/**
 * DELETE /api/todos/:id
 */
function remove(req, res) {
  const id = parseInt(req.params.id);
  const todo = store.todos.find(t => t.id === id);

  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  res.json({ ...todo, isDeleted: true });
}

export { getAll, getById, getRandom, searchTodos, create, update, patch, remove };
