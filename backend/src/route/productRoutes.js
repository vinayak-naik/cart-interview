import express from "express";
const router = express.Router();
import  {getAllProducts}  from "../controller/documentControllers";

router.route("/").get(getAllProducts);

export default router;
