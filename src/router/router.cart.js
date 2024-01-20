import { Router } from "express"
import { delCartProd, getCarts, addProductCart,  getCartId, addCart, addProductsArrayCart, delCartProductsT } from "../controllers/controller.cart.js"

const router = Router()

router.get("/", getCarts)
router.post("/", addCart)
router.get("/:cid", getCartId )
router.put("/:cid", addProductsArrayCart )
router.put(`/:cid/product/:pid`, addProductCart )
router.delete(`/:cid/product/:pid`, delCartProd )
router.delete("/:cid", delCartProductsT )

export default router