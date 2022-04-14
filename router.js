const router = require('express').Router();

const UserRouter = require('./views/UserRouter');
// const PeliculasRouter = require('./views/PeliculasRouter');
// const OrdersRouter = require('./views/OrdersRouter');

router.use('/users', UserRouter);
// router.use('/peliculas', PeliculasRouter);
// router.use('/orders', OrdersRouter);

module.exports = router;