Q archiver
==========
[![Build Status](https://travis-ci.org/hadynz/q-archiver.svg?branch=master)](https://travis-ci.org/hadynz/q-archiver)

Lightweight asynchronous promise-based wrapper for archive generation.

## About

Promise-based wrapper based on [Q][1] and [Archiver][2] supporting asynchronous archive generation.

## Install

With [npm](http://npmjs.org) do:

```
npm install q-archiver --save
```

## Usage

```javascript
var QArchiver = require('q-archiver'),
  archive = new QArchiver('output.zip');  // Optional archive type parameter can be passed. Defaults to 'zip'

archive
  .bulk([{ expand: true, cwd: 'fixtures/', src: '*' }])
  .then(function(result){
    // Do something with archive file
  })
  .catch(function(){
    // Handle any errors from any of the above steps
  })
  .done();
```

## API

### QArchiver(filepath, [format=zip], [options])
Initialise a `QArchiver` object that will output an archived file in `filepath`. Optional `format` and `options`
are used to internally create an `Archiver` object using its default constructor of
[`Archiver(format, options)`][3].

### .bulk(mappings)
An asynchronous wrapper method for [`Archiver.bulk(mappings`][4] that returns a promise.

## License

MIT

[1]: https://github.com/kriskowal/q
[2]: https://github.com/ctalkington/node-archiver
[3]: https://github.com/ctalkington/node-archiver#archiverformat-options
[4]: https://github.com/ctalkington/node-archiver#bulkmappings
