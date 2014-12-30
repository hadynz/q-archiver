var Q = require('q'),
  fs = require('fs'),
  _ = require('lodash'),
  archiver = require('archiver');

var defaultType = 'zip';

/**
 * Format of bulk config object is the same as what archiver module accepts
 * Ref: https://github.com/ctalkington/node-archiver/blob/master/BULK.md
 */
var defaultBulkOptions = {
  expand: true,
  cwd: '.',
  src: ['**/*', '!node_modules/**', '!resources/tests/**', '!**/*.{psd,pyc}']
};

/**
 * Initialise the Q-Archiver class
 *
 * @constructor
 * @class QArchiver
 */
var QArchiver = function (targetFile, type, bulkOptions) {
  this.targetFile = targetFile;
  this.defaultType = type || defaultType;
  this.bulkOptions = _.defaults({}, defaultBulkOptions, bulkOptions);
};

/**
 * Creates an compressed archive using Q-Promises
 *
 * @module XBMCRelease
 * @class QArchiver
 * @namespace ArabicXBMC
 * @part QArchiver
 * @api
 */
QArchiver.prototype = {

  archive: function () {
    console.log('~~~~~~ DEBUG ~~~~~');
    console.log('this.targetFile', this.targetFile);
    console.log('this.defaultType', this.defaultType);
    console.log('this.bulkOptions', this.bulkOptions);

    var deferred = Q.defer(),
      outputStream = fs.createWriteStream(this.targetFile),
      archive = archiver(this.defaultType);

    outputStream.on('error', deferred.reject);
    outputStream.on('finish', deferred.resolve);

    archive.pipe(outputStream);

    archive
      .bulk(this.bulkOptions)
      .finalize();

    return deferred.promise;
  }

};

module.exports = QArchiver;
