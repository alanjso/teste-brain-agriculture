const app = require('./server');
const config = require('config');
const port = config.get('port');

app.listen(port, () => {
    console.log(`Teste Brain Agriculture server running on port ${port}`);
});