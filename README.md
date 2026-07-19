<div align="center">
  <img src="public/images/head-axo.png" alt="Axomock Logo" width="120" />
</div>

<h1 align="center">Axomock</h1>

<p align="center">
  <strong>Mock your API in seconds. No backend needed.</strong>
</p>

<div align="center">
  <a href="https://axomock.fauzantaslim.biz.id">Website</a>
  <span> • </span>
  <a href="https://axomock.fauzantaslim.biz.id/docs">Documentation</a>
  <span> • </span>
  <a href="https://axomock.fauzantaslim.biz.id/mock">Mock Builder</a>
</div>

<br />

> Eliminate the friction between "the backend isn't ready yet" and "I'm ready to build the frontend." Axomock lets you keep moving without waiting.

## 🦎 What is Axomock?

Axomock is a lightning-fast, developer-first tool designed to spin up realistic REST APIs instantly. Inspired by the axolotl's unique regenerative abilities, our mock data is built to be **reset, reshaped, and adjusted anytime** your testing needs change.

Skip the backend boilerplate. Avoid rate-limited public APIs. Just fetch and build.

## ⚡ Fast & Frictionless

We know you want to build UI, not configure fake servers. Axomock works out of the box with `fetch`, `axios`, or your HTTP client of choice.

```javascript
// Just fetch. That's it.
const response = await fetch('https://axomock.fauzantaslim.biz.id/api/users');
const users = await response.json();
console.log(users);
```

## 🛠 Features (Technical & Precise)

We're playful on the outside, but serious about the details. Axomock supports exact schemas, standard HTTP methods, and granular edge-case simulation.

- **Dynamic Endpoints:** Over 1000+ realistic records across Users, Posts, Comments, and Todos.
- **Relational Data:** Test nested structures easily (e.g., `/api/users/1/posts`).
- **Network Latency Simulation:** Append `?delay=2000` to simulate a slow connection and perfect your loading states.
- **HTTP Status Codes:** Need to test a 404 or 500 error? Just hit our `/api/http-status/500` endpoint.
- **Custom Mock Builder:** Need something specific? Spin up a custom endpoint instantly in the browser.

## 📚 Core Resources

Ready to dive in? Here are our primary endpoints:

- [`/api/auth`](https://axomock.fauzantaslim.biz.id/docs/auth) — Simulate JWT login flows.
- [`/api/users`](https://axomock.fauzantaslim.biz.id/docs/users) — Rich user profiles with avatars and relational data.
- [`/api/posts`](https://axomock.fauzantaslim.biz.id/docs/posts) — Tech blog posts, tags, and reactions.
- [`/api/comments`](https://axomock.fauzantaslim.biz.id/docs/comments) — Threads linked to users and posts.
- [`/api/todos`](https://axomock.fauzantaslim.biz.id/docs/todos) — Developer-themed task lists.
- [`/api/http-status`](https://axomock.fauzantaslim.biz.id/docs/http-status) — Test your error boundaries.

## 🤝 Built by Developers, for Developers

We built Axomock because we were tired of waiting on backends and wrestling with clunky local JSON servers. It's designed to be quiet, confident, and incredibly useful.

## 📄 License

MIT
