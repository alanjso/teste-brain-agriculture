const { produtorRuralValidation } = require('../app/produtor-rural/produtor-rural-model');
const validarCNPJ = require('./validar-cnpj');
const validarCPF = require('./validar-cpf');
const bcrypt = require('bcrypt');
const config = require('config');
const saltRounds = config.get("saltRounds");

async function validarFormatarProdutorRural(produtorRuralOriginal) {
    let isValid = false;
    let produtorRuralFormatado = produtorRuralOriginal;
    try {
        // Validar formato do yup
        isValid = await produtorRuralValidation.isValid(produtorRuralFormatado);
        if (!isValid) {
            return { isValid, produtorRuralFormatado };
        }

        //  - A soma de área agrícultável e vegetação, não deverá ser maior que a área total da fazenda
        if (!(produtorRuralFormatado.area_total_fazenda >= produtorRuralFormatado.area_agricultavel + produtorRuralFormatado.area_vegetacao)) {
            isValid = false;
            return { isValid, produtorRuralFormatado };
        }

        // - O sistema deverá validar CPF e CNPJ digitados incorretamente.
        produtorRuralFormatado.document = produtorRuralFormatado.document.replace(/[^\d]+/g, '');
        if (produtorRuralFormatado.document.length == 11) { // Validar CPF
            isValid = validarCPF(produtorRuralFormatado.document);
        } else if (produtorRuralFormatado.document.length == 14) { // Validar CNPJ
            isValid = validarCNPJ(produtorRuralFormatado.document);
        }

        // Formatar culturas_plantadas para o enum
        const culturas_plantadas_Formatadas = [];
        produtorRuralFormatado.culturas_plantadas.forEach(cultura => {
            if (typeof cultura === 'string') {
                culturas_plantadas_Formatadas.push(cultura.toLowerCase().trim());
            }
        });
        produtorRuralFormatado.culturas_plantadas = culturas_plantadas_Formatadas;
        produtorRuralFormatado.password = await bcrypt.hash(produtorRuralOriginal.password, saltRounds);
        return { isValid, produtorRuralFormatado };
    } catch (error) {
        console.log(" Erro em validarFormatarProdutorRural:");
        console.log(error);
        return { isValid, produtorRuralFormatado };
    }
}

module.exports = validarFormatarProdutorRural;