import { randomUUID } from 'crypto';
import { addMock, getMocks, deleteMock, findMock, getMockCount, MAX_MOCKS_PER_SESSION } from '../data/mockStore.js';

const VALID_METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
const PATH_REGEX = /^[a-zA-Z0-9_\-/]+$/;

/**
 * POST /api/mock
 * Create a new mock endpoint for a session.
 */
function createMock(req, res) {
  const { sessionId, method, path, responseBody } = req.body;

  // Validate required fields
  if (!sessionId || typeof sessionId !== 'string') {
    return res.status(400).json({ message: 'sessionId is required' });
  }
  if (!method || !VALID_METHODS.includes(method.toUpperCase())) {
    return res.status(400).json({ message: `method must be one of: ${VALID_METHODS.join(', ')}` });
  }
  if (!path || typeof path !== 'string') {
    return res.status(400).json({ message: 'path is required' });
  }

  // Normalize path: strip leading slash
  const normalizedPath = path.replace(/^\/+/, '');

  if (!PATH_REGEX.test(normalizedPath)) {
    return res.status(400).json({
      message: 'path may only contain letters, numbers, dashes, underscores, and forward slashes',
    });
  }
  if (!responseBody || typeof responseBody !== 'object') {
    return res.status(400).json({ message: 'responseBody must be a valid JSON object' });
  }

  const mockId = randomUUID();
  const result = addMock(sessionId, {
    mockId,
    method: method.toUpperCase(),
    path: normalizedPath,
    responseBody,
  });

  if (!result.success) {
    return res.status(429).json({ message: result.error });
  }

  return res.status(201).json({
    mockId,
    method: method.toUpperCase(),
    path: normalizedPath,
    responseBody,
    url: `/mock/${sessionId}/${normalizedPath}`,
  });
}

/**
 * GET /api/mock/:sessionId
 * List all mocks for a session.
 */
function listMocks(req, res) {
  const { sessionId } = req.params;
  const mocks = getMocks(sessionId);

  if (mocks === null) {
    // Return empty list if session doesn't exist yet (not an error)
    return res.json({ mocks: [], count: 0, limit: MAX_MOCKS_PER_SESSION });
  }

  return res.json({
    mocks: mocks.map(m => ({
      ...m,
      url: `/mock/${sessionId}/${m.path}`,
    })),
    count: mocks.length,
    limit: MAX_MOCKS_PER_SESSION,
  });
}

/**
 * DELETE /api/mock/:sessionId/:mockId
 * Delete a specific mock.
 */
function removeMock(req, res) {
  const { sessionId, mockId } = req.params;
  const result = deleteMock(sessionId, mockId);

  if (!result.success) {
    return res.status(404).json({ message: result.error });
  }

  const count = getMockCount(sessionId);
  return res.json({ message: 'Deleted', count, limit: MAX_MOCKS_PER_SESSION });
}

/**
 * ALL /mock/:sessionId/*
 * Serve a configured mock response.
 */
function serveMock(req, res) {
  const { sessionId } = req.params;
  // Extract the path after /mock/:sessionId/
  const mockPath = req.params[0] || '';
  const normalizedPath = mockPath.replace(/^\/+/, '');
  const method = req.method.toUpperCase();

  const { sessionFound, mock } = findMock(sessionId, method, normalizedPath);

  if (!sessionFound) {
    return res.status(404).json({ message: 'Session not found' });
  }
  if (!mock) {
    // Check if there's a mock for same path but different method (405)
    const { mock: anyMethodMock } = findMock(sessionId, '*', normalizedPath);

    // Simple check: try all methods
    const METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
    let pathExists = false;
    for (const m of METHODS) {
      const { mock: found } = findMock(sessionId, m, normalizedPath);
      if (found) {
        pathExists = true;
        break;
      }
    }

    if (pathExists) {
      return res.status(405).json({ message: 'Method not allowed for this mock endpoint' });
    }
    return res.status(404).json({ message: 'Mock endpoint not found' });
  }

  return res.status(200).json(mock.responseBody);
}

export { createMock, listMocks, removeMock, serveMock };
