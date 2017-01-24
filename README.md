

[TOC]

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
* `npm install -g gulp`

### Linting ###

For this project [ESLint](http://eslint.org/) is applied. 
 
Execute: `gulp lint`

_Currently the linter conforms to defaults from: [eslint-plugin-node](https://github.com/mysticatea/eslint-plugin-node) and some minor tweaks (see: `.eslint.js`)._

### Unit tests ###

Every path should be covered and can be checked after the unit test is executed, according to a coverage report.

Execute: `gulp test`

In the end, a brief version of the coverage report is shown. For the more extensive one, see: `test/coverage/lcov-report/index.html`.

### API Documentation ###

A Gulp plugin: [gulp-jsdoc3](https://github.com/mlucool/gulp-jsdoc3) is applied to generate the API documentation.

It's expected to write extensive comments in the code itself when contributing.

Every time code is updated, we need to ensure the documentation is in sync with the code.

Execute: `gulp docs`

_The result is generated at: `docs/index.html`_


## Contribution guidelines ##

* When adding new features / code, creating corresponding unit tests are mandatory
* Code review will be done by means of pull requests to the `develop` branch, preferably with the following pull request template:

```
h1. I ensured:
* [ ] I've updated the unit tests and covered enough parts of the code (`gulp lint` and `gulp test`)
* [ ] I've updated the API documentation within the code and generated a fresh export (`gulp docs`)
```

# Meta data #

* Maintainer: Ivo Cazemier
* [Bitbucket](https://bitbucket.org/ivocazemier/gibbons) or [Github](https://github.com/kaasdude/gibbons)
* [API documentation and tutorial](https://kaasdude.github.io/gibbons/)


[![npm version](https://badge.fury.io/js/gibbons.svg)](https://badge.fury.io/js/gibbons)

(License: MIT, See the LICENSE file)
