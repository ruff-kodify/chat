import { isCommand, parseCommand } from './command';

test('isCommand', () => {
  expect(isCommand('/nick Tamas')).toBe(true);
  expect(isCommand('nick Tamas')).toBe(false);
  expect(isCommand('foobar lorem ipsum')).toBe(false);
  expect(isCommand('/ foobar lorem ipsum')).toBe(false);
  expect(isCommand('')).toBe(false);
  expect(isCommand('/')).toBe(false);
  expect(isCommand('//')).toBe(false);
  expect(isCommand('/ ')).toBe(false);
});

test('parseCommand', () => {
  expect(parseCommand('/nick Tamas')).toMatchObject({
    command: 'nick',
    args: ['Tamas']
  });
  expect(parseCommand('/think \'To be or not to be\'')).toMatchObject({
    command: 'think',
    args: ['To be or not to be']
  });
  expect(parseCommand('/think "To be or not to be"')).toMatchObject({
    command: 'think',
    args: ['To be or not to be']
  });
  expect(parseCommand('/think To be or not to be')).toMatchObject({
    command: 'think',
    args: ['To', 'be', 'or', 'not', 'to', 'be']
  });
  expect(parseCommand('/oops')).toMatchObject({
    command: 'oops',
    args: null
  });
});

