const { Router } = require('express')
const ProductRouter = require('./api/products.router')
const CartRouter = require('./api/cart.router')


const router = Router()

router.use('/products', ProductRouter)
router.use('/carts', CartRouter)


module.exports = {
    api: router,
}