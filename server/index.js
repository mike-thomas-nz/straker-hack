var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var trans = "trans demo";

io.on('connection', function(socket){
  console.log('a user connected');
  var con = []
  con.push(trans)
  con.push("connected")
  io.emit('connected', con);
  con = [];

  socket.on('disconnect', function(){
    console.log('user disconnected');
    var discon = []
    discon.push(trans)
    discon.push("disconnected")
    io.emit('disconnected', discon);
  });

  socket.on('translate', function(msg){
    console.log(msg);
    io.emit('translate', msg);
  });

});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
