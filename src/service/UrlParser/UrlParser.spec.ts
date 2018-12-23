import { expect, assert } from 'chai';
import 'mocha';

import { parseAll, parseByName } from './UrlParser';

describe('Url parser tests', () => {
  it('should parse single parameter', () => {
    const result = parseByName('name', '/?name=hello');
    expect(result).to.equal('hello');
  });

  it('should parse double parameter', () => {
    const result = parseByName('name', '/?int=42&name=hello');
    expect(result).to.equal('hello');
  });

  it('should parse all random params', () => {
    assert.deepEqual(parseAll('https://www.test.ru/?int=42&name=hello'), {
      int: '42',
      name: 'hello',
    });
  });

  it('parse empty object', () => {
    assert.deepEqual(parseAll('https://www.test.ru/'), {});
  });

  it('parse not empty param', () => {
    assert.deepEqual(parseAll('https://www.test.ru/?test=://'), {
      test: '://',
    });
  });

  it('parse base64', () => {
    assert.deepEqual(parseAll('https://www.test.ru/?test=dG9wdGVzdA=='), {
      test: 'dG9wdGVzdA==',
    });
  });

  it('parse base64', () => {
    assert.deepEqual(parseAll('https://www.test.ru/?test===dG9wdGVzdA====='), {
      test: '==dG9wdGVzdA=====',
    });
  });
});
