# inkwell
A themeable desktop notes app with a lightweight code editor, built with Tauri.

## Development

Requires Node.js and Rust (with the Tauri desktop prerequisites for your OS, see the [Tauri docs](https://tauri.app/start/prerequisites/)).

```sh
npm install
npm run tauri dev
```

Notes are saved as plain markdown with a `.ink` extension. Renaming a `.ink` file to `.md` loses nothing; it opens in any text editor or markdown tool.
