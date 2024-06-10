import { Router } from "express";
import { authService } from "../services/authService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

router.post(
  "/login",
  (req, res, next) => {
    try {
      // TODO: Implement login action (get the user if it exist with entered credentials)
      
      const userdata = req.body;
      console.log(userdata);
      const user = authService.login( userdata );
      
      res.data = user;

    } catch (err) {
      
      res.err = err;
      req.error_message = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

export { router };
