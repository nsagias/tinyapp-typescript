import { Router } from "express";
import { rootRoute } from "./rootRoute";
import { authRoute } from "./authRoute";
import { userRoute } from "./userRoute";
import { errorRoute } from "./errorRoute";

export const routes = Router();

routes.use(rootRoute);
routes.use(authRoute);
routes.use(userRoute);
routes.use(errorRoute);


