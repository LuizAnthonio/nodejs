const express = require('express');

const app = express();

const path = require('path');

const bodyParser = require('body-parser');

app.use( bodyParser.json() )
app.use( bodyParser.urlencoded({
    extended: true
}));

app.engine('html',require('ejs').renderFile);
app.set('view engine','html');
app.use('/public',express.static(path.join(__dirname,'public')));
app.set('views', path.join(__dirname, '/views'));

var tarefas = ['arrumar o quarto','arrumar a cama','fazer compras'];
//var faturas = ['Conta de luz','conta de água'];



app.post('/',(req,res)=>{
    //retorna o input (o name do input)
    tarefas.push(req.body.tarefa);
    res.render('index',{tarefasList:tarefas});

    //console.log(req.body.tarefa);
    //console.log(req.body.acao);
})

app.get('/',(req,res)=>{
    res.render('index',{tarefasList:tarefas});
})



//caminho da pasta
app.get('/teste',(req,res)=>{
    res.render('teste',{faturaList:faturas});
    
})

app.get('/deletar/:id',(req,res)=>{
    tarefas = tarefas.filter(function(val,index){
        if(index != req.params.id){
            return val;
            
        }
        
    })
    
    res.render('index',{tarefasList:tarefas});
    
})


app.listen(5000,()=>{
    console.log("Servidor Rodando dessa vez em 5000")
})

