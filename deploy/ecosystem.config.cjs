/**
 * PM2 process definition for the BUCKBOTICS site on a self-managed VPS
 * (Bluehost Self-Managed VPS / VDS, or any Linux box with Node).
 *
 * Usage, from the project root on the server:
 *   npm ci --omit=dev && npm run build
 *   pm2 start deploy/ecosystem.config.cjs
 *   pm2 save && pm2 startup   # survive a reboot
 *
 * Logs land in the paths below; rotate them with pm2-logrotate:
 *   pm2 install pm2-logrotate && pm2 set pm2-logrotate:max_size 10M
 */

const path = require("path");

const ROOT = path.join(__dirname, "..");

module.exports = {
  apps: [
    {
      name: "buckbotics",
      // `next start` binds 0.0.0.0 by default; nginx proxies to loopback only.
      script: path.join(ROOT, "node_modules", "next", "dist", "bin", "next"),
      args: "start -p 3000",
      cwd: ROOT,
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      watch: false,
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production",
        PORT: "3000",
        // Absolute path keeps the lead store outside the app tree so a
        // redeploy (rm -rf + git pull) cannot wipe captured leads.
        // LEADS_FILE: "/home/USER/buckbotics-leads/enquiries.jsonl",
        // CRM_WEBHOOK_URL: "https://hooks.example.com/buckbotics-leads",
      },
      error_file: "/home/USER/.pm2/logs/buckbotics-error.log",
      out_file: "/home/USER/.pm2/logs/buckbotics-out.log",
      merge_logs: true,
      time: true,
    },
  ],
};
