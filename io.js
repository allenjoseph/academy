var app = require('express')(),
    http = require('http').Server(app),
    io = require('socket.io')(http);

io.on('connection', function(socket){

    socket.on('addExam', function(data){
        io.emit('newExam', data);
    });

    socket.on('newDiscussion',function(data){
        io.emit('newDiscussion', data);
    });

    socket.on('addComment',function(data){
        io.emit('addComment', data);
    });

    socket.on('disconnect', function(){
        //..
    });
});

http.listen(3333, function(){
    console.log('listen io on *:3333');
});
