const Sequelize = require('sequelize');
const Model = Sequelize.Model;
const yup = require('yup');
const pgsql = require('../../database/pgsql');

class ProdutorRural extends Model { }

ProdutorRural.init(
    {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4
        },
        document: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                is: /^(([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2}))$/i
            }
        },
        nome_produtor: {
            type: Sequelize.STRING,
            allowNull: false
        },
        nome_fazenda: {
            type: Sequelize.STRING,
            allowNull: true
        },
        cidade: {
            type: Sequelize.STRING,
            allowNull: false
        },
        estado: {
            type: Sequelize.STRING,
            allowNull: false
        },
        area_total_fazenda: {
            type: Sequelize.DOUBLE,
            allowNull: false
        },
        area_agricultavel: {
            type: Sequelize.DOUBLE,
            allowNull: false
        },
        area_vegetacao: {
            type: Sequelize.DOUBLE,
            allowNull: false
        },
        culturas_plantadas: {
            type: Sequelize.ARRAY(Sequelize.ENUM(['soja', 'milho', 'algodão', 'café', 'cana de açúcar'])),
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
    sequelize: pgsql,
    modelName: 'ProdutorRural',
    tableName: 'Produtoresrurais'
}
);

let produtorRuralValidation = yup.object().shape({
    nome_produtor: yup.string().required(),
    document: yup.string().required(),
    cidade: yup.string().required(),
    estado: yup.string().required(),
    area_total_fazenda: yup.number().required(),
    area_agricultavel: yup.number().required(),
    area_vegetacao: yup.number().required(),
    culturas_plantadas: yup.array(),
    password: yup.string().required()
});

exports.ProdutorRural = ProdutorRural;
exports.produtorRuralValidation = produtorRuralValidation;