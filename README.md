# oxlint-ecosystem ci

This repository is used to run integration tests for oxlint ecosystem projects

## via github workflow

### scheduled

Workflows are scheduled to run automatically every day

### manually

* open [workflow](https://github.com/oxc-project/oxlint-ecosystem-ci/actions/workflows/ecosystem-ci.yml)
* click 'Run workflow' button on top right of the list
* select suite to run in dropdown
* start workflow

## how to add a new integration test

* Add your repository to the test-ecosystem matrix [ecosystem-ci.yml](https://github.com/oxc-project/oxlint-ecosystem-ci/blob/main/.github/workflows/ecosystem-ci.yml)
* Due to maintenance burden, a [sponsorship](https://github.com/sponsors/Boshen) will have a more likely hood of having the PR accepted.
