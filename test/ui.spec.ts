import { ui } from '../src/ui';
import { expect } from 'chai';
import 'mocha';
import Element = ui.Element;
import {latte} from "../src/latte";
import _repeat = latte._repeat;

describe('Element', () => {

    it('should create', () => {

        let div = document.createElement('div');
        let ediv = new Element<HTMLDivElement>(div);

        // Fresh from the oven
        expect(ediv.raw instanceof HTMLDivElement).to.be.true;

        expect(Element.of('div').raw instanceof HTMLDivElement).to.be.true;
        expect(Element.of('p').raw instanceof HTMLParagraphElement).to.be.true;
        expect(Element.of('input').raw instanceof HTMLInputElement).to.be.true;

        // Constructor always expects an element
        expect(() => new Element<HTMLElement>(null)).to.throw();
        expect(() => new Element<HTMLElement>(1 as any)).to.throw();
        expect(() => new Element<HTMLElement>([] as any)).to.throw();
        expect(() => new Element<HTMLElement>({} as any)).to.throw();

    });

    it('should handle style classes', function () {

        let d = Element.of('div');
        d.addClass('a b c');

        expect(d.hasClass('a')).to.be.true;
        expect(d.hasClass('b')).to.be.true;
        expect(d.hasClass('c')).to.be.true;
        expect(d.hasClass('d')).to.be.false;

        d.removeClass('c');

        expect(d.hasClass('a')).to.be.true;
        expect(d.hasClass('b')).to.be.true;
        expect(d.hasClass('c')).to.be.false;
        expect(d.hasClass('d')).to.be.false;

        d.removeClass('b');

        expect(d.hasClass('a')).to.be.true;
        expect(d.hasClass('b')).to.be.false;
        expect(d.hasClass('c')).to.be.false;
        expect(d.hasClass('d')).to.be.false;

        d.addClass('d');

        expect(d.hasClass('a')).to.be.true;
        expect(d.hasClass('b')).to.be.false;
        expect(d.hasClass('c')).to.be.false;
        expect(d.hasClass('d')).to.be.true;

        d.removeClass('a');

        expect(d.hasClass('a')).to.be.false;
        expect(d.hasClass('b')).to.be.false;
        expect(d.hasClass('c')).to.be.false;
        expect(d.hasClass('d')).to.be.true;

        _repeat(100, () => {

            let must = Math.random() > 0.5;
            let name = 'a' + String(Math.round(Math.random() * 10000));
            let e = Element.of('p');

            e.ensureClass(name, must);

            expect(e.hasClass(name)).to.be.equals(must);

        });

    });

});