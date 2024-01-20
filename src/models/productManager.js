import productsModel from "./products.models.js";

class productManager {
  constructor() {
      
    this.listado = [];
  }

  getProducts = async () => {
    try {
      const productosSi = await productsModel.find().lean().exec()
      console.log(productosSi)
      if (productosSi) {
        return productosSi
       
      } else {
        return `No se encontraron productos.`
      }
     

    }
    catch (e) { console.log(e) }

  }

  addProduct = async (title, description, price, thumbnail, code, stock, category) => {
    let p = await this.getProducts()
    this.listado = p
    let totalId = (await p).length
    const product = {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      category,
      status: true,
      id: totalId + 1,
    };
    try {
      if (p) {
        if (!title || !description || !price || !thumbnail || !code || !stock || !category) {
          return "Faltan parametros";
        }
        let codigoR = await productsModel.findOne({ code })
        if (codigoR) {
          return "codigo repetido"
        } else {
          await productsModel.create(product)
        }
      }
    }
    catch (e) { console.log(e) }
  };


  getProductById = async (id) => {
    try {

      let productosT = await this.getProducts()
      this.listado = productosT
      const idEncontrada = this.listado.find((idE) => idE.id === id);
      if (idEncontrada) {
        return idEncontrada;
      } else {
        return `No se encontro la ID.`;
      }
    }
    catch (e) { console.log(e) }
  };

  updateProduct = async (idU, campo) => {
    try {
      let datosSi = await this.getProducts()
      if (datosSi) {
        const setObj = { $set: {} };
        campo.forEach(campos => {
          const campoL = Object.keys(campos)[0]; 
          const valor = campos[campoL];
          setObj.$set[campoL] = valor;
        });
        await productsModel.updateOne({ "id": idU }, setObj)
      } else {
        return `No hay productos en la base de datos.`
      }
    }
    catch (e) { console.log(e) }
  };

  deleteProduct = async (id) => {
    try {
      await productsModel.findOneAndDelete({ id });
      return "se elimino el producto con exito"
    }
    catch (e) { console.log(e) }
  }
}

export default productManager;
