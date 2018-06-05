import Server from 'socket.io';
import uuid from 'uuid/v4';

export function createServer() {
  const io = new Server();
  const sockets = [];

  io.on('connection', (socket) => {
    sockets.push(socket);

    socket.on('user:join', (user) => {

      sockets.filter(s => s.id !== socket.id).forEach(s => {
        s.emit('user:join', user);
      });
    });

    socket.on('disconnect', () => {
      console.log('user:leave');
    });
  });

  const port = process.env.PORT || 3000;

  io.listen(port);

  console.log(`socket.io server is listening on port ${port}.`);

  return io;
}
