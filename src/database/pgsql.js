const Sequelize = require('sequelize');
const config = require('config');
const pg = config.get('postgres');

const sequelize = new Sequelize(pg.database, pg.username, pg.password, {
    host: pg.host,
    dialect: 'postgres',
    logging: false
});

sequelize.authenticate().then(
    console.log(`Conectado com sucesso ao POSTGRES!`)
).catch(error => {
    console.log(`** Erro ao conectar com o Postgres! **`)
    console.log(`** ${error} **`)
});

sequelize.sync({ alter: true }).then(
    console.log("Sync alter tables")
).catch(error => {
    if (error.parent.code != 42710) {
        console.log(`** Erro Sync**`)
        console.log(error)
    } else {
        console.log('Erro esperado => enum_Produtoresrurais_culturas_plantadas', error.parent.code)
    }
});

module.exports = sequelize;