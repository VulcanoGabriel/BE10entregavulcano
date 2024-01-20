import express from "express"
import products from "./src/router/router.products.js"
import carts from "./src/router/router.cart.js"
import productManager from "./src/models/productManager.js"
import chatModel from "./src/models/chat.models.js"
import sessionRouter from "./src/router/router.session.js"
import passport from "passport"
import initializePassport from "./src/config/passport.config.js"
import session from "express-session"
import MongoStore from "connect-mongo"
import viewsRouter from "./src/routes/view.router.js"
import { Server } from "socket.io"
import handlebars from "express-handlebars"
import __dirname from "./utils.js"
import MongoSingleton from "./src/models/mongoSingleton.js"
import env from "./src/config.js"

//variables

const mongoURL = ""
const mongoDB = "ecommerce"
const app = express()

//passport

initializePassport()

app.engine(`handlebars`, handlebars.engine())
app.set(`views`, __dirname + `/views`)
app.set(`view engine`, `handlebars`)
app.use(express.static(__dirname + `/public`))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({

    store: MongoStore.create({

        mongoUrl: process.env.MONGOURL,
        dbName: process.env.MONGODB

    }),

    secret: `secret`,
    resave: true,
    saveUninitialized: true
}))

app.use("/", viewsRouter)
app.use("/api/products", products)
app.use("/api/carts", carts)
app.use(passport.initialize())
app.use(passport.session())
app.use(`/api/session`, sessionRouter)

const httpServer = app.listen(process.env.PORT, () => { console.log("<<<<<<<<<<<<<<<<<<<<<<<<<servidor corriendo....................") })

const serverSocket = new Server(httpServer)

serverSocket.on(`connection`, async socket => {

    console.log(`conectado por web socket`)
    socket.on("message", async data => {

        console.log(data)
        await chatModel.create(data)
        let messages = await chatModel.find().lean().exec()
        console.log(messages)
        serverSocket.emit("logs", messages)
    })

    const pM1 = new productManager();

    let productos = await pM1.getProducts()

    socket.emit("products", productos)

    socket.on("productoAdd", async (producto) => {

        console.log(producto)

        let { title, description, price, thumbnail, code, stock, category } = producto

        await pM1.addProduct(title, description, price, thumbnail, code, stock, category)

    })

    socket.on("eliminado", async (eliminado) => {

        await pM1.deleteProduct(Number(eliminado))

    })
})

await MongoSingleton.getInstance()