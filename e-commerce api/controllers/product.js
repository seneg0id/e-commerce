import productModel from "../models/Product.js";

export const createProduct = async (req, res, next) => {
  const newProduct = new productModel(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const updatedProduct = await productModel.findByIdAndUpdate(
      request.params.id,
      { $set: request.body },
      { new: true }
    );
    response.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (request, response, next) => {
  try {
    await productModel.findByIdAndDelete(request.params.id);
    response.status(200).json("Product has been deleted");
  } catch (error) {
    next(error);
  }
};

export const getProduct = async (request, response, next) => {
  try {
    const product = await productModel.findById(request.params.id);
    response.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export const getProducts = async (request, response, next) => {
  const qNew = request.query.new;
  const qCategory = request.query.category;
  try {
    let products;
    if (qNew) {
      products = await productModel.find().sort({ _id: -1 }).limit(5);
    } else if (qCategory) {
      products = await productModel.find({
        category: {
          $in: [qCategory],
        },
      });
    } else {
      products = await productModel.find();
    }
    response.status(200).json(products);
  } catch (error) {
    next(error);
  }
};
