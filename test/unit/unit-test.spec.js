// Testing framework: Mocha , assertion style: chai
// See https://mochajs.org/#getting-started on how to write tests
// Use chai for BDD style assertions (expect, should etc..). See move here: https://www.chaijs.com/guide/styles/#expect

// Mocks and spies: sinon
// if you want to mock/spy on fn() for unit tests, use sinon. refer docs: https://sinonjs.org/

// Note on coverage suite used here:
// we use c8 for coverage https://github.com/bcoe/c8. Its reporting is based on nyc, so detailed docs can be found
// here: https://github.com/istanbuljs/nyc ; We didn't use nyc as it do not yet have ES module support
// see: https://github.com/digitalbazaar/bedrock-test/issues/16 . c8 is drop replacement for nyc coverage reporting tool
/*global describe, it*/

import helloWorld from "../../src/index.js";
import * as assert from 'assert';
import * as chai from 'chai';

let expect = chai.expect;

describe('unit Tests', function() {
    it('should return Hello World', function() {
        expect(helloWorld('yo')).to.equal('Hello World yo');
    });

    describe('#indexOf()', function() {
        it('should return -1 when the value is not present', function() {
            expect([1, 2, 3].indexOf(4)).to.equal(-1);
            assert.equal([1, 2, 3].indexOf(4), -1); // or this, but prefer the above syntax
        });
    });
});
