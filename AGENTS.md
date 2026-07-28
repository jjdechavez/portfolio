# Repository Guidelines

## Project Structure & Module Organization

This repository contains a hand-written static portfolio site and a small C99
site generator.

- `src/main.c` indexes content fragments and generates HTML pages.
- `src/inc/` contains page and navigation fragments (`*.htm`); edit these when
  changing site content.
- `links/` contains stylesheets and other linked site files.
- `media/` contains images, fonts, icons, data, and downloadable files.
- `index.html` and `404.html` are top-level static entry/error pages.
- `src/build.sh` produces `bin/main` and the generated `site/` directory.

Generated outputs in `bin/` and `site/` are ignored; do not edit or commit them.

## Build, Test, and Development Commands

- `make build` — runs `src/build.sh`, formats `src/main.c` when
  `clang-format` is available, compiles with strict C99 warnings and address /
  undefined-behavior sanitizers, generates the site, and copies assets.
- `./src/build.sh` — direct equivalent of the build target; run it from the
  repository root because paths are relative.
- `make dev` — starts `livereload` against `site/` for local preview; build the
  site first and ensure `livereload` is installed.

There is no automated test framework. Treat a clean `make build` and a manual
browser check of generated pages, navigation, links, images, and both theme
variants as the required verification.

## Coding Style & Naming Conventions

Use tabs in C and follow the existing compact C99 style. Keep compiler warnings
clean; avoid introducing implicit conversions, variable-length arrays, or
undefined behavior. Run `clang-format src/main.c` when making substantial C
changes, while preserving intentional `clang-format off` regions. Name content
fragments in lowercase with underscores for spaces (for example,
`setup_aws_accounts.htm`); generated pages use the corresponding `.html` name.
Use descriptive, lowercase commit and content names.

## Commit & Pull Request Guidelines

Recent commits use short, imperative, lowercase summaries such as `improve
colorscheme` and `harden the images`; follow that convention and keep each
commit focused. Pull requests should explain the user-visible change, list
validation performed (`make build` and manual checks), identify content or
asset changes, and include screenshots for visual changes. Do not include
generated `site/` or `bin/` output.

## Security & Configuration Tips

Do not commit secrets, private keys, or environment files. Review links and
embedded third-party resources when editing content; `netlify.toml` defines the
production build command and publish directory.
