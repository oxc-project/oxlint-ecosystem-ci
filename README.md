# `oxlint` Ecosystem CI

This repository is used to run integration tests for `oxlint` ecosystem projects

## Add a new integration

* Add your repository to [./matrix.json](./matrix.json) and create a PR

## Maintenance

* [Boshen](https://github.com/Boshen) or [Don](https://github.com/donisaac) may actively submit a `oxlint` adjustment PR to your repository if it fails to run correctly.
* Due to maintenance burden, a [sponsorship](https://github.com/sponsors/Boshen) will have a more likely hood of having the PR accepted.

## Scheduled github workflow

Workflows are scheduled to run automatically every day

## Manual github workflow

* open [workflow](https://github.com/oxc-project/oxlint-ecosystem-ci/actions/workflows/ecosystem-ci.yml)
* click 'Run workflow' button on top right of the list
* change `ref` for a different branch

## Local

- `./clone.js` - clones all the repositories
- `./update.js` - updates (git pull) all the repositories
- `./test.js /path/to/oxc/target/release/oxlint ARGS` - run `oxlint`

## Integrated Repositories

See [./matrix.json](./matrix.json).

Notable repositories:

* [rolldown/rolldown](https://github.com/rolldown-rs/rolldown)
* [napi-rs/napi-rs](https://github.com/napi-rs/napi-rs)
* [toeverything/affine](https://github.com/toeverything/affine)
* [preactjs/preact](https://github.com/preactjs/preact)
* [DefinitelyTyped/DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped)

<p align="center">
  <a href="https://github.com/sponsors/Boshen">
    <img src="https://cdn.jsdelivr.net/gh/boshen/sponsors/sponsors.svg" alt="My sponsors" />
  </a>
</p>
