import { ui } from '../src/ui';
import { expect } from 'chai';
import 'mocha';
import Element = ui.Element;

describe('ui Module', () => {

    it('Clickable constructor', () => {
        let b = Element.of('div');
        expect(b.raw instanceof HTMLDivElement).to.be.true;
    });

});