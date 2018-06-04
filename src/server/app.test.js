import { createServer } from './app';

let server;
beforeEach(() => {
  server = createServer();
});

afterEach(() => {
  server.close();
});

test('it should work', () => {
  //
});
