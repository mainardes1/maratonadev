// configurando o servidor express
const express = require("express");
const server = express();
 
// configurando a template engine (nunjucks)

const nunjucks = require("nunjucks");
nunjucks.configure("./", {
    express: server
});

// configurar a exibição de página
server.get("/", function(req, res){
    return res.render("ok, nodemon");
});

//ligar o servidor pela porta 3000
server.listen(3000, function(){

    console.log("servidor rodando, nodemon");

});