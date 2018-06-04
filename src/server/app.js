import Server from 'socket.io';

export function createServer() {
  const io = new Server();

  io.on('connection', (socket) => {
    socket.on('disconnect', () => {});
  });

  const port = process.env.PORT || 3000;

  io.listen(port);

  console.log(`socket.io server is listening on port ${port}.`);

  return io;
}
