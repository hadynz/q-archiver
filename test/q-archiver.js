var QArchiver = require('../lib/q-archiver'),
  fs = require('fs-extra'),
  chai = require('chai'),
  assert = chai.assert,
  tmp = __dirname + '/tmp',
  zip = require('zipfile');

describe('q-archiver', function () {

  before(function(){
    fs.mkdirsSync(tmp);
  });

  after(function(){
    fs.removeSync(tmp);
  });

  it('should exist', function () {
    assert.ok(QArchiver);
  });

  it('can be initialised if a filepath is provided', function () {
    var qArchiver = new QArchiver('filepath');
    assert.ok(qArchiver);
  });

  it('will throw an exception if filepath is not provided', function () {
    assert.throws(QArchiver, Error);
  });

  describe('bulk', function () {
    var actual;

    before(function(done){
      var filename = tmp + '/bulk-output.zip',
        qArchiver = new QArchiver(filename),
        mappings = [
          { expand: true, cwd: 'test/fixtures/', src: '*' }
        ];

      qArchiver
        .bulk(mappings)
        .then(function(){
          actual = new zip.ZipFile(filename);
          done();
        });
    });

    it('should compress two files', function () {
      assert.equal(actual.count, 2);
      assert.equal(actual.names.length, 2);
    });

  });

});
