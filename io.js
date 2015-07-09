var app = require('express')(),
    http = require('http').Server(app),
    io = require('socket.io')(http);

io.on('connection', function(socket){
    console.log('a user connected: ');

    socket.on('notification', function(msg){
        console.log('msg :',msg);
        io.emit('notification', msg);
    });

    socket.on('disconnect', function(){
        console.log('a user disconnect: ');
    });
});

http.listen(3000, function(){
    console.log('listen io on *:3000');
});
