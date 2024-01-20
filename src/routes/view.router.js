import productsModel from "../models/products.models.js";
import { Router } from "express"
import cartManager from "../models/cartsManager.js";
import passport from "passport";

const router = Router()

router.use((req, res, next) => {

    res.locals.auth = req.session?.user
    next()

})

router.get("/products/", async (req, res) => {

    const user = req.session.user

    console.log(user)

    const limit = parseInt(req.query?.limit ?? 10)

    const page = parseInt(req.query?.page ?? 1)

    const query = (req.query?.query ?? "")

    const category = Number(req.query?.category ?? 0)

    const sort = (req.query?.sort ?? "")

    const search = {}

    try {

        if (query) search.title = { "$regex": query, "$options": "i" }
        const options = {
            page,
            limit,
            lean: true
        }

        if (category) search.category = category

        if (sort != 0) {
            options["sort"] = { price: sort == "asc" ? 1 : -1 }
        }

        const result = await productsModel.paginate(search, options)

        result.payload = result.docs

        result.query = query

        result.status = "success"

        delete result.docs

        result.sortzero = sort === "0"

        result.sortasc = sort === "asc"

        result.sortdes = sort === "des"

        res.render(`home`, { result, user })
    }

    catch (e) { (console.log(e)), result.status = "error" }
})

//RealTime Products //////////////////////////////////////////////////////

router.get("/realtimeproducts", async (req, res) => {

    res.render(`realTimeProducts`)
})

//CHAT///////////////////////////////////////////////////////////////////

router.get("/chat", (req, res) => {

    res.render("chat", {})

})

// vista 1 carrito (haciendo)

router.get("/carts/:cid", async (req, res) => {

    let idC = parseInt(req.params.cid)
    let cam1 = new cartManager()
    let resultados = await cam1.getCartId(idC)
    console.log(resultados)
    res.render("oneC", { res: resultados.doc })
})

//MIDLEWARES

function justPublicWithoutSession(req, res, next) {

    if (req.session?.user) return res.redirect('/profile')

    return next()
}

function auth(req, res, next) {

    if (req.session?.user) return next()
    res.redirect('/login')
}

//RENDERS de LOGIN

router.get('/', (req, res) => {

    return res.render('index')

})

//register passport bcrypt

router.post("/register", passport.authenticate(`register`, { failureRedirect: `/` }), async (req, res) => {
    res.send(`registrado`)

})

//login passport bcrypt/////////////////////////////////////////////////////////////////////////////////////

router.post("/login", passport.authenticate(`login`, { failureRedirect: `/` }), async (req, res) => {

    if (!req.user) return res.status(400).send(`invalidad credentials `)
    req.session.user = req.user
    return res.send(`logueado`)
})

router.get("/login", (req, res) => {
    res.render("login", {})

})

router.get("/register", (req, res) => {
    res.render("register", {})

})

router.get('/profile', auth, (req, res) => {
    const user = req.session.user
    res.render('profile', { user })

})

router.get(`/logout`, (req, res) => {

    req.session.destroy(err => {
        if (err) { return res.send`problemas al finalizar sesion` } else {
            res.redirect(`/`)
        }
    })
})

//login Github///////////////////////////////////////////////////////////////////////////////////////////////////////

router.get(`/github`, passport.authenticate(`github`, { scope: [`user:email`] }), async (req, res) => { })

router.get(`/githubcallback`, passport.authenticate(`github`, { failureRedirect: `/error` }),

    (req, res) => {

        console.log(`callback: `, req.user)
        req.session.user = req.user
        console.log(`user session setted`)
        res.redirect(`/`)

    })

router.get(`/error`, (req, res) => res.render(`error al loguear`))

export default router