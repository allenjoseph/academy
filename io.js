var app = require('express')(),
    http = require('http').Server(app),
    io = require('socket.io')(http);

io.on('connection', function(socket){

    socket.on('addExam', function(data){
        io.emit('newExam', data);
    });

    socket.on('disconnect', function(){
        //..
    });
});

http.listen(3000, function(){
    console.log('listen io on *:3000');
});
