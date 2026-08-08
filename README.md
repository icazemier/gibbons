
<img src="https://raw.githubusercontent.com/icazemier/gibbons/main/gibbons.png" width="200" />




# Gibbons

_"Leaping from branch to branch gibbons decide which one to take in a split second"_

Gibbons is a Node.js module which helps in managing user groups and user permissions with `bitwise` efficiency.
In applying [ArrayBuffers](https://developer.mozilla.org/nl/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) and bitwise operations it tries to use minimal resources.

## API Documentation and tutorial

See: [Gibbons Docs](https://icazemier.github.io/gibbons/)

## Runtime Compatibility

| Runtime | Support | Install |
|---------|---------|---------|
| Node.js 20+ | ✅ Native | `npm install @icazemier/gibbons` |
| Bun | ✅ Native | `bun add @icazemier/gibbons` |
| Deno | ✅ via `npm:` | See below |

### Deno

```typescript
import { Gibbon, GibbonProcessor } from "npm:@icazemier/gibbons";
```

Run with the required permissions:

```bash
deno run --allow-env --allow-net --allow-read --allow-sys your-script.ts
```

## How do I get set up? ##

`npm install @icazemier/gibbons`

# Changes

See: [CHANGELOG.md](CHANGELOG.md) and [GitHub Releases](https://github.com/icazemier/gibbons/releases)

# Releasing

Releases run on [changesets](https://github.com/changesets/changesets). Any change that should reach users ships with a changeset describing it:

```bash
npm run changeset
```

Pick the bump type, write a one-line summary, and commit the generated file in `.changeset/` alongside your change. Merging into a release branch applies every pending changeset, commits the version bump and changelog, and publishes to npm and JSR.

Prerelease mode follows the branch automatically, so there is nothing to remember: releases from `main` are stable versions on the `latest` dist-tag, and releases from `development` land on `beta`. The release scripts run `scripts/pre-mode.mjs` first, which enters or leaves changesets' prerelease mode to match.

Publishing uses the runner's own npm with OIDC trusted publishing, so no npm token is stored in the repository. Both registries are then asserted to actually serve the released version, because publishing is idempotent and a green publish step on its own proves nothing.

# Meta data #

* Maintainer: Ivo Cazemier
* [Github](https://github.com/icazemier/gibbons)
* [API documentation and tutorial](https://icazemier.github.io/gibbons/)


[![npm version](https://badge.fury.io/js/@icazemier%2Fgibbons.svg)](https://badge.fury.io/js/@icazemier%2Fgibbons)




(License: MIT, See the LICENSE file)
