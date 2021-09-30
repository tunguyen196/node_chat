const loginRouter = require('./auth')
const userController = require('./user')
const auth = require("../app/Middleware/Auth");

function routes(app)
{
    app.use('/auth', loginRouter);
    app.use('/messages', auth, userController);
    app.use('/', auth, userController)
}

module.exports = routes;