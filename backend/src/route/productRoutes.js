import express from "express";
const router = express.Router();
import  {getAllProducts,createProduct,updateProductsById,deleteProductsById}  from "../controller/productControllers";

router.route("/").get(getAllProducts).post(createProduct);
router.route("/:id").put(updateProductsById).delete(deleteProductsById)

export default router; 
