import serviceProduct from "../services/service.product.js"

const serviceP = new serviceProduct()

export const addProduct = async (req, res) => {
    const producto = req.body
    let { title, description, price, thumbnail, code, stock, category } = producto
    res.json(await serviceP.addProduct(title, description, price, thumbnail, code, stock, category))
    res.status(201).send({ status: "succes" })
}

export const getProducts  = async (req, res) => {
    console.log("desde controller")
    res.json(await serviceP.getProducts());
};

export const getProductById = async (req, res) => {
    const idR = parseInt(req.params.id)
    if (!idR) { return `Ingresar ID` }
    res.json(await serviceP.getProductById(idR))
}

export const updateProduct = async (req, res) => {
    const body = req.body
    const idR = parseInt(req.params.id)
    res.json( await serviceP.updateProduct(idR, body))
}

export const deleteProduct = async (req, res) => {
    let idD = parseInt(req.params.id)
    res.json( await serviceP.deleteProduct(idD))
}

