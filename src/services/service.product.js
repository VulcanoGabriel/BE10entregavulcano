import productManager from "../models/productManager.js";

class serviceProduct {
    constructor() {
        this.productManager = new productManager()
    }

    getProducts = () => { return this.productManager.getProducts() }
    addProduct = (title, description, price, thumbnail, code, stock, category) => { return this.productManager.addProduct(title, description, price, thumbnail, code, stock, category) }
    getProductById = (id) => { return this.productManager.getProductById(id) }
    updateProduct = (idU, campo) => { return this.productManager.updateProduct(idU, campo) }
    deleteProduct = (id) => { return this.productManager(id) }
}

export default serviceProduct