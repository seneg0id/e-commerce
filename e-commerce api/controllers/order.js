import orderModel from "../models/Order.js";

export const createOrder = async (req, res, next) => {
  const newOrder = new orderModel(req.body);

  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (error) {
    next(error);
  }
};

export const updateOrder = async (req, res, next) => {
  try {
    const updatedOrder = await orderModel.findByIdAndUpdate(
      request.params.id,
      { $set: request.body },
      { new: true }
    );
    response.status(200).json(updatedOrder);
  } catch (error) {
    next(error);
  }
};

export const deleteOrder = async (request, response, next) => {
  try {
    await orderModel.findByIdAndDelete(request.params.id);
    response.status(200).json("Order has been deleted");
  } catch (error) {
    next(error);
  }
};

export const getOrder = async (request, response, next) => {
  try {
    const orders = await orderModel.find({ userId: request.params.userId });
    response.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

export const getOrders = async (request, response, next) => {
  try {
    const orders = await orderModel.find();
    response.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

export const getIncome = async (request, response, next) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(date.setMonth(lastMonth.getMonth() - 1));
  try {
    const income = await orderModel.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    response.status(200).json(income);
  } catch (error) {
    next(error);
  }
};
