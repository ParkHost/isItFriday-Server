const socketIO = require('socket.io');


module.exports = function (server) {
  const io = socketIO(server);
  const state = {}; // all mouse locations of users

  io.on('connection', (socket) => {
    console.log('a user connected', socket.id);
    socket.on('location', (location) => {
      console.log(socket.id, location);
      state[socket.id] = location;
    });
    socket.on('disconnect', () => {
      console.log('a user disconnected', socket.id);
      delete state[socket.id];
    });
  });

  setInterval(() => {
    io.emit('state', state);
    console.log(state);
  }, 1000);
};
