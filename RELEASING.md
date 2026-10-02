# Releasing

GitHub Actions runs lint, builds, API docs, tests, and coverage thresholds on pushes to
`master` and pull requests targeting `master`. Pull request commits are checked
against Conventional Commits. This package has no formatting check script.

After push CI succeeds, the Release workflow runs release-please. Conventional
Commits determine the next version and changelog. Release-please opens or updates
a release PR containing `package.json`, `package-lock.json`, `CHANGELOG.md`, and
`.release-please-manifest.json` changes. Merge that PR to create the GitHub release
and tag, publish the package to npm, and deploy TypeDoc docs to GitHub Pages.
Publishing builds and tests the released tag rather than the latest branch tip.

## Repository setup

This pipeline requires no manually created GitHub or npm tokens or secrets.
GitHub supplies a short-lived `GITHUB_TOKEN` for each run, and npm authenticates
publishes through OpenID Connect (OIDC).

Configure the repository as follows:

- Create a GitHub Actions environment named `release`, restricted to `master`.
- In Settings > Actions > General, enable "Allow GitHub Actions to create and
  approve pull requests". Keep default workflow permissions read-only; the release
  job requests the permissions it needs explicitly.
- In npm's settings for `@json-schema-tools/transpiler`, add a GitHub Actions trusted
  publisher: owner `json-schema-tools`, repository `transpiler`, workflow `release.yml`,
  environment `release`, with direct `npm publish` allowed.
- Set GitHub Pages' publishing source to GitHub Actions.

The release job uses Node 22 and npm 11 for trusted publishing. It explicitly
starts CI on release-please PR branches because PR events created with the built-in
workflow token do not trigger workflows automatically. Normal PRs also run commitlint.

Jest enforces global coverage thresholds directly in CI; no external coverage
service or coverage secret is required. After adding tests, run `npm test`, then
`npm run coverage:bump` to raise the thresholds to the latest measured coverage.
Commit any resulting `jest.config.js` changes with the tests. The bump command
uses `coverage/coverage-summary.json` from the preceding test run and never lowers
thresholds.

Update branch protection to require the GitHub Actions test matrix checks in
place of the old CircleCI and `lint` checks. Commitlint runs on normal pull requests,
while release-please PRs receive the explicitly dispatched test matrix. Disable the
project in CircleCI after the migration is merged to stop its external integration.

## Migration baseline

The manifest starts at the existing release `1.10.5`. `bootstrap-sha` points to
that release's commit so the first release PR only includes subsequent changes.
Tags retain the existing bare version format, such as `1.12.0`. After the first
release-please release, its release history supplies the baseline automatically.

The release pipeline is adapted from
[open-rpc-flow](https://github.com/BelfordZ/open-rpc-flow/tree/master/.github/workflows).
