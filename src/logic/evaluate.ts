// src/logic/evaluate.ts
// No import from 'react' or 'react-native' anywhere in this file.
// Thrown for input the user got wrong - never for a bug in this code.
// The tests from task 2 import it, so it has to exist from the start.
export class ExpressionError extends Error {}

type TokenType = 'NUMBER' | 'OP' | 'LPAREN' | 'RPAREN';

interface Token {
  type: TokenType;
  value: string;
}

function tokenize(input: string): Token[] {
  // 1. Normalize characters from keyboard/display
  // Replace minus (U+2212) with standard hyphen-minus (U+002D)
  // Replace multiplication sign '×' with '*'
  // Replace division sign '÷' with '/'
  // Replace decimal comma ',' with '.'
  let normalized = input
    .replaceAll('−', '-')
    .replaceAll('×', '*')
    .replaceAll('÷', '/')
    .replaceAll(',', '.');

  const tokens: Token[] = [];
  let i = 0;

  while (i < normalized.length) {
    const ch = normalized[i];

    if (/\s/.test(ch)) {
      i++;
      continue;
    }

    if (ch === '(') {
      tokens.push({ type: 'LPAREN', value: '(' });
      i++;
      continue;
    }

    if (ch === ')') {
      tokens.push({ type: 'RPAREN', value: ')' });
      i++;
      continue;
    }

    if (ch === '+' || ch === '*' || ch === '/') {
      tokens.push({ type: 'OP', value: ch });
      i++;
      continue;
    }

    if (ch === '-') {
      // Check if this '-' is unary (at start or preceded by operator or '(')
      const prev = tokens[tokens.length - 1];
      if (!prev || prev.type === 'OP' || prev.type === 'LPAREN') {
        // Unary minus - treat as part of number or unary operator
        // We can check if following is a number
        let nextIdx = i + 1;
        while (nextIdx < normalized.length && /\s/.test(normalized[nextIdx])) {
          nextIdx++;
        }
        if (nextIdx < normalized.length && (/[0-9.]/.test(normalized[nextIdx]))) {
          // Read number with minus
          let numStr = '-';
          i = nextIdx;
          while (i < normalized.length && /[0-9.]/.test(normalized[i])) {
            numStr += normalized[i];
            i++;
          }
          tokens.push({ type: 'NUMBER', value: numStr });
          continue;
        } else {
          // e.g. -(2+2)
          tokens.push({ type: 'OP', value: 'UNARY_MINUS' });
          i++;
          continue;
        }
      } else {
        tokens.push({ type: 'OP', value: '-' });
        i++;
        continue;
      }
    }

    if (/[0-9.]/.test(ch)) {
      let numStr = '';
      while (i < normalized.length && /[0-9.]/.test(normalized[i])) {
        numStr += normalized[i];
        i++;
      }
      tokens.push({ type: 'NUMBER', value: numStr });
      continue;
    }

    throw new ExpressionError(`Invalid character: ${ch}`);
  }

  return tokens;
}

export function evaluate(input: string): number {
  if (!input || input.trim() === '') {
    throw new ExpressionError('Empty expression');
  }

  const tokens = tokenize(input);
  if (tokens.length === 0) {
    throw new ExpressionError('Empty expression');
  }

  let index = 0;

  function peek(): Token | undefined {
    return tokens[index];
  }

  function consume(): Token {
    const token = tokens[index];
    index++;
    return token;
  }

  // Grammar:
  // expression := term (('+' | '-') term)*
  // term := factor (('*' | '/') factor)*
  // factor := ('-' | 'UNARY_MINUS') factor | number | '(' expression ')'

  function parseExpression(): number {
    let result = parseTerm();

    while (peek() && peek()!.type === 'OP' && (peek()!.value === '+' || peek()!.value === '-')) {
      const op = consume().value;
      const nextTerm = parseTerm();
      if (op === '+') {
        result += nextTerm;
      } else {
        result -= nextTerm;
      }
    }

    return result;
  }

  function parseTerm(): number {
    let result = parseFactor();

    while (peek() && peek()!.type === 'OP' && (peek()!.value === '*' || peek()!.value === '/')) {
      const op = consume().value;
      const nextFactor = parseFactor();
      if (op === '*') {
        result *= nextFactor;
      } else {
        if (nextFactor === 0) {
          throw new ExpressionError('Division by zero');
        }
        result /= nextFactor;
      }
    }

    return result;
  }

  function parseFactor(): number {
    const token = peek();
    if (!token) {
      throw new ExpressionError('Unexpected end of expression');
    }

    if (token.type === 'OP' && token.value === 'UNARY_MINUS') {
      consume();
      return -parseFactor();
    }

    if (token.type === 'NUMBER') {
      consume();
      const val = parseFloat(token.value);
      if (Number.isNaN(val)) {
        throw new ExpressionError(`Invalid number: ${token.value}`);
      }
      return val;
    }

    if (token.type === 'LPAREN') {
      consume();
      const val = parseExpression();
      const nextToken = peek();
      if (!nextToken || nextToken.type !== 'RPAREN') {
        throw new ExpressionError('Unclosed bracket');
      }
      consume(); // consume ')'
      return val;
    }

    throw new ExpressionError(`Unexpected token: ${token.value}`);
  }

  const finalResult = parseExpression();

  if (index < tokens.length) {
    throw new ExpressionError(`Unexpected token at end: ${tokens[index].value}`);
  }

  return finalResult;
}
