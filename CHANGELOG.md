# Change Log


#### [v2.2.0](https://github.com/kaasdude/gibbons/compare/2.1.0...2.2.0)
> 9 October 2017

* Made available for Windows platform

#### [v2.1.0](https://github.com/kaasdude/gibbons/compare/2.0.3...2.1.0)
> 6 October 2017

* Updated `node_modules`
* Removed gulp scripts in favour of npm scripts
* More unit tests to satisfy more cases (mainly in the default values for method arguments)

#### [v2.0.3](https://github.com/kaasdude/gibbons/compare/2.0.2...2.0.3)
> 11 March 2017

* Removed LokiJSGibbonAdapter from dependencies (this adapter is just an example)

#### [v2.0.2](https://github.com/kaasdude/gibbons/compare/2.0.1...2.0.2)
> 9 March 2017

* Enabled availability of the LokiJS adapter ( sorry (0_o) )

#### [v2.0.1](https://github.com/kaasdude/gibbons/compare/2.0.0...2.0.1)
> 5 March 2017

* Fix link to logo for documentation

#### [v2.0.0](https://github.com/kaasdude/gibbons/compare/1.0.7...2.0.0)
> 5 March 2017

* Made Gibbons dependency free by moving LokiJSGibbonAdapter to the unit tests
* Removed inheritance of EventEmitter (People should decide this for themselves)
* Removed logger injection (Less clutter)
* More documentation
* More unit tests (Together with LokiJS as an use case)
* Added more convenience methods like: `findUsersByPermissio`, `findGroupsByPermission` and `findUsersByGroup`
* LokiJSGibbonAdapter:
  * More try catch wrappers around LokiJS methods (0_o)
  * Removed LokiJS event listeners
  * Optimised `addPermissions` and `addGroups`
  * Changed the behaviour of LokiJSGibbonAdapter `removeGroup` and `removePermission`<br>
    They ensure the related gibbon bits are also set to logical '0' ('Cascaded update')
  

#### [v1.0.7](https://github.com/kaasdude/gibbons/compare/1.0.6...1.0.7)
> 23 February 2017

* Effort to slender the npm package with .npmrc, done.

#### [v1.0.6](https://github.com/kaasdude/gibbons/compare/1.0.5...1.0.6)
> 23 February 2017

* Effort to slender the npm package with .npmrc 

#### [v1.0.5](https://github.com/kaasdude/gibbons/compare/1.0.4...1.0.5)
> 19 February 2017

* Bumped dependencies: `lodash`, and freezed version of `lokijs`
* Decided to stop generating a changelog (Motivation:[Keep a CHANGELOG](http://keepachangelog.com/en/0.3.0/))


#### [v1.0.4](https://github.com/kaasdude/gibbons/compare/1.0.3...1.0.4)
> 4 February 2017

* Generated jsdocs
* Travis CI file
* Switched to github as main repo
* Gibbons logo in


#### [1.0.3](https://github.com/kaasdude/gibbons/compare/1.0.2...1.0.3)
> 26 January 2017

* Trying to get our Gibbons logo in


#### [1.0.2](https://github.com/kaasdude/gibbons/compare/1.0.1...1.0.2)
> 26 January 2017

* Generated jsdocs


#### [1.0.1](https://github.com/kaasdude/gibbons/compare/1.0.0...1.0.1)
> 24 January 2017

* Set theme jsdocs jekyll-theme-cayman


#### 1.0.0
> 24 January 2017

* Release 1.0.0! 
