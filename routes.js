const routes = module.exports = require('next-routes')()

routes
.add('home', '/', 'index')
.add('productos', '/productos', 'productos')
.add('producto', '/producto/:slugProducto.:idSubProducto', 'producto')