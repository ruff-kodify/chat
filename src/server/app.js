import Server from 'socket.io';
import uuid from 'uuid/v4';

export function createServer() {
  const io = new Server();
  let sockets = [];
  let users = [];

  io.on('connection', (socket) => {
    sockets.push(socket);

    socket.on('user:join', (user) => {

      users.push(Object.assign({}, user, {
        clientId: socket.id
      }));

      socket.emit('users:get', users);

      sockets.filter(s => s.id !== socket.id).forEach(s => {
        s.emit('user:join', user);
      });
    });

    socket.on('user:update', (data) => {
      sockets.filter(s => s.id !== socket.id).forEach(s => {
        s.emit('user:update', data);
      });
    });

    socket.on('user:typing', (id) => {
      sockets.filter(s => s.id !== socket.id).forEach(s => {
        s.emit('user:typing', id);
      });
    });

    socket.on('message', (message) => {
      sockets.filter(s => s.id !== socket.id).forEach(s => {
        s.emit('message', message);
      });
    });

    socket.on('message:remove', (id) => {
      sockets.filter(s => s.id !== socket.id).forEach(s => {
        s.emit('message:remove', id);
      });
    });

    socket.on('countdown', (data) => {
      sockets.filter(s => s.id !== socket.id).forEach(s => {
        s.emit('countdown', data);
      });
    });

    socket.on('disconnect', () => {
      sockets = sockets.filter(s => s.id !== socket.id);
      const user = users.find(user => user.clientId === socket.id);
      sockets.forEach(s => {
        s.emit('user:leave', user.id);
      });
      users = users.filter(user => user.clientId !== socket.id);
    });
  });

  const port = process.env.PORT || 3000;

  io.listen(port);

  console.log(`socket.io server is listening on port ${port}.`);

  return io;
}
