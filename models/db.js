const Sequelize = require('sequelize');

const sequelize = new Sequelize('progrs', 'root', 'admin', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate()
.then(function(){
    console.log("Conexaõ com o banco de dados realizada com sucesso!")
}).catch(function(){
console.log("Erro: Conexão  com o banco de dados não realizada com sucesso!");
});

module.exports = sequelize;