import cartManager from "../models/cartsManager.js";

class cartService {
    constructor() {
        this.cartManager = new cartManager()
    }

    getCarts = () => { return this.cartManager.getCarts() }
    addCart = (body) => { return this.cartManager.addCart(body) }
    getCartId = (id) => { return this.cartManager.getCartId(id) }
    delCartProd = (pid, cid) => { return this.cartManager.delCartProd(pid, cid) }
    delCartProductsT = (idC) => { return this.cartManager.delCartProductsT(idC) }
    addProductCart = (idC, idP, body) => { return this.cartManager.addProductCart(idC, idP, body) }
    addProductsArrayCart = (idC, body) => { return this.cartManager.addProductsArrayCart(idC, body) }
}

export default cartService