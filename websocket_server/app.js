const app = require('http').createServer(),
      io = require('socket.io')(app)

app.listen(82, ()=>{
  console.log('WebSocket Server Start')
});

let online_user = 0;
io.on('connection', (socket)=>{
  console.log("An User connect");

  ++online_user;
  io.emit('number_online_user', online_user);

  socket.on('update_client_all_stations', ()=>{
    console.log('update_client_all_stations');

    io.emit('update_client_all_stations', '');
  })

  socket.on('disconnect', ()=>{
    --online_user;
    io.emit('number_online_user', online_user);
    console.log("An User disconnect")
  })
});
