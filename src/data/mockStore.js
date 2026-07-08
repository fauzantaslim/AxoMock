/**
 * mockStore.js
 * In-memory store for custom mock sessions.
 * Structure: Map<sessionId, { lastAccessed: Date, mocks: Map<mockId, MockConfig> }>
 *
 * Sessions are automatically cleaned up after 24 hours of inactivity.
 */

const IDLE_TIMEOUT_MS = 24 * 60 * 60 * 1000; // 24 hours
const MAX_MOCKS_PER_SESSION = 10;

// Map<sessionId: string, SessionData>
const sessions = new Map();

/**
 * Get or create a session.
 * @param {string} sessionId
 * @returns {SessionData}
 */
function getOrCreateSession(sessionId) {
  if (!sessions.has(sessionId)) {
    sessions.set(sessionId, {
      lastAccessed: new Date(),
      mocks: new Map(),
    });
  }
  const session = sessions.get(sessionId);
  session.lastAccessed = new Date();
  return session;
}

/**
 * Get a session without creating it.
 * @param {string} sessionId
 * @returns {SessionData | undefined}
 */
function getSession(sessionId) {
  const session = sessions.get(sessionId);
  if (session) {
    session.lastAccessed = new Date();
  }
  return session;
}

/**
 * Add a mock to a session.
 * @param {string} sessionId
 * @param {object} mockConfig - { mockId, method, path, responseBody }
 * @returns {{ success: boolean, error?: string }}
 */
function addMock(sessionId, mockConfig) {
  const session = getOrCreateSession(sessionId);

  if (session.mocks.size >= MAX_MOCKS_PER_SESSION) {
    return { success: false, error: `Session mock limit reached (max ${MAX_MOCKS_PER_SESSION})` };
  }

  session.mocks.set(mockConfig.mockId, {
    ...mockConfig,
    createdAt: new Date(),
  });

  return { success: true };
}

/**
 * Get all mocks for a session as an array.
 * @param {string} sessionId
 * @returns {MockConfig[] | null} null if session not found
 */
function getMocks(sessionId) {
  const session = getSession(sessionId);
  if (!session) return null;
  return Array.from(session.mocks.values());
}

/**
 * Delete a specific mock from a session.
 * @param {string} sessionId
 * @param {string} mockId
 * @returns {{ success: boolean, error?: string }}
 */
function deleteMock(sessionId, mockId) {
  const session = getSession(sessionId);
  if (!session) return { success: false, error: 'Session not found' };
  if (!session.mocks.has(mockId)) return { success: false, error: 'Mock not found' };
  session.mocks.delete(mockId);
  return { success: true };
}

/**
 * Find a specific mock by sessionId + method + path.
 * @param {string} sessionId
 * @param {string} method - uppercase
 * @param {string} path - without leading slash
 * @returns {{ mock?: MockConfig, sessionFound: boolean }}
 */
function findMock(sessionId, method, path) {
  const session = getSession(sessionId);
  if (!session) return { sessionFound: false };

  for (const mock of session.mocks.values()) {
    if (mock.method === method.toUpperCase() && mock.path === path) {
      return { sessionFound: true, mock };
    }
  }

  return { sessionFound: true, mock: null };
}

/**
 * Get mock count for a session.
 * @param {string} sessionId
 * @returns {number}
 */
function getMockCount(sessionId) {
  const session = sessions.get(sessionId);
  return session ? session.mocks.size : 0;
}

// Cleanup idle sessions every hour
setInterval(
  () => {
    const now = Date.now();
    for (const [sessionId, session] of sessions.entries()) {
      if (now - session.lastAccessed.getTime() > IDLE_TIMEOUT_MS) {
        sessions.delete(sessionId);
      }
    }
  },
  60 * 60 * 1000
);

export { getOrCreateSession, getSession, addMock, getMocks, deleteMock, findMock, getMockCount, MAX_MOCKS_PER_SESSION };
