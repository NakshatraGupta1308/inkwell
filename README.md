# inkwell
A themeable desktop notes app with a lightweight code editor, built with Tauri.

## Development

Requires Node.js and Rust (with the Tauri desktop prerequisites for your OS, see the [Tauri docs](https://tauri.app/start/prerequisites/)).

```sh
npm install
npm run tauri dev
```

Notes are saved as plain markdown with a `.ink` extension. Renaming a `.ink` file to `.md` loses nothing; it opens in any text editor or markdown tool.

## Download

Windows builds are published to [GitHub Releases](https://github.com/NakshatraGupta1308/inkwell/releases) whenever a version tag is pushed. macOS and Linux builds are produced by the same workflow as a stretch goal.

## Releasing

Pushing a tag that matches `v*` (for example `v0.1.0`) triggers `.github/workflows/release.yml`, which builds the app on Windows, macOS, and Linux runners and attaches the installers to a draft GitHub Release:

```sh
git tag v0.1.0
git push origin v0.1.0
```

Review the draft release and publish it once the builds look right.

## Website

The marketing and download page lives in `website/` as plain HTML and CSS, no build step required. It deploys automatically to GitHub Pages on every push to `main` that touches `website/`, via `.github/workflows/pages.yml`.

This needs one one-time setting, since a repository does not accept GitHub Actions Pages deployments until it is told to: in the repository's Settings, under Pages, set "Build and deployment" > Source to "GitHub Actions". After that the workflow runs on its own and the site is live at `https://nakshatragupta1308.github.io/inkwell/`.

It can also be deployed to Vercel or Netlify instead, by pointing a project at the `website/` folder; nothing in the site depends on GitHub Pages specifically.

`index.html` links the stylesheet as `styles.css?v=<something>`. Bump that version string whenever `styles.css` changes, since neither GitHub's CDN nor a visitor's browser has any other way to know a same-named file changed, and will otherwise keep serving the old one against the new HTML.
