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

  //notify
  socket.on('client_submit_markers', ()=>{
    console.log('client_submit_markers');

    const now = new Date().toString("yyyyMMddHHmmss");
    io.emit('ws_notify', 'An Guest has added record at ' + now + '. Now You Turn!');
  })

  socket.on('disconnect', ()=>{
    --online_user;
    io.emit('number_online_user', online_user);
    console.log("An User disconnect")
  })
});
