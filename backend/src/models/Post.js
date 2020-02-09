const Sequelize = require('sequelize');

const config = require('../config/database');

const sequelize = new Sequelize(config);

const Posts = sequelize.define('Posts',{
    author: {
        type: Sequelize.STRING
    },
    place: {
        type: Sequelize.TEXT
    },
    description: {
        type: Sequelize.STRING
    },
    hashtags: {
        type: Sequelize.STRING
    },
    image: {
        type: Sequelize.STRING
    },
    likes: {
        type: Sequelize.INTEGER
    },

})

module.exports = Posts;
// Para Criar as Tabelas no banco Basta desconmentar a linha abaixo, depois de criar comente novamente
//Posts.sync({force: true})