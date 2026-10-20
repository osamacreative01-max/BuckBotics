/**
 * Production startup file for cPanel's "Setup Node.js App" (and any other
 * Passenger-style host that cannot pass CLI arguments like `next start -p`).
 *
 * cPanel -> Setup Node.js App:
 *   Application root       : /home/USER/buckbotics
 *   Application startup    : deploy/server.js
 *   Application URL        : https://www.buckbotics.com
 *   Application environment: production
 *
 * Behaviour matches `next start` in production:
 *   • `dir` is pinned to the project root so it works no matter what
 *     working directory the host launches it from.
 *   • Listens on process.env.PORT (Passenger/cPanel always set it),
 *     falling back to 3000 for a plain `node deploy/server.js`.
 *
 * Requires a prior `npm run build` — this never starts the dev server.
 */

const path = require("path");

// Resolve NODE_ENV before anything loads Next/React so their production
// builds are picked up at require time.
if (!process.env.NODE_ENV) process.env.NODE_ENV = "production";

const next = require("next");

const dir = path.join(__dirname, "..");
const port = Number(process.env.PORT) || 3000;
const app = next({ dev: false, dir });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  require("http")
    .createServer((req, res) => handle(req, res))
    .listen(port, () => {
      console.log(`> Ready on http://localhost:${port} (dir: ${dir})`);
    });
});
