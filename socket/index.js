const app = require('express')();

const http = require('http').createServer(app);

const io = require('socket.io')(http);


//Usuários 
var usuarios = [];
var socketIds = [];

app.get('/', (req, res) => {

    res.sendFile(__dirname + '/index.html');

});



io.on('connection',(socket)=>{

    socket.on('new user', function(data){
        //aqui chama uma função do JavaScript para ver se existe um usuário com essas informações

        //Se o indexOf retornar -1 quer dizer que não existe nada, no banco de dados, nesse caso estamos armazenando as informações em um Array
        if(usuarios.indexOf(data) != -1){
            socket.emit('new user',{success: false});
        }else{
            usuarios.push(data);
            socketIds.push(socket.id);

            socket.emit('new user',{success: true});

            //Emit para os outros usuários dizendo que tem um novo usuário ativo.

            //socket.broadcast.emit("hello", "world");
        }
    })

    //servidor recebe e retorna a mensagem
    socket.on('chat message',(obj)=>{

        if(usuarios.indexOf(obj.nome) != -1 && usuarios.indexOf(obj.nome) == socketIds.indexOf(socket.id)){
            io.emit('chat message',obj);
        }else{
            console.log('Erro: Você não tem permissão para fazer isso.')
           // window.location.href="/";
        }

        //repassa para o cliente
        io.emit('chat message',obj);
        //console.log(obj);
    })



    //io.emit('conectado','Estou conectado!');



    socket.broadcast.emit('novo usuario','Um novo usuário se conectou!');



    socket.on('disconnect',()=>{

        let id = socketIds.indexOf(socket.id);

        socketIds.splice(id,1);

        usuarios.splice(id,1);

        console.log(socketIds);

        console.log(usuarios);

        console.log('user disconnected');

        console.log('Desconectado.');

    })



})



http.listen(3000, () => {

  console.log('listening on *:3000');

});