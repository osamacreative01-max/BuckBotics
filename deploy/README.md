# Deploying BUCKBOTICS to a Bluehost Self-Managed VPS / VDS

The site is a Next.js 16 App Router build. Everything is prerendered except
`/contact`, which uses a **server action** that validates the enquiry, appends
it to a JSONL lead store and optionally POSTs it to a CRM webhook.

**This is why the site needs a Node runtime.** Bluehost's shared cPanel
"Web Hosting" is a managed PHP/Apache environment with no persistent Node
process, so it cannot host this build. Bluehost supports Node.js on
**Self-Managed VPS** and **VDS** only, where you have root/SSH. That is what
this guide covers.

If you would rather stay on shared cPanel, the alternative is a static export
(`output: "export"`) — but Next.js rejects that while the server action
exists, so the contact form would have to be replaced first.

---

## 0. Prerequisites

- A Bluehost Self-Managed VPS or VDS plan (root/SSH access).
- Your domain `buckbotics.com` pointed at the server's IP (A records).
- Node 20+ (`package.json` targets Next 16 / React 19).

## 1. Install Node and PM2

```bash
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo -E bash -
sudo yum install -y nodejs          # AlmaLinux / Rocky; use apt on Ubuntu
sudo npm install -g pm2
```

Bluehost images vary (AlmaLinux, Rocky or Ubuntu). Use `yum`/`dnf` on the
RPM-based ones and `apt` on Ubuntu/Debian.

## 2. Fetch the code

```bash
cd ~
git clone https://github.com/osamacreative01-max/BuckBotics.git buckbotics
cd buckbotics
npm ci --omit=dev
```

`npm ci` installs exactly what `package-lock.json` pins. `--omit=dev` drops
eslint/typescript, which the running site does not need.

## 3. Configure the environment

```bash
cp .env.example .env.local
```

Both variables are optional — the form works with defaults if you leave them
unset. See the notes in `.env.example`. For a VPS, set `LEADS_FILE` to an
absolute path **outside** the repo so a redeploy cannot delete captured leads:

```bash
mkdir -p ~/buckbotics-leads
```

Then in `.env.local` (or `deploy/ecosystem.config.cjs`):

```
LEADS_FILE=/home/YOURUSER/buckbotics-leads/enquiries.jsonl
```

`CRM_WEBHOOK_URL` is optional: set it to push every lead as JSON into
Zapier/Make/HubSpot or your own endpoint, in addition to the file store.

## 4. Build and start

```bash
npm run build
pm2 start deploy/ecosystem.config.cjs
pm2 save
pm2 startup      # prints a command; run it so PM2 starts on boot
```

Confirm it answers locally before touching nginx:

```bash
curl -I http://127.0.0.1:3000/          # expect HTTP/1.1 200 OK
curl -I http://127.0.0.1:3000/contact   # expect HTTP/1.1 200 OK
```

Logs:

```bash
pm2 logs buckbotics
```

Rotate them so they cannot fill the disk:

```bash
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
```

## 5. Front it with nginx

The Node process listens on loopback only. nginx terminates TLS and proxies
to it. Edit `deploy/nginx-buckbotics.conf`, replacing every `USER` path, then:

```bash
sudo cp deploy/nginx-buckbotics.conf /etc/nginx/sites-available/buckbotics
sudo ln -s /etc/nginx/sites-available/buckbotics /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

Get a free TLS certificate (Bluehost VPS includes Certbot, or install it):

```bash
sudo certbot --nginx -d buckbotics.com -d www.buckbotics.com
```

Certbot rewrites the `server_name` block to redirect `www` → apex (or vice
versa). Pick one canonical host; the site metadata already assumes
`https://www.buckbotics.com`.

## 6. Verify

```bash
curl -sI https://www.buckbotics.com/ | head -1        # 200
curl -sI https://www.buckbotics.com/contact | head -1 # 200
```

Then submit one real enquiry through the form. Success copy reads
"ENQUIRY RECORDED" with a reference like `BB-...`. Check the lead landed:

```bash
tail -n 1 ~/buckbotics-leads/enquiries.jsonl
```

## 7. Updating a release

```bash
cd ~/buckbotics
git pull
npm ci --omit=dev
npm run build
pm2 restart buckbotics
```

Downtime is a few hundred milliseconds; for zero-downtime use
`pm2 reload buckbotics` (only effective once you run `instances: "max"` with
`exec_mode: "cluster"`, which this single-process app does not need).

---

## Why not Bluehost shared hosting

Bluehost's own documentation states Node.js runs on Self-Managed VPS and VDS,
and that their shared Web Hosting is "a managed shared environment, so it is
better suited to workloads that do not require custom Node.js server
configuration." Third-party reports confirm shared cPanel plans do not expose
a Node runtime, and when a host does offer cPanel's Passenger-based "Setup
Node.js App" it is unreliable with Next.js (startup timeouts, port-binding
conflicts with `next start`).

Static export is the usual answer for shared hosting, and it is genuinely
unsupported here: adding `output: "export"` fails the build with
`Server Actions are not supported with static export`, raised by the `/contact`
action. Getting onto shared cPanel would therefore mean replacing the enquiry
form with a mailto: link or a third-party form service, which changes the
lead-handling model your spec specifies ("No external service is contacted
unless the owner configures one").

## Other hosting options

Anything that runs a Node process works unchanged, with no config beyond the
env vars:

| Host | Notes |
| --- | --- |
| Vercel | Zero config for Next.js; free tier. Server actions run as functions. |
| Railway / Fly / Render | `npm ci && npm run build`, start command `npm start`. |
| Any VPS | What this guide describes: PM2 + nginx. |

The one requirement is a persistent Node runtime for the `/contact` action.
