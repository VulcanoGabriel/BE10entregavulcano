import cartService from "../services/service.cart.js"

const cartS = new cartService

export const getCarts = async (req, res) => {

    try {
        res.json( await cartS.getCarts())
    }
    catch (e) { console.log(e) }
}

export const addCart = async (req, res) => {

    try {
        const body = req.body
        res.json(await cartS.addCart(body))
    }
    catch (e) { console.log(e) }
}

export const getCartId = async (req, res) => {

    try {
        const idCarrito = parseInt(req.params.cid)
        res.json(await cartS.getCartId(idCarrito))
    }
    catch (e) {
        console.log(e);
        return res.json("no se encontro la ID")
    }
}

export const addProductsArrayCart = async (req, res) => {

    try {
        const body = req.body
        const idC = parseInt(req.params.cid)
        res.json(await cartS.addProductsArrayCart(idC, body))
    }
    catch (e) { console.log(e) }
}

export const addProductCart = async (req, res) => {

    const body = parseInt(req.body.quantity)
    const idC = parseInt(req.params.cid)
    const idP = parseInt(req.params.pid)
    const cart = await cartS.addProductCart(idC, idP, body)
    if (cart) { res.json(`actualizado con exito producto ${cart}`) }
    else { res.json(`problemas al actualizar producto`) }
}

export const delCartProd = async (req, res) => {
    try {
        const idC = parseInt(req.params.cid)
        const idP = parseInt(req.params.pid)
        const delProd = await cartS.delCartProd(idP, idC)
        if (delProd) { res.json(`producto eliminado de carrito con exito: ${delProd}`) }
        else { res.json("producto inexistente") }
    }
    catch (e) { console.log(e) }
}

export const delCartProductsT = async (req, res) => {

    try {
        const idC = parseInt(req.params.cid)
        let result = await cartS.delCartProductsT(idC)
        if (result) { res.json(result) } else {
            res.json("No se pudo actualizar desde postman")
        }
    }
    catch (e) { console.log(e) }
}

