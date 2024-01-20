const socket = io();

socket.on("products", (products) => {

    let contenedorProductos = document.getElementById("idProductos")

    contenedorProductos.innerHTML = ""

    products.forEach(product => {

        contenedorProductos.innerHTML += '<div>' + '</br>' +
            '<p>' + 'ID : ' + product.id + '</p>' +
            '<p>' + 'Nombre : ' + product.title + '</p>' +
            '<p>' + 'Descripcion : ' + product.description + '</p>' +
            '<p>' + 'Codigo : ' + product.code + '</p>' +
            '<p>' + 'Precio : ' + product.price + '</p>' +
            '<p>' + 'Stock : ' + product.stock + '</p>' +
            '<p>' + 'Categoria : ' + product.category + '</p>' +
            '</div>'
    });
})

let button = document.getElementById("idBoton")

button.addEventListener("click", (e) => {

    e.preventDefault()

    let title = document.getElementById("idTitulo").value
    let price = document.getElementById("idPrecio").value
    let thumbnail = document.getElementById("idImagen").value
    let stock = document.getElementById("idStock").value
    let code = document.getElementById("idCodigo").value
    let description = document.getElementById("idDescripcion").value
    let category = document.getElementById("idCategoria").value
    let producto = {

        title, price, thumbnail, stock, code, description, category
    }

    socket.emit("productoAdd", producto

    )
})

let buttonDelete = document.getElementById("botonEliminar")

buttonDelete.addEventListener("click", (e) => {

    e.preventDefault()
    let eliminado = document.getElementById("idEliminar").value
    socket.emit("eliminado", eliminado)

})


