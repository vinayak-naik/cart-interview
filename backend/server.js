import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db";
import cors from "cors";
import productRoutes from "./src/route/productRoutes";

const app = express();
dotenv.config();
connectDB();

app.use(express.json()); 
app.use(cors());

app.use("/api/v1/product", productRoutes);

app.get("/test", (req, res) => res.send("api is working"));

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => console.log(`Server Running at port dev ${PORT}`));
