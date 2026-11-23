import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { evaluate, ExpressionError } from './evaluate.ts';

describe('operator precedence', () => {
  test('multiplication binds tighter than addition (2+2×2 = 6)', () => {
    assert.equal(evaluate('2+2×2'), 6);
  });

  test('brackets override precedence ((2+2)×2 = 8)', () => {
    assert.equal(evaluate('(2+2)×2'), 8);
  });

  test('division before subtraction (10−6÷2 = 7)', () => {
    assert.equal(evaluate('10−6÷2'), 7);
  });

  test('evaluation from left to right (10−3−2 = 5)', () => {
    assert.equal(evaluate('10−3−2'), 5);
  });
});

describe('symbols from the keypad', () => {
  test('multiplication sign (3×4 = 12)', () => {
    assert.equal(evaluate('3×4'), 12);
  });

  test('division sign (6÷2 = 3)', () => {
    assert.equal(evaluate('6÷2'), 3);
  });

  test('decimal comma (1,5+1 = 2.5)', () => {
    assert.equal(evaluate('1,5+1'), 2.5);
  });

  test('leading minus (−5+3 = -2)', () => {
    assert.equal(evaluate('−5+3'), -2);
  });
});

describe('floating point', () => {
  test('floating point numbers with tolerance (0,1+0,2)', () => {
    assert.ok(Math.abs(evaluate('0,1+0,2') - 0.3) < 1e-9);
  });
});

describe('extended keys', () => {
  test('constants π and e', () => {
    assert.ok(Math.abs(evaluate('π') - Math.PI) < 1e-9);
    assert.ok(Math.abs(evaluate('e') - Math.E) < 1e-9);
    assert.ok(Math.abs(evaluate('2×π') - 2 * Math.PI) < 1e-9);
  });

  test('square root √', () => {
    assert.equal(evaluate('√9'), 3);
    assert.equal(evaluate('√(16)'), 4);
    assert.equal(evaluate('2+√9×2'), 8); // 2 + 3 * 2 = 8
  });

  test('square root of negative number throws ExpressionError', () => {
    assert.throws(() => evaluate('√(-4)'), ExpressionError);
  });

  test('power ^ and x²', () => {
    assert.equal(evaluate('2^3'), 8);
    assert.equal(evaluate('3^2'), 9);
    assert.equal(evaluate('2+3^2'), 11); // 2 + 9 = 11
  });

  test('reciprocal 1/x', () => {
    assert.equal(evaluate('1/2'), 0.5);
    assert.equal(evaluate('1/4+0,5'), 0.75);
  });

  test('percent %', () => {
    assert.equal(evaluate('50%'), 0.5);
    assert.equal(evaluate('200×10%'), 20);
  });
});

describe('what has to fail', () => {
  test('empty expression is an error', () => {
    assert.throws(() => evaluate(''), ExpressionError);
  });

  test('unfinished expression is an error (2+)', () => {
    assert.throws(() => evaluate('2+'), ExpressionError);
  });

  test('division by zero is an error, not Infinity (1÷0)', () => {
    assert.throws(() => evaluate('1÷0'), ExpressionError);
  });

  test('unclosed bracket is an error ((2+2)', () => {
    assert.throws(() => evaluate('(2+2'), ExpressionError);
  });
});
