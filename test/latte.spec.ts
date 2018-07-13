
import 'mocha';
import 'assert'
import {latte} from "../src/latte";
import { expect } from 'chai';
import _isArray = latte._isArray;

describe('Global Functions', function () {

    it('_isArray',  () => {
        expect(_isArray('a')).to.be.false;
        expect(_isArray(null)).to.be.false;
        expect(_isArray(undefined)).to.be.false;
        expect(_isArray({})).to.be.false;
        expect(_isArray({length: 90})).to.be.false;
        expect(_isArray(new Int8Array(1))).to.be.false;
        expect(_isArray(new Int32Array(1))).to.be.false;

        expect(_isArray([])).to.be.true;
        expect(_isArray(Array())).to.be.true;
        expect(_isArray(Array(1), 2)).to.be.false;
        expect(_isArray(Array(1), 1)).to.be.true;

    });

});