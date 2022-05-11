const router = require('express').Router();

const AdminUserRouter = require('./views/AdminUserRouter');
const ClientAdminUserRouter = require('./views/ClientAdminUserRouter');
const LoginUserRouter = require('./views/LoginUserRouter');
const ProfileUserRouter = require('./views/ProfileUserRouter');
const InstallationRouter = require('./views/InstallationRouter');
const InstallationHomeRouter = require('./views/InstallationHomeRouter');
// const PeliculasRouter = require('./views/PeliculasRouter');
// const OrdersRouter = require('./views/OrdersRouter');

router.use('/users', AdminUserRouter,ClientAdminUserRouter,LoginUserRouter,ProfileUserRouter);
router.use('/installation', InstallationRouter,InstallationHomeRouter);
// router.use('/users1', ClientAdminUserRouter);
// router.use('/users2', LoginUserRouter);
// router.use('/users3', ProfileUserRouter);

// router.use('/peliculas', PeliculasRouter);
// router.use('/orders', OrdersRouter);

module.exports = router;