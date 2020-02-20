// configurando o servidor express
const express = require("express");
const server = express();

//permitir que o servidor apresente arquivos extras
server.use(express.static("public"));

//habilitar body do form
server.use(express.urlencoded({ extended: true}))
 
// configurando a template engine (nunjucks)

const nunjucks = require("nunjucks");
nunjucks.configure("./", {
    express: server
    //noCache: true, para não buscar a informação no cache
});

//lista de doadores
const donors = [
    
]

// configurar a exibição de página
server.get("/", function(req, res){
    return res.render("index.html", {donors});
});

server.post("/", function(req, res){

    const name = req.body.name;
    const email = req.body.email;
    const blood = req.body.blood;
    //adicionar valores ao array donors
    donors.push({
        name: name,
        blood:  blood,
    });

    return res.redirect("/");

});

//ligar o servidor pela porta 3000
server.listen(3000, function(){

    console.log("servidor rodando, nodemon");

});