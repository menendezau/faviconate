
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
import Eventable = latte.Eventable;

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
        expect(_isNumber(1/0)).to.be.true;
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
        expect(_zeroFill(2, 1000000)).to.be.equals('1000000');
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

describe('Eventable', function(){

    it('should trigger only once', function () {
        let e = new Eventable();
        let flag = 0;
        let name = 'something';
        let f = () => flag++;
        e.on(name, f);
        e.raise(name);
        expect(flag).to.be.equals(1);
    });

    it('should trigger three times', function () {
        let e = new Eventable();
        let flag = 0;
        let name = 'something';
        let f = () => flag++;
        e.on(name, f);
        e.on(name, f);
        e.on(name, f);
        e.raise(name);
        expect(flag).to.be.equals(3);
    });

});

describe('Color', function () {

    it('should combine', function () {
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
        expect(Color.fromHex('#00000000').equals(Color.transparent)).to.be.true;

        expect(() => Color.fromHex('090909090909090')).to.throw();
        expect(() => Color.fromHex(1 as any)).to.throw();

    });

    it('should cmykToRgb', function () {
        expect(Color.cmykToRgb(1, .25, 0, 0)).to.deep.equal([0, 191, 255]);
    });

    it('should hsvToRgb', function () {
        expect(Color.hsvToRgb(240, 1, 1)).to.deep.equal([0, 0, 255]);
        expect(Color.hsvToRgb(0, 0, 0)).to.deep.equal([0, 0, 0]);
        expect(Color.hsvToRgb(1, 1, 0)).to.deep.equal([0, 0, 0]);
        expect(Color.hsvToRgb(91, 1, 0)).to.deep.equal([0, 0, 0]);
        expect(Color.hsvToRgb(130, 1, 0)).to.deep.equal([0, 0, 0]);
        expect(Color.hsvToRgb(181, 1, 0)).to.deep.equal([0, 0, 0]);
        expect(Color.hsvToRgb(300, 1, 0)).to.deep.equal([0, 0, 0]);
    });

    it('should rgbToCmyk', function () {
        expect(Color.rgbToCmyk(0, 191, 255).map(i => parseFloat(i.toFixed(2))))
            .to.deep.equal([1, .25, 0, 0]);
    });

    it('should rgbToHsv', function () {
        expect(Color.rgbToHsv(0, 0, 255)).to.deep.equal([240, 1, 1]);
        expect(Color.rgbToHsv(255, 255, 255)).to.deep.equal([0, 0, 1]);
        expect(Color.rgbToHsv(255, 0, 0)).to.deep.equal([0, 1, 1]);
        expect(Color.rgbToHsv(0, 255, 0)).to.deep.equal([120, 1, 1]);
        expect(Color.rgbToHsv(0, 0, 0)).to.deep.equal([0, 0, 0]);
    });

    it('should standard colors', function () {
        expect(Color.black.toHexString()).to.be.equals('#000000');
        expect(Color.white.toHexString()).to.be.equals('#ffffff');
        expect(Color.red.toHexString()).to.be.equals('#ff0000');
        expect(Color.green.toHexString()).to.be.equals('#008000');
        expect(Color.blue.toHexString()).to.be.equals('#0000ff');
        expect(Color.transparent.toHexString()).to.be.equals('#00000000');
    });

    it('should construct', () => {
        let c = new Color(255, 255, 255);
        expect(c.r).to.be.equals(255);
        expect(c.g).to.be.equals(255);
        expect(c.b).to.be.equals(255);
    });

    it('should equals', function () {
        expect(Color.black.equals(Color.black)).to.be.true;
        expect(Color.white.equals(Color.white)).to.be.true;
        expect(Color.transparent.equals(Color.transparent)).to.be.true;
        expect(Color.black.equals(Color.transparent)).to.be.false;
        expect(new Color().equals(Color.transparent)).to.be.false;
        expect(new Color().equals(Color.black)).to.be.true;

    });

    it('should toHex', function () {
        expect(Color.white.toHexString()).to.be.equals('#ffffff');
        expect(Color.red.toHexString()).to.be.equals('#ff0000');
    });

    it('should toString', function () {
        expect(Color.transparent.toString()).to.be.equals('transparent');
        expect(Color.red.fade(100).toString()).to.be.equals('rgba(255, 0, 0, 100)');
        expect(Color.red.toString()).to.be.equals('#ff0000');
    });

    it('should toRgbString', function () {
        expect(Color.black.toRgbString()).to.be.equals('rgba(0, 0, 0, 255)');
        expect(Color.transparent.toRgbString()).to.be.equals('rgba(0, 0, 0, 0)');
        expect(Color.white.toRgbString()).to.be.equals('rgba(255, 255, 255, 255)');
    });

    it('should cymk properties', function () {
        let deepSkyBlue = new Color(0, 191, 255);
        expect(deepSkyBlue.c).to.be.equals(1);
        expect(parseFloat(deepSkyBlue.m.toFixed(2))).to.be.equals(.25);
        expect(deepSkyBlue.y).to.be.equals(0);
        expect(deepSkyBlue.k).to.be.equals(0);

        let orange = Color.fromHex('ff9933');
        expect(orange.c).to.be.equals(0);
        expect(parseFloat(orange.m.toFixed(1))).to.be.equals(.4);
        expect(parseFloat(orange.y.toFixed(1))).to.be.equals(.8);
        expect(orange.k).to.be.equals(0);

        let dark = Color.fromHex('1a0d00');
        expect(dark.c).to.be.equals(0);
        expect(parseFloat(dark.m.toFixed(1))).to.be.equals(.5);
        expect(dark.y).to.be.equals(1);
        expect(parseFloat(dark.k.toFixed(1))).to.be.equals(.9);
    });

    it('should percievedLuminosity', function () {
        expect(Color.black.isDark).to.be.true;
        expect(Color.white.isLight).to.be.true;
        expect(Color.red.isDark).to.be.true;
        expect(Color.black.perceivedLuminosity).to.be.equals(1);
        expect(Color.white.perceivedLuminosity).to.be.equals(0);
    });

    it('should fade', function () {
        expect(Color.black.fade(100).a).to.be.equals(100);
        expect(Color.black.fadeFloat(0.5).a).to.be.equals(127.5);
    });

});