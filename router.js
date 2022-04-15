const router = require('express').Router();

const AdminUserRouter = require('./views/AdminUserRouter');
const ClientAdminUserRouter = require('./views/ClientAdminUserRouter');
const LoginUserRouter = require('./views/LoginUserRouter');
const ProfileUserRouter = require('./views/ProfileUserRouter');
// const PeliculasRouter = require('./views/PeliculasRouter');
// const OrdersRouter = require('./views/OrdersRouter');

router.use('/users', AdminUserRouter,ClientAdminUserRouter,LoginUserRouter,ProfileUserRouter);

// router.use('/peliculas', PeliculasRouter);
// router.use('/orders', OrdersRouter);

module.exports = router;