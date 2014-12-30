var QArchiver = require('../lib/q-archiver'),
  chai = require('chai'),
  assert = chai.assert;

describe('q-archiver', function () {

  it('should exist', function () {
    assert.ok(QArchiver);
  });

  it('can be initialized', function () {
    var qArchiver = new QArchiver({});
    assert.ok(qArchiver);
  });

  /*
  it('will fail when an invalid target filename is used', function () {

//    var qArchiver = new QArchiver('/ \0 < > : invalid file name.ext');
    var qArchiver = new QArchiver(__dirname + '/bulk-output.zip', 'zip', { cwd: 'fixtures/', src: ['*.txt'] });

    qArchiver.archive()
      .then(function(){
        console.log('&&&&&&& Sucessful Path! &&&&&&&', arguments);
        expect(true).to.equal(false);
        immediatelyFail();
      })
      .fail(function(error){
        expect(error).to.exist
          .and.be.instanceof(Object);
      })
      .done();
  });
*/

});
