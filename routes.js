const routes = module.exports = require('next-routes')()

routes
.add('home', '/', 'index')
.add('productosMarca', '/productos/:slugMarca.:idMarca', 'productos')
.add('productosCategoria', '/productos/:slugCategoria.:idCategoria', 'productos')
.add('producto', '/producto/:slugProducto.:idSubProducto', 'producto')