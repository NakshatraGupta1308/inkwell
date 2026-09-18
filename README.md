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

The marketing and download page lives in `website/` as plain HTML and CSS. Deploy it by pointing a Vercel or Netlify project at that folder; no build step is required.
