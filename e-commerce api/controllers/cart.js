import cartModel from "../models/Cart.js";

export const createCart = async (req, res, next) => {
  const newCart = new cartModel(req.body);

  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (error) {
    next(error);
  }
};

export const updateCart = async (req, res, next) => {
  try {
    const updatedCart = await cartModel.findByIdAndUpdate(
      request.params.id,
      { $set: request.body },
      { new: true }
    );
    response.status(200).json(updatedCart);
  } catch (error) {
    next(error);
  }
};

export const deleteCart = async (request, response, next) => {
  try {
    await cartModel.findByIdAndDelete(request.params.id);
    response.status(200).json("Cart has been deleted");
  } catch (error) {
    next(error);
  }
};

export const getCart = async (request, response, next) => {
  try {
    const cart = await cartModel.findOne({ userId: request.params.userId });
    response.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};

export const getCarts = async (request, response, next) => {
  try {
    const carts = await cartModel.find();
    response.status(200).json(carts);
  } catch (error) {
    next(error);
  }
};
