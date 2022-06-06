const config = require('config');
let tempoTarefa = 300000; // 900000 = 15 minutos, 60000 = 1 minuto

setInterval(async function () {
    try {
        console.log(`Teste - Brain Agriculture still running on port ${config.get('port')} \n ${new Date()}`);
    } catch (error) {
        log.error('** Erro on Teste Brain Agriculture schedule **');
        log.error(`** Erro: ${error} **`);
    }

}, tempoTarefa);