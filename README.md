# Party Night

Seven party games played on everyone’s own phone: Say It Like…, Spyfall, The Real Me, Rapid Fire, Fakeout, Quip Off, Poser.
Static site, no server needed. Works on phones and laptops.

## Playing
The host picks a game on the home screen, reads how it works, then taps Create room to get a 4-letter code.
Everyone else opens the site, types the code and taps Join. The lobby explains the game, and the host can
switch games from there without making a new room. The host's device runs the game, so keep that page open.

## Setup on GitHub (includes the shared prompt bank)

### 1. Put the site in a public repo
1. Create a new **public** repo (e.g. `party-games`).
2. Upload `index.html`, `style.css`, `data.js`, `app.js` and `bank.json` to the **root** of the repo
   (not inside a folder). `bank.json` must exist and contain `[]`.
3. Repo **Settings > Pages > Source: Deploy from a branch**, branch `main`, folder `/ (root)`. Save.
4. After a minute the site is live at `https://YOURNAME.github.io/REPO/`. **Always use this address.**
   The bank only works on a `*.github.io` address (a custom domain turns it into local-only mode).

### 2. Make a token (once, by whoever hosts)
1. GitHub > profile picture > **Settings > Developer settings > Personal access tokens > Fine-grained tokens > Generate new token**.
2. Resource owner: your account. Expiration: pick one (it stops working after this; make a new one then).
3. **Repository access: Only select repositories**, choose this repo.
4. **Permissions > Repository permissions > Contents: Read and write.** Nothing else.
5. Generate and copy the token (starts with `github_pat_`). You can't view it again.

### 3. Give the token to the site
1. Open your `github.io` site, create a room for **The Real Me**.
2. In the lobby, open **Prompt bank**, paste the token, tap **Save token**.
3. The status line should read "saved to GitHub" or "synced with GitHub" once it has connected.
   The token is stored in that browser only; do this on each device you host from.

### 4. How the bank fills up
- Choose **Players write the prompts** when The Real Me starts. When everyone has locked in their questions,
  the host's device adds them to `bank.json` in your repo (you'll see a commit "Add Real Me prompts").
- Only the host needs a token. Players never do.
- Every host on every device then loads the shared bank from the repo when the site opens.
- Without a token the site still reads the bank; new prompts just stay on that one device.

### Troubleshooting (the Prompt bank status line tells you which)
- `GitHub save failed (404)`: the token isn't allowed on this repo, or the repo name/owner doesn't match the URL. Remake the token and select this repo.
- `GitHub save failed (401)` or `(403)`: token expired, or Contents isn't set to Read and write.
- `local only`: you're not on a `*.github.io` address, so nothing syncs.
- `couldn’t load bank.json`: `bank.json` is missing from the repo root.
- Treat the token like a password. It can edit this repo's files. Don't paste it on devices you don't own.

## Notes
- Multiplayer uses PeerJS (free public broker + WebRTC). Strict networks (some school or office Wi-Fi) can block it; cellular usually works.
- Game names, taglines, how-to-play steps and accent colours live in the `META` block at the bottom of `app.js`.
- Edit the lists in `data.js` (one item per line) to add quotes, styles, locations, prompts and categories.
