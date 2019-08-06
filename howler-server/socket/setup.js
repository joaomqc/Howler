function setupSocket(server){
    var io = require('socket.io')(server);

    io.on('connection', function(socket){
        console.log('a user connected');
        socket.on('disconnect', function(){
            console.log('user disconnected');
        });
        socket.on('chat message', function(msg){
            io.emit('chat message', msg);
        });
        socket.on('join', function(data){
            console.log(data);
        });
    });
}

module.exports = setupSocket;