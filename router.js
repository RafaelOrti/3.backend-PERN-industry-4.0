const router = require('express').Router();

const AdminUserRouter = require('./views/0.AdminUserRouter');
const ClientAdminUserRouter = require('./views/0.ClientAdminUserRouter');
const LoginUserRouter = require('./views/0.LoginUserRouter');
const ProfileUserRouter = require('./views/0.ProfileUserRouter');
const InstallationModbusTCPRouter = require('./views/InstallationModbusTCPRouter');

// const PeliculasRouter = require('./views/PeliculasRouter');
// const OrdersRouter = require('./views/OrdersRouter');

router.use('/users', AdminUserRouter,ClientAdminUserRouter,LoginUserRouter,ProfileUserRouter);
router.use('/installation', InstallationModbusTCPRouter );
// router.use('/users1', ClientAdminUserRouter);
// router.use('/users2', LoginUserRouter);
// router.use('/users3', ProfileUserRouter);

// router.use('/peliculas', PeliculasRouter);
// router.use('/orders', OrdersRouter);

module.exports = router;