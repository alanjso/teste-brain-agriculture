const config = require('config');
const jwt = require('jsonwebtoken');
const jwtSecret = config.get("jwtSecret");

module.exports = async (req, res, next) => {
    if (req.path == '/v1/login') {
        next();
    } else if ((req.path == '/v1/produtorrural' && req.method == 'POST')) {
        next();
    } else if ((req.path == '/v1/produtorrural/resetpw')) {
        next();
    } else {
        try {
            const token = req.headers?.authorization?.replace('Bearer ', '');
            const validationToken = jwt.verify(token, jwtSecret);
        } catch (error) {
            console.log('** middleware auth error **');
            console.log(error);
            return res.status(401).json({
                msg: 'Não autorizado! Token inválido',
                date: new Date(),
                error
            })
        }
        next();
    }
}