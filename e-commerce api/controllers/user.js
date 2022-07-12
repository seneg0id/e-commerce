import userModel from "../models/User.js";

export const updateUser = async (request, response, next) => {
  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      request.params.id,
      { $set: request.body },
      { new: true }
    );
    response.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (request, response, next) => {
  try {
    await userModel.findByIdAndDelete(request.params.id);
    response.status(200).json("User has been deleted");
  } catch (error) {
    next(error);
  }
};

export const getUser = async (request, response, next) => {
  try {
    const user = await userModel.findById(request.params.id);
    response.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (request, response, next) => {
  const query = request.query.new;

  try {
    const users = query
      ? await userModel.find().sort({ _id: -1 }).limit(5)
      : await userModel.find();
    response.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const getUserStats = async (request, response, next) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await userModel.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    response.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
