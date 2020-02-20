// configurando o servidor express
const express = require("express");
const server = express();

//permitir que o servidor apresente arquivos extras
server.use(express.static("public"));

//habilitar body do form
server.use(express.urlencoded({ extended: true}))

//conexão com o banco

const Pool = require("pg").Pool;
const db = new Pool({
    user: 'postgres',
    password: '25a09l97l',
    host: 'localhost',
    port: 5432,
    database: 'bloodbank'
});
 
// configurando a template engine (nunjucks)

const nunjucks = require("nunjucks");
nunjucks.configure("./", {
    express: server
    //noCache: true, para não buscar a informação no cache
});

// configurar a exibição de página
server.get("/", function(req, res){
    db.query("SELECT * FROM doadores", function(err, result){

        if (err) return res.send("Erro de consulta");
        const donors = result.rows;
        return res.render("index.html", {donors});

    });
    
});

server.post("/", function(req, res){

    const name = req.body.name;
    const email = req.body.email;
    const blood = req.body.blood;

    if (name == "" || email == "" || blood == ""){

        return res.send("Preencha todos os campos!");

    }

    //adicionar valores ao banco
    const query = `INSERT INTO doadores ("name", "email", "blood") 
                   VALUES ($1, $2, $3)` 

    const values = [name, email, blood];
    db.query(query, values, function(err){
        // fluxo de erro
        if (err) return res.send ('erro no banco');

        return res.redirect("/");

    });

    

});

//ligar o servidor pela porta 3000
server.listen(3000, function(){

    console.log("servidor rodando, nodemon");

});