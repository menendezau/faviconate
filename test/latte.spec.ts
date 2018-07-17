
import 'mocha';
import 'assert'
import {latte} from "../src/latte";
import { expect } from 'chai';
import _isArray = latte._isArray;
import _camelCase = latte._camelCase;
import _isBoolean = latte._isBoolean;
import _isNumber = latte._isNumber;
import _isNumeric = latte._isNumeric;
import _isString = latte._isString;
import _undef = latte._undef;
import _repeat = latte._repeat;
import _zeroPad = latte._zeroPad;
import _zeroFill = latte._zeroFill;
import log = latte.log;
import sprintf = latte.sprintf;
import Color = latte.Color;

describe('Global Functions', function () {

    it('_camelCase', () => {

        expect(_camelCase('hello')).to.be.eq('Hello');
        expect(_camelCase('hello world')).to.be.eq('HelloWorld');
        expect(_camelCase('hello_world')).to.be.eq('HelloWorld');
        expect(_camelCase('hello_world_this_is_me')).to.be.eq('HelloWorldThisIsMe');
        expect(_camelCase(null)).to.be.eq('');
        expect(_camelCase('')).to.be.eq('');

    });

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

    it('_isBoolean', () => {
        expect(_isBoolean(true)).to.be.true;
        expect(_isBoolean(false)).to.be.true;
        expect(_isBoolean(null)).to.be.false;
        expect(_isBoolean(undefined)).to.be.false;
        expect(_isBoolean('')).to.be.false;
        expect(_isBoolean(0)).to.be.false;
        expect(_isBoolean(1)).to.be.false;
        expect(_isBoolean({})).to.be.false;
        expect(_isBoolean([])).to.be.false;
    });

    it('_isNumber', () => {
        expect(_isNumber(0)).to.be.true;
        expect(_isNumber(1)).to.be.true;
        expect(_isNumber(1.1)).to.be.true;
        expect(_isNumber(10E10)).to.be.true;
        expect(_isNumber(Number.MAX_VALUE)).to.be.true;
        expect(_isNumber(Number.MAX_VALUE + 1)).to.be.true;
        expect(_isNumber(NaN)).to.be.true;
        expect(_isNumber(0/1)).to.be.true;
        expect(_isNumber(Infinity)).to.be.true;
        expect(_isNumber('')).to.be.false;
        expect(_isNumber('0')).to.be.false;
        expect(_isNumber('1')).to.be.false;
    });

    it('_isNumeric', () => {
        expect(_isNumeric('0')).to.be.true;
        expect(_isNumeric('100')).to.be.true;
        expect(_isNumeric('100,000')).to.be.false;
        expect(_isNumeric('')).to.be.false;
        expect(_isNumeric(null)).to.be.false;
    });

    it('_isString', () => {
        expect(_isString('')).to.be.true;
        expect(_isString(String(null))).to.be.true;
        expect(_isString(null)).to.be.false;
    });

    it('_isUndef', () => {
        expect(_undef(undefined)).to.be.true;
        expect(_undef(({} as any)['foo'])).to.be.true;
        expect(_undef('')).to.be.false;
    });

    it('_repeat', () => {
        let count1 = 0;
        _repeat(5, () => count1++);
        expect(count1).to.be.equals(5);

        let count2 = 0;
        _repeat(0, () => count2++);
        expect(count2).to.be.equals(0);

        let count3 = 0;
        _repeat(null, () => count3++);
        expect(count3).to.be.equals(0);

    });

    it('_zeroPad', () => {
        expect(_zeroPad(9)).to.be.equals('09');
        expect(_zeroPad(10)).to.be.equals('10');
        expect(_zeroPad(100)).to.be.equals('100');
        expect(_zeroPad(null)).to.be.equals('00');
    });

    it('_zeroFill', () => {
        expect(_zeroFill(2, 9)).to.be.equals('09');
        expect(_zeroFill(3, 9)).to.be.equals('009');
        expect(_zeroFill(3, 100)).to.be.equals('100');
        expect(_zeroFill(5, 100)).to.be.equals('00100');
    });

    it('log', () => {
        expect(log('hi')).to.be.undefined;
        expect(log('hi', 'this', 'is', 'me')).to.be.undefined;
    });

    it('sprintf', () => {
        expect(sprintf('%s', 'a')).to.be.equals('a');
        expect(sprintf('hi %s', 'you')).to.be.equals('hi you');
        expect(sprintf('100% %s', 'sure')).to.be.equals('100% sure');
        expect(sprintf('%s%', 100)).to.be.equals('100%');
    });

});

describe('Color', function () {

    it('Constructor', () => {
        let c = new Color(255, 255, 255);
        expect(c.r).to.be.equals(255);
        expect(c.g).to.be.equals(255);
        expect(c.b).to.be.equals(255);
    });

    it('combine', function () {
        let c = Color.combine(Color.black, Color.white);
        expect(c.r).to.be.equals(128);
        expect(c.g).to.be.equals(128);
        expect(c.b).to.be.equals(128);
    });

    it('should fromHex', function () {
        expect(Color.fromHex('000').equals(Color.black)).to.be.true;
        expect(Color.fromHex('fff').equals(Color.white)).to.be.true;
        expect(Color.fromHex('f00').equals(Color.red)).to.be.true;
        expect(Color.fromHex('00f').equals(Color.blue)).to.be.true;

        expect(Color.fromHex('000000').equals(Color.black)).to.be.true;
        expect(Color.fromHex('0000ff').equals(Color.blue)).to.be.true;

        expect(Color.fromHex('#ffffff').equals(Color.white)).to.be.true;
        expect(Color.fromHex('#FFFFFF').equals(Color.white)).to.be.true;
        expect(Color.fromHex('#FFffFF').equals(Color.white)).to.be.true;
        expect(Color.fromHex('#fFfFfF').equals(Color.white)).to.be.true;
        expect(Color.fromHex('#0000ff').equals(Color.blue)).to.be.true;

    });

    it('should toHex', function () {
        expect(Color.white.toHexString()).to.be.equals('#ffffff');
        expect(Color.red.toHexString()).to.be.equals('#ff0000');
    });

    it('should toString', function () {
        expect(Color.transparent.toString()).to.be.equals('transparent');
        expect(Color.red.fade(100).toString()).to.be.equals('rgba(255, 0, 0, 100)');
    });

});