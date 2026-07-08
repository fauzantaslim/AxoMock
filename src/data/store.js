/**
 * In-memory data store.
 * Loads all mock data from JSON files at require-time.
 * Data is read-only at runtime — CRUD mutations are simulated, not persisted.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const users = JSON.parse(fs.readFileSync(path.join(__dirname, 'users.json'), 'utf-8'));
const posts = JSON.parse(fs.readFileSync(path.join(__dirname, 'posts.json'), 'utf-8'));
const comments = JSON.parse(fs.readFileSync(path.join(__dirname, 'comments.json'), 'utf-8'));
const todos = JSON.parse(fs.readFileSync(path.join(__dirname, 'todos.json'), 'utf-8'));

export default { users, posts, comments, todos };
