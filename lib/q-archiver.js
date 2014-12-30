var Q = require('q'),
  fs = require('fs'),
  _ = require('lodash'),
  archiver = require('archiver');

var QArchiver = function (filepath, format, options) {
  if (!_.isString(format)) {
    options = format;
    format = 'zip';
  }

  if (!_.isObject(options)) {
    options = {};
  }

  this.outputStream = this._createWriteStream(filepath);
  this.archive = archiver(format, options);
};

QArchiver.prototype = {

  _createWriteStream: function(filepath) {
    return fs.createWriteStream(filepath);
  },

  bulk: function(mappings) {
    var deferred = Q.defer();

    // Attach listeners to write stream
    this.outputStream.on('error', deferred.reject);
    this.outputStream.on('close', deferred.resolve);

    // Attach stream to Archive instance
    this.archive.pipe(this.outputStream);

    // Bulk archive and trigger finalize
    this.archive
      .bulk(mappings)
      .finalize();

    return deferred.promise;
  }

};

module.exports = QArchiver;
