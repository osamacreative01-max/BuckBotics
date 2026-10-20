# Deploying BUCKBOTICS on Bluehost

The site is a Next.js 16 App Router build. Everything is prerendered except
`/contact`, which uses a **server action** that validates the enquiry, appends
it to a JSONL lead store and optionally POSTs it to a CRM webhook.

**That server action is why the site needs a Node runtime.** A plain static
export is not an option: adding `output: "export"` fails the build with
`Server Actions are not supported with static export`, raised by the `/contact`
action. So the deploy must run Next.js itself.

There are two working paths on Bluehost:

| | Path | Needs |
| --- | --- | --- |
| **A** | cPanel **Setup Node.js App** | Your cPanel must show that tool (Bluehost shared plans that expose it work fine) |
| **B** | Self-managed **VPS / VDS** | Root/SSH; use this if cPanel has no Node.js tool |

---

## Never do this

Uploading the project into `public_html` — which produces the
**403 Forbidden** error — is also a security incident. It exposes:

- `.leads/enquiries.jsonl` — your real captured enquiries (names, emails)
- the full `src/` source and `.env`-style files

There is no `index.html` in a source checkout, so Apache refuses to serve the
directory (403), but individual files remain reachable by direct URL until you
delete them.

**Rule: the app lives outside `public_html`.** The Node app serves the domain;
`public_html` stays empty.

Also never upload `buckbotics.zip` (the 658 MB working archive) — it contains
`node_modules` built for Windows, `.next`, and the `.leads/` lead data.

**Upload this instead:** a clean archive of tracked files only —

```bash
git archive --format=zip -o buckbotics-deploy.zip HEAD
```

`git archive` includes only files committed to git: no `node_modules`, no
`.next`, no `.leads`, no env files. (Or clone on the server: `git clone …`.)

---

## Path A — cPanel "Setup Node.js App"

### 1. Clean up public_html

cPanel → **File Manager** → `public_html` → **Select All → Delete**
(tick "Skip the trash"). Your leads stay safe in the local zip/repo — this only
removes the mistaken upload.

### 2. Upload the clean build source

File Manager → go **one level above** `public_html` into your home directory
(`/home/USER/`) → **New Folder** `buckbotics` → enter it → **Upload**
`buckbotics-deploy.zip` → **Extract**.

Result: `/home/USER/buckbotics/` containing `package.json`, `src/`, `public/`,
`deploy/`, etc. — and `public_html` empty.

### 3. Build on the server

cPanel → **Terminal** (or SSH; enable it under Security → SSH Access if the
app is missing):

```bash
cd ~/buckbotics
npm ci
npm run build
```

`npm ci` installs exactly what `package-lock.json` pins, compiled for the
server's OS. This takes a few minutes on shared hardware.

> No Terminal available? Build locally (`npm run build`) and upload your local
> `.next/` folder alongside the source, then click **Run NPM Install** in the
> Node.js app tool. Server-side build is preferred because `.next` is then
> produced natively for Linux.

### 4. Create the application

cPanel → **Software → Setup Node.js App** → **Create Application**:

| Field | Value |
| --- | --- |
| Application root | `/home/USER/buckbotics` |
| Application URL | `https://www.buckbotics.com` (root domain, **no path**) |
| Application startup file | `deploy/server.js` |
| Application environment | **production** |
| Node.js version | **20 or newer** (Next.js 16 needs ≥ 20.9) |

Notes:

- The startup file is a small wrapper around Next's request handler
  (`deploy/server.js`). It listens on `process.env.PORT`, which the Node.js
  app tool / Passenger always sets, and pins `dir` to the project root so it
  does not depend on the working directory. Behaviour matches `next start` in
  production.
- No path in the URL: the site has no `basePath`, so the app must own the
  whole domain. Prefer `www.` to match the site metadata; set up the
  apex → www redirect in step 6.
- cPanel runs `npm install` when creating the app. If `node_modules` is
  missing, click **Run NPM Install**, then **Restart**.

### 5. Environment variables (optional)

Both are optional — the form works with defaults. See `.env.example`.

Set them either in the app tool's environment-variable editor, or in
`~/buckbotics/.env.local`. For production, keep the lead store **outside** the
app folder so a redeploy cannot wipe it:

```bash
mkdir -p ~/buckbotics-leads
```

```
LEADS_FILE=/home/USER/buckbotics-leads/enquiries.jsonl
# CRM_WEBHOOK_URL=https://hooks.example.com/buckbotics-leads
```

### 6. SSL and domain

- cPanel → **SSL/TLS Status → Run AutoSSL** for `www.buckbotics.com`
  (or issue a Let's Encrypt cert).
- cPanel → **Domains → Redirects**: `buckbotics.com` →
  `https://www.buckbotics.com` (canonical host).
- Make sure DNS A records for the domain point at this server.

### 7. Verify

```bash
curl -sI https://www.buckbotics.com/ | head -1        # 200
curl -sI https://www.buckbotics.com/contact | head -1 # 200
```

Then submit one real enquiry through the form. Success copy reads
"ENQUIRY RECORDED" with a reference like `BB-…`. Confirm it landed:

```bash
tail -n 1 ~/buckbotics-leads/enquiries.jsonl
```

### 8. Updating a release

Upload/extract the new archive over the app folder (or `git pull`), then:

```bash
cd ~/buckbotics
npm ci
npm run build
```

cPanel → Setup Node.js App → **Restart**.

### Troubleshooting

| Symptom | Likely cause |
| --- | --- |
| 403 on the domain | Files were uploaded into `public_html` again — empty it (step 1) |
| App URL shows a Passenger/Node error | `npm run build` not run, so `.next` is missing — run step 3 |
| "app exited" in the app tool log | Wrong startup file (must be `deploy/server.js`) or Node < 20.9 |
| 404s on all pages | Startup file created at the wrong root, or app root ≠ folder you built in |
| Leads missing after a redeploy | `LEADS_FILE` still points inside the app folder — use step 5 |

---

## Path B — Self-managed VPS / VDS

Use this when cPanel has no "Setup Node.js App" tool. You get root/SSH and run
the site exactly as `package.json` describes.

### Prerequisites

- Bluehost Self-Managed VPS or VDS (root/SSH).
- Domain A records pointing at the server IP.
- Node 20+.

### 1. Install Node and PM2

```bash
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo -E bash -
sudo yum install -y nodejs          # AlmaLinux/Rocky; use apt on Ubuntu
sudo npm install -g pm2
```

### 2. Fetch the code

```bash
cd ~
git clone https://github.com/osamacreative01-max/BuckBotics.git buckbotics
cd buckbotics
npm ci --omit=dev
```

### 3. Configure the environment

```bash
cp .env.example .env.local
mkdir -p ~/buckbotics-leads
```

Set `LEADS_FILE=/home/USER/buckbotics-leads/enquiries.jsonl` so a redeploy
cannot delete captured leads. `CRM_WEBHOOK_URL` is optional.

### 4. Build and start

```bash
npm run build
pm2 start deploy/ecosystem.config.cjs
pm2 save
pm2 startup      # run the command it prints, so PM2 survives reboots
```

```bash
curl -I http://127.0.0.1:3000/          # 200
curl -I http://127.0.0.1:3000/contact   # 200
pm2 logs buckbotics
pm2 install pm2-logrotate && pm2 set pm2-logrotate:max_size 10M
```

### 5. Front it with nginx

Edit `deploy/nginx-buckbotics.conf`, replacing every `USER` path:

```bash
sudo cp deploy/nginx-buckbotics.conf /etc/nginx/sites-available/buckbotics
sudo ln -s /etc/nginx/sites-available/buckbotics /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d buckbotics.com -d www.buckbotics.com
```

### 6. Updating a release

```bash
cd ~/buckbotics && git pull && npm ci --omit=dev && npm run build
pm2 restart buckbotics
```

---

## Other hosting options

Anything that runs a Node process works unchanged:

| Host | Notes |
| --- | --- |
| Vercel | Zero config for Next.js; free tier; server actions run as functions |
| Railway / Fly / Render | `npm ci && npm run build`, start `npm start` |
| cPanel Node.js app | Path A above — startup file `deploy/server.js` |
| Any VPS | Path B above: PM2 + nginx |

The one requirement is a persistent Node runtime for the `/contact` action.
