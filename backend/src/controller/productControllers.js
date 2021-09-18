import Product from "../model/productModel";

const getAllProducts = async (req, res) => {
  const allProducts = await Product.find();
  res.send(allProducts);
};

const createProduct = async (req, res) => {
  const { name, price } = req.body;
  const productExists = await Product.findOne({ name });

  if (productExists) {
    res.status(400);
    throw new Error("product already exists");
  }

  const product = await Product.create({
    name,
    price,
  });

  if (product) {
    res.status(201).json({
      name: product.name,
      price: product.price,
    });
  } else {
    res.status(400);
    throw new Error("Invalid product data");
  }
};

const updateProductsById = async (req, res) => {
  const { name, price} = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;

    const updatedproduct = await product.save();
    res.json(updatedproduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
};

const deleteProductsById = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "product removed" });
  } else {
    res.status(404);
    throw new Error("product not found");
  } 
};

export {
  getAllProducts,
  createProduct,
  updateProductsById,
  deleteProductsById,
};
