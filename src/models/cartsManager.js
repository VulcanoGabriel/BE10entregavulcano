import cartModel from "./cart.models.js"

class cartManager {

    constructor() {
        this.lista = []
    }

    getCarts = async () => {
        try {
            let carritoSi = await cartModel.find()
            if (carritoSi) {
                this.lista = carritoSi
            }
            else { return "No hay carritos en la base de datos" }
            return this.lista
        }

        catch (e) { return console.log(e) }
    }

    addCart = async (body) => {

        let carritoId = await this.getCarts()
        console.log(carritoId)
        let carritoL = await parseInt(carritoId.length)

        const carritoMolde = {
            id: carritoL + 1,
            products: body.map(p => ({ id: p.id }))
        }
        try {
            if (carritoId) {
                await cartModel.insertMany([carritoMolde])
            }
        }
        catch (error) {
            console.error(error);
            return `No se pudo agregar el carrito o el producto.`;
        }
    }

    getCartId = async (id) => {
        try {
            cartModel.find({ id: id })
                .populate('products')
            let obtenerCarrito = await this.getCarts()
            this.lista = obtenerCarrito
            let encontrarCarrito = await this.lista.find((f) => f.id === id)
            if (encontrarCarrito) { return encontrarCarrito }
            else { return `carrito no encontrado por ID` }
        }
        catch (e) {
            console.log(e)
        }
    }

    delCartProd = async (pid, cid) => {
        try {
            await cartModel.updateOne({ id: cid },
                { $pull: { products: { id: pid } } }
            )
        }
        catch (e) { console.log(e) }
    }

    delCartProductsT = async (idC) => {
        try {
            let encontrarC = await this.getCartId(idC)
            if (encontrarC) {
                await cartModel.updateOne({ id: idC }, { $set: { products: [] } })
            }
        }
        catch
        (e) { console.log(e) }
    }


    addProductCart = async (idC, idP, body) => {
        try {
            let bodyQ = body
            let carritoId = await this.getCartId(idC)
            if (!carritoId) return (`no se encontro el carrito por el ID ingresado`)
            let productoEncontrado = await cartModel.find({ id: idC, 'products.product': idP })
            if (productoEncontrado) {
                await cartModel.updateOne({ id: idC, 'products.product': idP },
                    { $inc: { 'products.$.quantity': bodyQ } }
                )
            } else {
                await cartModel.updateOne({ id: carritoNum },
                    { $push: { products: { product: productoId, quantity: 1 } } }
                )
            }
        }
        catch (e) { console.log(e) }
    }

    addProductsArrayCart = async (idC, body) => {
        try {
            let carritoId = await this.getCartId(idC)
            let productsB = await body
            if (carritoId && productsB) {
                await cartModel.updateOne({ id: idC }, { $push: { products: { $each: productsB } } });
                return "productos agregados correctamente"
            } else { return "faltan parametros" }
        }
        catch (e) {
            console.log(e);
            return "error al agregar productos"
        }
    }
}

export default cartManager