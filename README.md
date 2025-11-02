# Somanshu Agarwal — Portfolio (Hybrid Balance)

A single-page, Notion-inspired portfolio built with HTML/CSS/Vanilla JS and JSON data files.

## Deploy to Cloudflare Pages (recommended)
1. Create a new repository on GitHub and push this project.
2. Go to Cloudflare Pages -> Create a project -> Connect to your GitHub repo.
3. Set the **Production branch** to `main` (or default branch).
4. Build settings: For static HTML, leave the build command empty and set the build directory to `/`.
5. Click **Save and Deploy** — your site will be live on Cloudflare after deployment finishes.

## Local testing
Run a local static server (recommended to allow fetch of local JSON files):
```bash
# Python 3
python -m http.server 5500
# then open http://localhost:5500 in your browser
```

## How to edit content
- Edit files inside the `data/` folder (profile.json, experience.json, projects.json, skills.json, education.json, hobbies.json).
- Alternatively, open the site and use the Admin (⚙️) panel to edit & save data to localStorage, then export JSON.

## Notes
- Admin edits are saved to localStorage in the browser. To make permanent server changes, update the JSON files on your repo.
- This project has no external dependencies and is fully self-hostable.

