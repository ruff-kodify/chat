import Server from 'socket.io';
import uuid from 'uuid/v4';

export function createServer() {
  const io = new Server();
  let sockets = [];
  let users = [];

  io.on('connection', (socket) => {

    // tell everyone except me
    const broadcast = (event, ...rest) => {
      sockets.filter(s => s.id !== socket.id).forEach(s => {
        s.emit(event, ...rest);
      });
    };

    // cache the socket
    sockets.push(socket);

    socket.on('user:join', (user) => {

      users.push(Object.assign({}, user, {
        clientId: socket.id
      }));

      // tell the user who has just joined about the active users
      socket.emit('users:get', users);

      broadcast('user:join', user);
    });

    socket.on('user:update', (data) => {
      broadcast('user:update', data);
    });

    socket.on('user:typing', (id) => {
      broadcast('user:typing', id);
    });

    socket.on('message', (message) => {
      broadcast('message', message);
    });

    socket.on('message:remove', (id) => {
      broadcast('message:remove', id);
    });

    socket.on('countdown', (data) => {
      broadcast('countdown', data);
    });

    socket.on('disconnect', () => {
      // remove the user's socket from the cache
      sockets = sockets.filter(s => s.id !== socket.id);

      // find the user who's leaving
      const user = users.find(user => user.clientId === socket.id);
      // let others know about it
      sockets.forEach(s => {
        s.emit('user:leave', user.id);
      });

      // remove the user from the cache
      users = users.filter(user => user.clientId !== socket.id);
    });
  });

  const port = process.env.PORT || 3000;

  io.listen(port);

  console.log(`socket.io server is listening on port ${port}.`);

  return io;
}
