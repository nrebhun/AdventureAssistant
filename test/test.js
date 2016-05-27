var assert = require('chai').assert;
var compiledSource = require('../lib/handleDataCompiled.js');

describe('Array', function() {
    describe('#indexOf()', function () {
        it('should return -1 when the value is not present', function () {
            assert.equal(-1, [1,2,3,5,8].indexOf(7));
        });

        it('should return the index when the value is present', function () {
            assert.equal(4, [1,2,3,5,8].indexOf(8));
        });
    });
});