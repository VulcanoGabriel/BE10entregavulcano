import { Router } from "express"
import { addProduct, deleteProduct, updateProduct, getProducts, getProductById } from "../controllers/controller.product.js";

const router = Router()

router.post("/", addProduct)
router.get(`/`, getProducts)
router.get(`/:id`, getProductById)
router.put(`/:id`, updateProduct)
router.delete(`/:id`, deleteProduct)

export default router