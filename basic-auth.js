const controller = require('../src/user/controller');

async function basicAuth(req, res, next) {
    // make authenticate path public
    if (req.path === '/v1/user/auth') {
        return next();
    }
    
    // check for basic auth header
    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        return res.status(401).json({ message: 'Missing Authorization Header' });
    }
    
    // verify auth credentials
    const base64Credentials =  req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');
    const user = await controller.authenticate({ username, password });
    if (!user) {
        return res.status(401).json({ message: 'Invalid Authentication Credentials' });
    }
    
    // attach user to request object
    req.user = user
    
    next();
}

module.exports = basicAuth;