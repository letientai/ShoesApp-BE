const express = require('express')
const route = express.Router()
const cors = require('cors')
const app = express()


const ProductsController = require('../controllers/products')

// app.use(cors({ origin: '*', credentials: true }))

route.post('/create', ProductsController.createProduct)
route.get('/getAllProducts', ProductsController.getAllProducts)
route.get('/getProductById/:productId', ProductsController.getProductById)
route.delete('/deleteProductById/:productId', ProductsController.deleteProductById)
route.patch('/updateProductById/:productId', ProductsController.updateProductById)


module.exports = route