
<img src="https://raw.githubusercontent.com/kaasdude/gibbons/master/gibbons.png" width="200" />




# Gibbons

_"Leaping from branch to branch gibbons decide which one to take in a split second"_

Gibbons is a Node.js module which helps in managing user groups and user permissions with `bitwise` efficiency. 
In applying [ArrayBuffers](https://developer.mozilla.org/nl/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) and bitwise operations it tries to use minimal resources.


## API Documentation and tutorial

See: [Gibbons Docs](https://kaasdude.github.io/gibbons/)

## How do I get set up? ##

`npm install gibbons`

## Details ##


### Prerequisites to contribute ###

* Clone this repository, and check out the develop branch
* Ensure [Node Version Manager](https://github.com/creationix/nvm) is installed and operational
* `nvm install`

### Linting ###

For this project [ESLint](http://eslint.org/) is applied. 
 
Execute: `npm run lint`

_Currently the linter conforms to defaults from: [eslint-plugin-node](https://github.com/mysticatea/eslint-plugin-node) and some minor tweaks (see: `.eslintrc`)._

### Unit tests ###

Every path should be covered and can be checked after the unit test is executed, according to a coverage report.

Execute: `npm test`

In the end, a brief version of the coverage report is shown. For the more extensive one, see: `test/coverage/lcov-report/index.html`.

### API Documentation ###

[jsdoc](https://www.npmjs.com/package/jsdoc) is applied to generate the API documentation.

It's expected to write extensive comments in the code itself when contributing.

Every time code is updated, we need to ensure the documentation is in sync with the code.

Execute: `npm run docs`

_The result is generated at: `docs/api/index.html`_


## Contribution guidelines ##

* When adding new features / code, creating corresponding unit tests are mandatory
* Code review will be done by means of pull requests to the `develop` branch, preferably with the following pull request template:

```
h1. I ensured:
* [ ] I've updated the unit tests and covered enough parts of the code (`npm run lint` and `npm test`)
* [ ] I've updated the API documentation within the code and generated a fresh export (`npm run docs`)
```

# Changes
[See: Changelog](https://github.com/kaasdude/gibbons/blob/master/CHANGELOG.md)

# Meta data #

* Maintainer: Ivo Cazemier
* [Bitbucket](https://bitbucket.org/ivocazemier/gibbons) or [Github](https://github.com/kaasdude/gibbons)
* [API documentation and tutorial](https://kaasdude.github.io/gibbons/)


[![npm version](https://badge.fury.io/js/gibbons.svg)](https://www.npmjs.com/package/gibbons)
[![David](https://david-dm.org/kaasdude/gibbons.svg)](https://david-dm.org/kaasdude/gibbons)
[![David](https://david-dm.org/kaasdude/gibbons/dev-status.svg)](https://david-dm.org/kaasdude/gibbons#info=devDependencies)
[![Travis CI](https://travis-ci.org/kaasdude/gibbons.svg?branch=master)](https://travis-ci.org/kaasdude/gibbons)
[![Coverage Status](https://coveralls.io/repos/github/kaasdude/gibbons/badge.svg?branch=master)](https://coveralls.io/github/kaasdude/gibbons?branch=master)


(License: MIT, See the LICENSE file)
