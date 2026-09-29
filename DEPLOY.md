# Deploying to InMotion (cPanel)

Everything here is for `ibcr.rw` on the InMotion account whose home folder is
`/home/ef35ca5`. Substitute your own if it differs — cPanel shows it on the
right of the main screen under **Home Directory**.

---

## What changes, and why

The site currently on `ibcr.rw` is a folder of static files. That is fine for
pages, but the contact, membership, event-registration and newsletter forms are
**server routes** — there is no file for Apache to send back, so on a static
upload they cannot work at all. Their addresses are:

```
/api/enquiry          /api/membership
/api/newsletter       /api/events/register
```

So the site now runs as a **Node.js application**, which cPanel supports
directly: cPanel → Software → **Setup Node.js App**. Apache still answers the
browser and still terminates SSL; it hands the request to Node behind the
scenes. Nothing about the design, the animations or the URLs changes.

The build in `ibcr-app.zip` already contains the SMTP fix, so the enquiry email
works on the live site with no further editing.

---

## Before you start

- **You have a full cPanel backup.** Good. Nothing in these steps deletes it.
- The old site stays exactly where it is until step 7, and even then it is
  _moved_, not deleted. If anything goes wrong you can put it back in a minute.
- Set aside about 30 minutes. Most of it is one upload and one install.
- Have ready: the mailbox password for `info@ibcr.rw`, and your images.

---

## Step 1 — Confirm where `ibcr.rw` points

cPanel → **Domains**. Find `ibcr.rw` and note its **Document Root**. It is
almost certainly:

```
/home/ef35ca5/ibcr.rw
```

Everything below assumes that. If it says something else, use that path
wherever this guide says `ibcr.rw/`.

---

## Step 2 — Create the Node.js application

cPanel → Software → **Setup Node.js App** → **CREATE APPLICATION**.

| Field                        | Value                                                        |
| ---------------------------- | ------------------------------------------------------------ |
| **Node.js version**          | 22.x — or the highest offered. **It must be 20.9 or newer.** |
| **Application mode**         | `Production`                                                 |
| **Application root**         | `ibcr-app`                                                   |
| **Application URL**          | `ibcr.rw` — leave the path box after it empty                |
| **Application startup file** | `server.js`                                                  |

Click **CREATE**.

Two things happen: an empty folder `/home/ef35ca5/ibcr-app` is created, and
cPanel adds a block to `/home/ef35ca5/ibcr.rw/.htaccess` telling Apache to hand
`ibcr.rw` to that application. Leave that block alone — it is what connects the
two.

> **If the version list stops below 20.9**, stop here and tell me. The site
> cannot run on an older Node. There is a fallback (a static build plus small
> PHP form handlers) and I will prepare it.

cPanel also drops a sample `app.js` into the new folder. Delete it — `server.js`
is the startup file.

---

## Step 3 — Upload the application

1. File Manager → go to `/home/ef35ca5` (the home folder, **not** `ibcr.rw`).
2. **Upload** → `ibcr-app.zip`.
3. Back in `/home/ef35ca5`, select `ibcr-app.zip` → **Extract** → extract into
   `/home/ef35ca5`.

The zip contains a single top-level folder named `ibcr-app`, so its contents
land directly in the application root you just created. You should now see,
inside `/home/ef35ca5/ibcr-app`:

```
.next/           the compiled site — do not edit anything in here
public/          images, video, textures, logos
server.js        the startup file
package.json     what to install
next.config.ts
DEPLOY.md        this file
```

If `.next` is not visible, turn on **Settings → Show Hidden Files (dotfiles)**
in the top right of File Manager. It must be there.

4. Delete `ibcr-app.zip` and the sample `app.js` when the extract is done.

---

## Step 4 — Install the dependencies

Back in **Setup Node.js App**, click the pencil/edit icon on the `ibcr-app` row,
then click **Run NPM Install**.

This reads `package.json` and installs the 97 packages the site needs into the
Node environment cPanel manages for the app. It takes two to five minutes.

Do not upload a `node_modules` folder yourself — cPanel manages that folder for
the app and your copy would be ignored.

---

## Step 5 — Set the mail credentials

Still on the application's page, find **Environment variables** and add these
(**ADD VARIABLE** for each one):

| Name                    | Value                         |
| ----------------------- | ----------------------------- |
| `IBCR_SUBMISSION_EMAIL` | `info@ibcr.rw`                |
| `IBCR_SUBMISSION_FROM`  | `IBCR Website <info@ibcr.rw>` |
| `IBCR_SMTP_HOST`        | `mail.ibcr.rw`                |
| `IBCR_SMTP_PORT`        | `465`                         |
| `IBCR_SMTP_USER`        | `info@ibcr.rw`                |
| `IBCR_SMTP_PASS`        | the mailbox password          |

Click **SAVE**, then **RESTART**.

Those are the settings you proved working locally. Because the site is now on
the same machine as the mailbox, there is a second option that needs no password
at all: set `IBCR_SMTP_HOST` to `localhost` and `IBCR_SMTP_PORT` to `25`, and
delete `IBCR_SMTP_USER` and `IBCR_SMTP_PASS`. Mail is then handed straight to
the server's own mail queue. Try it if the credentials ever give trouble.

(A `.env.local` file placed next to `server.js` works too — `server.js` reads
one if it finds it. The panel is tidier, and survives re-uploads.)

---

## Step 6 — Copy your images in

The build ships with the placeholder artwork only. **Your uploaded photographs
and logos are not in it** — copy them across before the site goes live, or it
will launch showing fallback plates.

They belong in `/home/ef35ca5/ibcr-app/public/images/`, in the same sub-folders
and under the same names as `public/images/README.md` lists:

```
public/images/heroes/        page backgrounds
public/images/board/         board portraits
public/images/members/       member logos
public/images/partners/      partner logos
public/images/opportunities/ sector photographs
public/images/services/      service photographs
public/images/insights/      article images
```

The quickest route: on your computer, zip the `public/images` folder from the
project you have been adding images to, upload the zip into
`/home/ef35ca5/ibcr-app/public/`, and extract it there. Check afterwards that
the path reads `ibcr-app/public/images/board/…` and not
`ibcr-app/public/images/images/board/…`.

Same for `public/video` and `public/brand` if you ever change those.

---

## Step 7 — Switch the domain over

Apache serves a real file if it finds one, and only hands the request to Node
when it does not. The old `index.html` sitting in the document root would
therefore keep being served forever. Move the old site aside:

In File Manager, inside `/home/ef35ca5/ibcr.rw`:

1. Create a folder called `_old-static-site`.
2. **Move** into it: `index.html`, `ibcr-website`, `ibcr-website.zip`,
   `__MACOSX`, `.DS_Store`.
3. **Leave alone**: `.htaccess` (it now points at the Node app), `.well-known`
   (SSL renewal), `cgi-bin`.
4. `ibcr-logo.png` and `ibcr-membership-poster.jpg` — leave them for now. If
   anything links to `https://ibcr.rw/ibcr-logo.png` and it stops working after
   the switch, copy the two files into `ibcr-app/public/` and they will be
   served from there instead.

Then **Setup Node.js App → RESTART**.

---

## Step 8 — Check it

Open these in a private/incognito window (the old site will be in your normal
browser's cache):

```
https://ibcr.rw/                 the globe hero
https://ibcr.rw/about            board section
https://ibcr.rw/membership       five tiers
https://ibcr.rw/members          member directory
https://ibcr.rw/insights         articles
https://ibcr.rw/contact          the form
```

Then send a test enquiry from `/contact` and watch `info@ibcr.rw`.

**The application log** is where the truth is. cPanel shows its path on the
application's page — usually `/home/ef35ca5/logs/ibcr-app.log`. Open it in File
Manager. A successful send writes:

```
[ibcr:submission] emailed info@ibcr.rw over SMTP (mail.ibcr.rw:465)
```

and a failure writes the reason on the same line.

---

## Updating the site later

Each time there are changes:

```bash
npm run build          # compile
npm run deploy:bundle  # writes deploy/ibcr-app.zip
```

Then: upload the zip to `/home/ef35ca5`, extract over the existing folder
(**Overwrite existing files** when asked), and press **RESTART** in Setup
Node.js App.

Your images are untouched by this — the bundle never contains a file with the
same name as one of yours, and extracting only replaces what it carries.
`Run NPM Install` only needs repeating when `package.json` changes.

---

## If something is wrong

| What you see                                       | What it means                                                                                                                    |
| -------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| The old site still shows                           | `index.html` is still in `ibcr.rw/`, or your browser cached it. Try incognito.                                                   |
| **503 Service Unavailable**                        | The app did not start. Read the application log — it names the file and line.                                                    |
| Blank page, or "Could not find a production build" | `.next` did not upload. Turn on hidden files in File Manager and check `ibcr-app/.next/BUILD_ID` exists.                         |
| **Cannot find module 'next'**                      | Step 4 was skipped or failed. Run NPM Install again.                                                                             |
| Pages fine, images missing                         | Step 6. Open the image's URL directly — a 404 means the folder or the filename is wrong. Names are case-sensitive on the server. |
| Form says thank you, no email                      | The log line says why. `535` = wrong mailbox password; timeout = try port `587`, or `localhost`/`25`.                            |
| Everything 404s except the homepage                | The Application URL was created with a sub-path. Edit the app and clear the path box.                                            |
| Site slow on the first hit after an idle hour      | Normal. Passenger stops an idle app and starts it again on the next request, which takes a few seconds.                          |

---

## What is in the bundle, and what is not

**In:** the compiled site (`.next`), everything under `public`, `server.js`,
`next.config.ts`, and a `package.json` pinned to the exact versions this build
was tested against.

**Out:** `node_modules` (cPanel installs its own), the build cache (65 MB the
server never reads), the source code, and anything to do with linting, types or
tooling. The zip is about 12 MB.

`server.js` exists because cPanel starts an app by running one file, rather than
by running `npm start`. It does exactly what `next start` does.
