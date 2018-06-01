import { models } from '../src/models';
import { expect } from 'chai';
import 'mocha';

describe('Person test', () => {

  var name = 'John';

  it('Person Test', () => {
    const p = new models.Person(name);
    expect(p.name).to.equal(name);
  });

});