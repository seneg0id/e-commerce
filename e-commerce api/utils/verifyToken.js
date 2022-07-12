import { request } from "express";
import JWT from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (request, response, next) => {
  const token = request.cookies.access_token;
  if (!token) {
    return next(createError(401, "You are not authenticated"));
  }

  JWT.verify(token, process.env.jwt_secret, (err, user) => {
    if (err) return next(createError(403, "Token is invalid"));
    request.user = user;
    next();
  });
};

export const verifyUser = (request, response, next) => {
  verifyToken(request, response, () => {
    if (request.user.id === request.params.id || request.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized"));
    }
  });
};

export const verifyAdmin = (request, response, next) => {
  verifyToken(request, response, () => {
    if (request.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized"));
    }
  });
};
